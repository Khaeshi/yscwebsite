import { c as connectDB } from "../../chunks/client_CIIRc5iH.mjs";
import { E as Event } from "../../chunks/Event_BKIXZnNN.mjs";
import { R as Registration } from "../../chunks/Registration_DKoh7ux8.mjs";
import { r } from "../../chunks/_@astro-renderers_BiNbQtZO.mjs";
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
}
const GET = async ({ request }) => {
  try {
    await connectDB();
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "true";
    const filter = isAdmin ? {} : { status: "published" };
    const events = await Event.find(filter).sort({ startDate: 1 }).lean();
    const ids = events.map((e) => e._id);
    const counts = await Registration.aggregate([
      { $match: { eventId: { $in: ids } } },
      { $group: {
        _id: "$eventId",
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
        approved: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] } },
        rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } }
      } }
    ]);
    const countMap = Object.fromEntries(counts.map((c) => [String(c._id), c]));
    const result = events.map((e) => ({
      ...e,
      registrationCounts: countMap[String(e._id)] ?? { total: 0, pending: 0, approved: 0, rejected: 0 }
    }));
    return json({ success: true, events: result });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
};
const POST = async ({ request, locals }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: "Unauthorized" }, 401);
    await connectDB();
    const body = await request.json();
    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }
    const event = await Event.create(body);
    return json({ success: true, event }, 201);
  } catch (err) {
    if (err.code === 11e3) return json({ success: false, message: "Slug already exists" }, 409);
    return json({ success: false, message: err.message }, 500);
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
