// src/lib/messaging/messenger.ts

const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const MESSENGER_API_URL = 'https://graph.facebook.com/v18.0/me/messages';

/**
 * Send a message via Facebook Messenger
 */
export async function sendMessengerMessage(
  recipientId: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(`${MESSENGER_API_URL}?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: message },
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Failed to send message');
    }

    return {
      success: true,
      messageId: data.message_id,
    };
  } catch (error) {
    console.error('Messenger send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a message with buttons
 */
export async function sendMessengerButtonMessage(
  recipientId: string,
  text: string,
  buttons: Array<{
    type: 'web_url' | 'postback';
    title: string;
    url?: string;
    payload?: string;
  }>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${MESSENGER_API_URL}?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text,
              buttons,
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Messenger button send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send class reminder with confirmation buttons
 */
export async function sendClassReminderWithConfirmation(
  recipientId: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  return sendMessengerButtonMessage(recipientId, message, [
    {
      type: 'postback',
      title: '✅ Confirm Attendance',
      payload: 'CONFIRM_ATTENDANCE',
    },
    {
      type: 'postback',
      title: '📅 Reschedule',
      payload: 'RESCHEDULE_CLASS',
    },
  ]);
}

/**
 * Handle incoming Messenger webhook
 */
export async function handleMessengerWebhook(body: any) {
  if (body.object !== 'page') {
    return { success: false, error: 'Invalid webhook object' };
  }

  for (const entry of body.entry) {
    for (const messaging of entry.messaging) {
      const senderId = messaging.sender.id;

      // Handle text messages
      if (messaging.message?.text) {
        const text = messaging.message.text.toLowerCase();
        
        if (text === 'yes' || text === 'confirm') {
          await sendMessengerMessage(
            senderId,
            'Great! Your attendance has been confirmed. ✅'
          );
        }
      }

      // Handle postback (button clicks)
      if (messaging.postback) {
        const payload = messaging.postback.payload;
        
        if (payload === 'CONFIRM_ATTENDANCE') {
          await sendMessengerMessage(
            senderId,
            'Thank you for confirming! See you in class. ✅'
          );
        } else if (payload === 'RESCHEDULE_CLASS') {
          await sendMessengerMessage(
            senderId,
            'Please contact your instructor to reschedule: [instructor contact info]'
          );
        }
      }
    }
  }

  return { success: true };
}

/**
 * Verify webhook signature (important for security!)
 */
export function verifyMessengerSignature(
  signature: string,
  body: string
): boolean {
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
  
  if (!APP_SECRET) {
    console.error('Facebook App Secret not configured');
    return false;
  }

  // Create HMAC SHA256 hash
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(body)
    .digest('hex');

  return signature === `sha256=${expectedSignature}`;
}
