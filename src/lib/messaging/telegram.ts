// src/lib/messaging/telegram.ts
import type { Student, Schedule } from '../../types/models.ts';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

/**
 * Send a message to a Telegram user
 */
export async function sendTelegramMessage(
  telegramId: number,
  message: string,
  options?: {
    parseMode?: 'Markdown' | 'HTML';
    disableNotification?: boolean;
  }
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: options?.parseMode || 'Markdown',
        disable_notification: options?.disableNotification || false,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Failed to send message');
    }

    return {
      success: true,
      messageId: data.result.message_id,
    };
  } catch (error) {
    console.error('Telegram send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get information about the bot
 */
export async function getBotInfo() {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const data = await response.json();
    return data.ok ? data.result : null;
  } catch (error) {
    console.error('Failed to get bot info:', error);
    return null;
  }
}

/**
 * Set webhook for receiving updates
 * Use this for production to handle incoming messages
 */
export async function setWebhook(webhookUrl: string) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'callback_query'],
      }),
    });
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Failed to set webhook:', error);
    return false;
  }
}

/**
 * Process template variables and generate message
 */
export function processMessageTemplate(
  template: string,
  variables: {
    student_name?: string;
    class_type?: string;
    program_name?: string;
    date?: string;
    time?: string;
    location?: string;
    instructor_name?: string;
    reason?: string;
  }
): string {
  let message = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    message = message.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
  });
  
  return message;
}

/**
 * Format class reminder message
 */
export function formatClassReminder(schedule: Schedule & {
  student_name: string;
  program_name: string;
  instructor_name: string;
}): string {
  const classDate = new Date(schedule.scheduled_date);
  const formattedDate = classDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  return `Hi ${schedule.student_name}! 👋

Reminder: You have a *${schedule.classType}* ${schedule.program_name} class coming up.

📅 *Date:* ${formattedDate}
⏰ *Time:* ${schedule.scheduled_time}
📍 *Location:* ${schedule.location || 'TBA'}
👨‍🏫 *Instructor:* ${schedule.instructor_name}

See you soon! 🎵`;
}

/**
 * Send class reminder via Telegram
 */
export async function sendClassReminder(
  telegramId: number,
  schedule: Schedule & {
    student_name: string;
    program_name: string;
    instructor_name: string;
  }
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  const message = formatClassReminder(schedule);
  return sendTelegramMessage(telegramId, message);
}

/**
 * Handle incoming Telegram updates (for webhook)
 */
export async function handleTelegramUpdate(update: any) {
  // Handle /start command
  if (update.message?.text === '/start') {
    const chatId = update.message.chat.id;
    const firstName = update.message.from.first_name;
    
    await sendTelegramMessage(
      chatId,
      `Welcome to Young Starter Club, ${firstName}! 🎉\n\nTo link your account, please provide your email address or student ID.`
    );
    
    return { success: true };
  }
  
  // Handle confirmation replies
  if (update.message?.text?.toLowerCase() === 'yes') {
    const chatId = update.message.chat.id;
    await sendTelegramMessage(
      chatId,
      'Great! Your attendance has been confirmed. ✅'
    );
    return { success: true };
  }
  
  return { success: false, error: 'Unhandled update' };
}

/**
 * Verify if Telegram user exists and is active
 */
export async function verifyTelegramUser(telegramId: number): Promise<boolean> {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getChat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: telegramId }),
    });
    
    const data = await response.json();
    return data.ok;
  } catch (error) {
    return false;
  }
}
