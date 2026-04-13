import type { APIRoute } from 'astro';
import { connectDB } from '../../lib/db/client.ts';
import { Schedule } from '../../lib/db/models/index.ts';
import { buildScheduleReminderMarkdownV2 } from '../../lib/messaging/scheduleTelegramReminder.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Rate limiting: track IPs in memory (resets on cold start, good enough for cron abuse)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 10; // max 10 requests per minute per IP
}

// Constant-time string comparison to prevent timing attacks on secret
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    // --- Security: Rate limiting ---
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('cf-connecting-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return json({ success: false, message: 'Too many requests' }, 429);
    }

    // --- Security: Secret validation (timing-safe) ---
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') ?? '';

    if (!process.env.CRON_SECRET || !safeCompare(secret, process.env.CRON_SECRET)) {
      // Delay response slightly to slow down brute-force attempts
      await new Promise(r => setTimeout(r, 500));
      return json({ success: false, message: 'Unauthorized' }, 401);
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    if (!TELEGRAM_BOT_TOKEN) {
      return json({ success: false, message: 'TELEGRAM_BOT_TOKEN not configured' }, 500);
    }

    await connectDB();

    // Get current time in Philippine Time (UTC+8)
    const now = new Date();
    const phTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));

    const currentDay    = phTime.getDay();
    const currentHour   = phTime.getHours();
    const currentMinute = phTime.getMinutes();
    const currentTotal  = currentHour * 60 + currentMinute;

    console.log(`Cron running at PH time: ${phTime.toLocaleString()} | Day: ${DAYS[currentDay]} | ${currentHour}:${String(currentMinute).padStart(2, '0')}`);

    const schedules = await Schedule.find({ active: true })
      .populate('studentId', 'name telegramChatId')
      .lean() as any[];

    const validSchedules = schedules.filter(s => s.studentId?.telegramChatId);
    const results: { name: string; class: string; status: string }[] = [];

    // Cooldown window: must be longer than your cron interval to prevent duplicates
    const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
    const cooldownCutoff = new Date(now.getTime() - COOLDOWN_MS);

    for (const schedule of validSchedules) {
      const [schedHour, schedMinute] = schedule.time.split(':').map(Number);
      const schedTotal      = schedHour * 60 + schedMinute;
      const reminderFiresAt = schedTotal - schedule.reminderMinutes;
      const diff            = currentTotal - reminderFiresAt;
      const isRightDay      = schedule.dayOfWeek === currentDay;
      const isRightTime     = diff >= 0 && diff < 5;
      const student         = schedule.studentId;

      if (!isRightDay || !isRightTime) continue;

      // --- Dedup: skip if already sent within the cooldown window ---
      if (schedule.lastReminderSent && new Date(schedule.lastReminderSent) > cooldownCutoff) {
        console.log(`⏭ Skipping ${student.name} for "${schedule.className}" — already sent recently`);
        results.push({ name: student.name, class: schedule.className, status: 'skipped:duplicate' });
        continue;
      }

      const message = [
        buildScheduleReminderMarkdownV2(schedule, student),
        ``,
        `_Your class starts in ${schedule.reminderMinutes >= 60
          ? `${schedule.reminderMinutes / 60} hour${schedule.reminderMinutes > 60 ? 's' : ''}`
          : `${schedule.reminderMinutes} minutes`}\\._`,
      ].join('\n');

      try {
        const res = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id:    student.telegramChatId,
              text:       message,
              parse_mode: 'MarkdownV2',
            }),
          }
        );

        const data = await res.json() as any;

        if (data.ok) {
          // --- Dedup: stamp the schedule so future cron runs skip it ---
          await Schedule.findByIdAndUpdate(schedule._id, {
            lastReminderSent: now,
          });

          console.log(`✅ Sent reminder to ${student.name} for ${schedule.className}`);
          results.push({ name: student.name, class: schedule.className, status: 'sent' });
        } else {
          console.error(`❌ Failed for ${student.name}:`, data.description);
          results.push({ name: student.name, class: schedule.className, status: `failed: ${data.description}` });
        }
      } catch (err) {
        console.error(`❌ Error sending to ${student.name}:`, err);
        results.push({ name: student.name, class: schedule.className, status: 'error' });
      }
    }

    return json({
      success: true,
      time:    phTime.toLocaleString('en-PH', { timeZone: 'Asia/Manila' }),
      checked: validSchedules.length,
      sent:    results.filter(r => r.status === 'sent').length,
      results,
    });

  } catch (error) {
    console.error('Cron error:', error);
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Cron job failed',
    }, 500);
  }
};

export const POST: APIRoute = async (context) => {
  return GET(context);
};