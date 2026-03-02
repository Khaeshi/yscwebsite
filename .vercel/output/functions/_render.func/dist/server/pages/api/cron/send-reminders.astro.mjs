import { c as connectDB } from "../../../chunks/client_CagqtE4a.mjs";
import { S as Schedule } from "../../../chunks/Schedule_DLJUnlVr.mjs";
import { r } from "../../../chunks/_@astro-renderers_B4KjVBz-.mjs";
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json" }
});
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function escapeMd(text) {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}
const POST = async ({ request }) => {
  try {
    const authHeader = request.headers.get("x-cron-secret");
    const CRON_SECRET = process.env.CRON_SECRET;
    if (!CRON_SECRET || authHeader !== CRON_SECRET) {
      return json({ success: false, message: "Unauthorized" }, 401);
    }
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    if (!TELEGRAM_BOT_TOKEN) {
      return json({ success: false, message: "TELEGRAM_BOT_TOKEN not configured" }, 500);
    }
    await connectDB();
    const now = /* @__PURE__ */ new Date();
    const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const currentDay = phTime.getDay();
    const currentHour = phTime.getHours();
    const currentMinute = phTime.getMinutes();
    const currentTotal = currentHour * 60 + currentMinute;
    console.log(`Cron running at PH time: ${phTime.toLocaleString()} | Day: ${DAYS[currentDay]} | ${currentHour}:${String(currentMinute).padStart(2, "0")}`);
    const schedules = await Schedule.find({ active: true }).populate("studentId", "name telegramChatId").lean();
    const validSchedules = schedules.filter((s) => s.studentId?.telegramChatId);
    const results = [];
    for (const schedule of validSchedules) {
      const [schedHour, schedMinute] = schedule.time.split(":").map(Number);
      const schedTotal = schedHour * 60 + schedMinute;
      const reminderFiresAt = schedTotal - schedule.reminderMinutes;
      const diff = currentTotal - reminderFiresAt;
      const isRightDay = schedule.dayOfWeek === currentDay;
      const isRightTime = diff >= 0 && diff < 5;
      if (!isRightDay || !isRightTime) continue;
      const student = schedule.studentId;
      const classEmoji = schedule.classType === "online" ? "💻" : "🏫";
      const message = [
        `${classEmoji} *Class Reminder*`,
        ``,
        `Hi *${escapeMd(student.name)}*\\!`,
        ``,
        `📚 *Class:* ${escapeMd(schedule.className)}`,
        `⏰ *Time:* ${escapeMd(schedule.time)}`,
        `⏱ *Duration:* ${schedule.duration} min`,
        `📍 *Type:* ${schedule.classType.toUpperCase()}`,
        ``,
        `_Your class starts in ${schedule.reminderMinutes >= 60 ? `${schedule.reminderMinutes / 60} hour${schedule.reminderMinutes > 60 ? "s" : ""}` : `${schedule.reminderMinutes} minutes`}\\._`
      ].join("\n");
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: student.telegramChatId,
              text: message,
              parse_mode: "MarkdownV2"
            })
          }
        );
        const data = await res.json();
        if (data.ok) {
          console.log(`✅ Sent reminder to ${student.name} for ${schedule.className}`);
          results.push({ name: student.name, class: schedule.className, status: "sent" });
        } else {
          console.error(`❌ Failed for ${student.name}:`, data.description);
          results.push({ name: student.name, class: schedule.className, status: `failed: ${data.description}` });
        }
      } catch (err) {
        console.error(`❌ Error sending to ${student.name}:`, err);
        results.push({ name: student.name, class: schedule.className, status: "error" });
      }
    }
    return json({
      success: true,
      time: phTime.toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
      checked: validSchedules.length,
      sent: results.filter((r2) => r2.status === "sent").length,
      results
    });
  } catch (error) {
    console.error("Cron error:", error);
    return json({
      success: false,
      message: error instanceof Error ? error.message : "Cron job failed"
    }, 500);
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
