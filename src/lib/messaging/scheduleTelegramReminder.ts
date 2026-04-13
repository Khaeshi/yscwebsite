/**
 * Telegram MarkdownV2 reminder body for class schedules.
 * Used by cron (/api/send-reminders) and test send — keep in sync.
 */

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function escapeTelegramMarkdownV2(text: string): string {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function formatTime12h(hhmm: string): string {
  const [hRaw, mRaw] = hhmm.split(':');
  const hour24 = Number(hRaw) % 24;
  const minute = Number(mRaw ?? 0) || 0;
  const isAm = hour24 < 12;
  let h12 = hour24 % 12;
  if (h12 === 0) h12 = 12;
  const mm = String(minute).padStart(2, '0');
  return `${h12}:${mm} ${isAm ? 'AM' : 'PM'}`;
}

/** e.g. "Maria Santos" → "Maria's" for topic line */
function possessiveFirstName(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "Student's";
  const first = t.split(/\s+/)[0];
  return /s$/i.test(first) ? `${first}'` : `${first}'s`;
}

function sessionModePhrase(classType: 'online' | 'onsite'): string {
  return classType === 'online' ? 'an online' : 'an in-person';
}

export interface ScheduleReminderScheduleLike {
  className: string;
  classType: 'online' | 'onsite';
  dayOfWeek: number;
  time: string;
  instrumentLabel?: string;
  sessionNumber?: number;
  sessionSetLabel?: string;
  timeRegion?: string;
}

export interface ScheduleReminderStudentLike {
  name: string;
  telegramChatId?: string;
}

export function buildScheduleReminderMarkdownV2(
  schedule: ScheduleReminderScheduleLike,
  student: ScheduleReminderStudentLike,
  options?: { isTest?: boolean }
): string {
  const lessonForLine = schedule.className.trim() || 'your lesson';
  const instrument =
    (schedule.instrumentLabel && schedule.instrumentLabel.trim()) || schedule.className.trim() || 'Music';
  const sessionNum = schedule.sessionNumber ?? 1;
  const setLabel = (schedule.sessionSetLabel && schedule.sessionSetLabel.trim()) || '1st';
  const region = (schedule.timeRegion && schedule.timeRegion.trim()) || 'Philippines (PHT)';
  const dayName = DAYS[schedule.dayOfWeek] ?? 'Scheduled day';
  const time12 = formatTime12h(schedule.time);
  const mode = sessionModePhrase(schedule.classType);

  const e = escapeTelegramMarkdownV2;
  const studentName = student.name.trim() || 'Student';
  const topicPoss = possessiveFirstName(studentName);

  const lines: string[] = [];

  if (options?.isTest) {
    lines.push(`_This is a test reminder\\._`, ``);
  }

  lines.push(
    `Young Starter Club is conducting ${e(mode)} session with ${e(studentName)} for ${e(lessonForLine)}\\.`,
    ``,
    `Topic: ${e(topicPoss)} ${e(instrument)} Lesson \\- ${sessionNum} session ${e(setLabel)}`,
    ``,
    `Date\\&Time: ${e(dayName)}\\, ${e(time12)} ${e(region)}`,
    ``,
    `YSC conducts a hybrid approach when needed\\.`
  );

  return lines.join('\n');
}

/** Human-readable preview for admin UI (not MarkdownV2). */
export function buildScheduleReminderPlainPreview(
  schedule: ScheduleReminderScheduleLike,
  studentName: string,
  options?: { isTest?: boolean }
): string {
  const lessonForLine = schedule.className.trim() || 'your lesson';
  const instrument =
    (schedule.instrumentLabel && schedule.instrumentLabel.trim()) || schedule.className.trim() || 'Music';
  const sessionNum = schedule.sessionNumber ?? 1;
  const setLabel = (schedule.sessionSetLabel && schedule.sessionSetLabel.trim()) || '1st';
  const region = (schedule.timeRegion && schedule.timeRegion.trim()) || 'Philippines (PHT)';
  const dayName = DAYS[schedule.dayOfWeek] ?? 'Scheduled day';
  const time12 = formatTime12h(schedule.time);
  const mode = sessionModePhrase(schedule.classType);
  const name = studentName.trim() || 'Student';
  const topicPoss = possessiveFirstName(name);

  const parts: string[] = [];
  if (options?.isTest) parts.push('This is a test reminder.', '');
  parts.push(
    `Young Starter Club is conducting ${mode} session with ${name} for ${lessonForLine}.`,
    '',
    `Topic: ${topicPoss} ${instrument} Lesson - ${sessionNum} session ${setLabel}`,
    '',
    `Date&Time: ${dayName}, ${time12} ${region}`,
    '',
    'YSC conducts a hybrid approach when needed.'
  );
  return parts.join('\n');
}
