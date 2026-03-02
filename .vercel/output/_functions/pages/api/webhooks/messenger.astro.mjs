import { r } from "../../../chunks/_@astro-renderers_B4KjVBz-.mjs";
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const MESSENGER_API_URL = "https://graph.facebook.com/v18.0/me/messages";
async function sendMessengerMessage(recipientId, message) {
  try {
    const response = await fetch(`${MESSENGER_API_URL}?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: message }
      })
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || "Failed to send message");
    }
    return {
      success: true,
      messageId: data.message_id
    };
  } catch (error) {
    console.error("Messenger send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function handleMessengerWebhook(body) {
  if (body.object !== "page") {
    return { success: false, error: "Invalid webhook object" };
  }
  for (const entry of body.entry) {
    for (const messaging of entry.messaging) {
      const senderId = messaging.sender.id;
      if (messaging.message?.text) {
        const text = messaging.message.text.toLowerCase();
        if (text === "yes" || text === "confirm") {
          await sendMessengerMessage(
            senderId,
            "Great! Your attendance has been confirmed. ✅"
          );
        }
      }
      if (messaging.postback) {
        const payload = messaging.postback.payload;
        if (payload === "CONFIRM_ATTENDANCE") {
          await sendMessengerMessage(
            senderId,
            "Thank you for confirming! See you in class. ✅"
          );
        } else if (payload === "RESCHEDULE_CLASS") {
          await sendMessengerMessage(
            senderId,
            "Please contact your instructor to reschedule: [instructor contact info]"
          );
        }
      }
    }
  }
  return { success: true };
}
function verifyMessengerSignature(signature, body) {
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
  if (!APP_SECRET) {
    console.error("Facebook App Secret not configured");
    return false;
  }
  const crypto = require("crypto");
  const expectedSignature = crypto.createHmac("sha256", APP_SECRET).update(body).digest("hex");
  return signature === `sha256=${expectedSignature}`;
}
const GET = async ({ url }) => {
  const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || "ysc_verify_token_12345";
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return new Response(challenge, { status: 200 });
  }
  return new Response("Verification failed", { status: 403 });
};
const POST = async ({ request }) => {
  try {
    const signature = request.headers.get("x-hub-signature-256") || "";
    const body = await request.text();
    if (!verifyMessengerSignature(signature, body)) {
      console.error("Invalid signature");
      return new Response("Unauthorized", { status: 401 });
    }
    const data = JSON.parse(body);
    console.log("Received Messenger webhook:", data);
    await handleMessengerWebhook(data);
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Messenger webhook error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
