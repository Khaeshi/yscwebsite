import type { APIRoute } from 'astro';
import { connectDB } from '../../../../lib/db/client.ts';
import Schedule from '../../../../lib/db/models/Schedule.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



export const POST: APIRoute = async ({ params }) => {

  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  console.log('Token value:', token);
  console.log('Token length:', token?.length);
  
  try {
    await connectDB();

    const schedule = await Schedule.findById(params.id)
      .populate('studentId', 'name telegramChatId phone')
      .lean() as any;

    if (!schedule || !schedule.studentId) {
      return json({ success: false, message: 'Schedule not found' }, 404);
    }

    const student = schedule.studentId;

    if (!student.telegramChatId) {
      return json({
        success: false,
        message: `${student.name} has no Telegram Chat ID set`,
      }, 400);
    }

    const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
    if (!TELEGRAM_BOT_TOKEN) {
      return json({ success: false, message: 'TELEGRAM_BOT_TOKEN is not configured' }, 500);
    }

    const classEmoji = schedule.classType === 'online' ? '💻' : '🏫';
    const dayName    = DAYS[schedule.dayOfWeek] ?? 'Unknown';

    const message = [
      `${classEmoji} *Class Reminder* \\(Test\\)`,
      ``,
      `Hi *${escapeMd(student.name)}*\\!`,
      ``,
      `📚 *Class:* ${escapeMd(schedule.className)}`,
      `📅 *Day:* ${dayName}`,
      `⏰ *Time:* ${escapeMd(schedule.time)}`,
      `⏱ *Duration:* ${schedule.duration} min`,
      `📍 *Type:* ${schedule.classType.toUpperCase()}`,
      ``,
      `_This is a test reminder\\._`,
    ].join('\n');

    const telegramRes = await fetch(
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

    const telegramData = await telegramRes.json() as any;

    if (!telegramData.ok) {
      console.error('Telegram error:', telegramData);
      return json({
        success: false,
        message: `Telegram error: ${telegramData.description ?? 'Unknown error'}`,
      }, 500);
    }

    return json({
      success: true,
      message: `✅ Test reminder sent to ${student.name}`,
    });

  } catch (error) {
    console.error('POST /api/schedules/test/[id] error:', error);
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send reminder',
    }, 500);
  }
};

// Escape special characters for Telegram MarkdownV2
function escapeMd(text: string): string {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}