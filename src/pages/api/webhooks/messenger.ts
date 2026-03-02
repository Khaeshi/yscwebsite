// src/pages/api/webhooks/messenger.ts
import type { APIRoute } from 'astro';
import { handleMessengerWebhook, verifyMessengerSignature } from '../../../lib/messaging/messenger.ts';

/**
 * GET /api/webhooks/messenger - Webhook verification
 * Facebook will send a GET request to verify your webhook
 */
export const GET: APIRoute = async ({ url }) => {
  const VERIFY_TOKEN = import.meta.env.FACEBOOK_VERIFY_TOKEN || 'ysc_verify_token_12345';

  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return new Response(challenge, { status: 200 });
  }

  return new Response('Verification failed', { status: 403 });
};

/**
 * POST /api/webhooks/messenger - Messenger webhook endpoint
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const signature = request.headers.get('x-hub-signature-256') || '';
    const body = await request.text();

    // Verify signature (important for security!)
    if (!verifyMessengerSignature(signature, body)) {
      console.error('Invalid signature');
      return new Response('Unauthorized', { status: 401 });
    }

    const data = JSON.parse(body);
    
    console.log('Received Messenger webhook:', data);

    // Handle the webhook
    await handleMessengerWebhook(data);

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Messenger webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
