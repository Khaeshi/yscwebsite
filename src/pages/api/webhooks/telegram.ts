// src/pages/api/webhooks/telegram.ts
import type { APIRoute } from 'astro';
import { handleTelegramUpdate } from '../../../lib/messaging/telegram.ts';

/**
 * POST /api/webhooks/telegram - Telegram webhook endpoint
 * 
 * Set this URL in your Telegram bot settings:
 * https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://yourdomain.com/api/webhooks/telegram
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const update = await request.json();
    
    console.log('Received Telegram update:', update);

    // Handle the update
    await handleTelegramUpdate(update);

    // Telegram expects 200 OK response
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    
    // Still return 200 to avoid Telegram retrying
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * GET /api/webhooks/telegram - Webhook verification (optional)
 */
export const GET: APIRoute = async () => {
  return new Response('Telegram webhook is active', { status: 200 });
};
