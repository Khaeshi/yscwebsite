import { c as connectDB } from "../../../chunks/client_2qSNy_zs.mjs";
import { S as Schedule } from "../../../chunks/Schedule_Cvi5aeJn.mjs";
import { r } from "../../../chunks/_@astro-renderers_DOBI-D1Y.mjs";
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json" }
});
const GET = async ({ params }) => {
  try {
    await connectDB();
    const schedule = await Schedule.findById(params.id).populate("studentId", "name telegramChatId phone").lean();
    if (!schedule || !schedule.studentId)
      return json({ success: false, message: "Schedule not found" }, 404);
    return json({ success: true, schedule });
  } catch (error) {
    return json({ success: false, message: "Failed to fetch schedule" }, 500);
  }
};
const PUT = async ({ params, request }) => {
  try {
    await connectDB();
    const body = await request.json();
    const schedule = await Schedule.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate("studentId", "name telegramChatId phone").lean();
    if (!schedule) return json({ success: false, message: "Schedule not found" }, 404);
    return json({ success: true, schedule });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update schedule"
    }, 500);
  }
};
const DELETE = async ({ params }) => {
  try {
    await connectDB();
    const schedule = await Schedule.findByIdAndDelete(params.id);
    if (!schedule) return json({ success: false, message: "Schedule not found" }, 404);
    return json({ success: true, message: "Schedule deleted" });
  } catch (error) {
    return json({ success: false, message: "Failed to delete schedule" }, 500);
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
