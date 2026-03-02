import { connectDB } from '../db/client.ts';
import Schedule from '../db/models/Schedule.ts';
import { sendTelegramMessage } from '../messaging/telegram.ts';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/**
 * Find schedules due for reminders and send them.
 * Call this from a cron job (e.g. every 15 minutes).
 */
export async function processDueReminders(): Promise<{
  processed: number;
  sent: number;
  failed: number;
  errors: string[];
}> {
  const stats = { processed: 0, sent: 0, failed: 0, errors: [] as string[] };

  await connectDB();

  const now = new Date();
  const todayDayOfWeek = now.getDay(); // 0 = Sunday

  // Get all active schedules for today
  const schedules = await Schedule.find({
    active: true,
    dayOfWeek: todayDayOfWeek,
  }).populate('studentId', 'name telegramChatId');

  for (const schedule of schedules) {
    const student = schedule.studentId as any;

    // Skip if no Telegram ID
    if (!student?.telegramChatId) continue;

    // Parse class time
    const [hours, minutes] = schedule.time.split(':').map(Number);
    const classTime = new Date();
    classTime.setHours(hours, minutes, 0, 0);

    // Check if reminder should fire now (within a 15-min window)
    const reminderTime = new Date(classTime.getTime() - schedule.reminderMinutes * 60 * 1000);
    const diffMs = reminderTime.getTime() - now.getTime();
    const diffMin = diffMs / 1000 / 60;

    // Fire if within the next 15 minutes
    if (diffMin < 0 || diffMin > 15) continue;

    stats.processed++;

    try {
      const message = buildReminderMessage({
        studentName:    student.name,
        className:      schedule.className,
        classType:      schedule.classType,
        time:           schedule.time,
        reminderMinutes: schedule.reminderMinutes,
      });

      await sendTelegramMessage(student.telegramChatId, message);
      stats.sent++;
    } catch (err: any) {
      stats.failed++;
      stats.errors.push(`${student.name}: ${err.message}`);
    }
  }

  return stats;
}

/**
 * Build the Telegram reminder message text.
 */
export function buildReminderMessage(params: {
  studentName: string;
  className: string;
  classType: 'online' | 'onsite';
  time: string;
  reminderMinutes: number;
}) {
  const { studentName, className, classType, time, reminderMinutes } = params;
  const timeLabel = reminderMinutes >= 60
    ? `${reminderMinutes / 60} hour${reminderMinutes > 60 ? 's' : ''}`
    : `${reminderMinutes} minutes`;

  const icon = classType === 'online' ? '💻' : '🏫';

  return [
    `${icon} <b>Class Reminder</b>`,
    ``,
    `Hi <b>${studentName}</b>!`,
    `Your class starts in <b>${timeLabel}</b>:`,
    ``,
    `📚 <b>${className}</b>`,
    `⏰ ${time}`,
    `📍 ${classType.toUpperCase()}`,
    ``,
    `See you soon! 🎶`,
  ].join('\n');
}