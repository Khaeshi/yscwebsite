import { renderers } from "../../../renderers.mjs";
const TELEGRAM_BOT_TOKEN = "8498840101:AAHhTRTmuUSsmhSCSFsVskZpoVy0MyIrL3Y";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
async function sendTelegramMessage(telegramId, message, options) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: options?.parseMode || "Markdown",
        disable_notification: options?.disableNotification || false
      })
    });
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "Failed to send message");
    }
    return {
      success: true,
      messageId: data.result.message_id
    };
  } catch (error) {
    console.error("Telegram send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function handleTelegramUpdate(update) {
  if (update.message?.text === "/start") {
    const chatId = update.message.chat.id;
    const firstName = update.message.from.first_name;
    await sendTelegramMessage(
      chatId,
      `Welcome to Young Starter Club, ${firstName}! 🎉

To link your account, please provide your email address or student ID.`
    );
    return { success: true };
  }
  if (update.message?.text?.toLowerCase() === "yes") {
    const chatId = update.message.chat.id;
    await sendTelegramMessage(
      chatId,
      "Great! Your attendance has been confirmed. ✅"
    );
    return { success: true };
  }
  return { success: false, error: "Unhandled update" };
}
const POST = async ({ request }) => {
  try {
    const update = await request.json();
    console.log("Received Telegram update:", update);
    await handleTelegramUpdate(update);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async () => {
  return new Response("Telegram webhook is active", { status: 200 });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
