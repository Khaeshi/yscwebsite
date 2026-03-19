import { c as connectDB } from "../../../chunks/client_CIIRc5iH.mjs";
import { R as Registration } from "../../../chunks/Registration_DKoh7ux8.mjs";
import { E as Event } from "../../../chunks/Event_BKIXZnNN.mjs";
import { R as Resend } from "../../../chunks/index_BhGgFl-L.mjs";
import { r } from "../../../chunks/_@astro-renderers_BiNbQtZO.mjs";
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
const resend = new Resend("re_Pd8ZfA1s_FJwXzspRqKdMwNQuLafWDxVq");
const PATCH = async ({ request, locals, params }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: "Unauthorized" }, 401);
    await connectDB();
    const { status, statusNote } = await request.json();
    if (!["approved", "rejected"].includes(status)) {
      return json({ success: false, message: "Status must be approved or rejected" }, 400);
    }
    const reg = await Registration.findById(params.id).lean();
    if (!reg) return json({ success: false, message: "Registration not found" }, 404);
    const now = /* @__PURE__ */ new Date();
    const updated = await Registration.findByIdAndUpdate(
      params.id,
      { $set: {
        status,
        statusNote: statusNote?.trim() ?? "",
        ...status === "approved" ? { confirmedAt: now } : { rejectedAt: now }
      } },
      { new: true, returnDocument: "after" }
    ).lean();
    if (status === "approved") {
      const event = await Event.findById(reg.eventId).lean();
      resend.emails.send({
        from: `Young Starter Club <${"onboarding@resend.dev"}>`,
        to: reg.email,
        subject: `You're Confirmed! — ${event?.title ?? "Summer Class"}`,
        html: buildConfirmEmail({ reg, event })
      }).catch((err) => console.error("Resend confirm error:", err));
    }
    return json({ success: true, registration: updated });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
};
function buildConfirmEmail({ reg, event }) {
  const dateStr = event?.startDate ? new Date(event.startDate).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }) : "TBA";
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#059669,#7c3aed);padding:36px 32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700">You're Confirmed!</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Young Starter Club</p>
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:16px;color:#111827">Hi <strong>${reg.fullName}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">
        Your registration for <strong>${event?.title}</strong> has been <strong style="color:#059669">approved</strong>. We're excited to have you!
      </p>
      <div style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;padding:20px;margin-bottom:24px">
        <p style="margin:0 0 4px;font-size:12px;color:#059669;font-weight:700;text-transform:uppercase">Your Class</p>
        <p style="margin:8px 0 0;font-size:18px;font-weight:700;color:#111827">${event?.title}</p>
        ${event?.instrument ? `<p style="margin:4px 0 0;font-size:14px;color:#059669">🎵 ${event.instrument}</p>` : ""}
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">📅 Starting ${dateStr}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">⏰ ${event?.schedule ?? "Morning sessions only (8:00 AM – 12:00 PM)"}</p>
      </div>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">Our team will contact you shortly with more details. For questions:</p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
        ${event?.contactPhone ? `<p style="margin:0 0 6px;font-size:14px;color:#374151">📱 <strong>${event.contactPhone}</strong></p>` : ""}
        ${event?.contactEmail ? `<p style="margin:0;font-size:14px;color:#374151">✉️ <strong>${event.contactEmail}</strong></p>` : ""}
      </div>
      <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6">Your personal information is protected under the Data Privacy Act of 2012 (RA 10173).</p>
    </div>
    <div style="background:#f3f4f6;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">© ${(/* @__PURE__ */ new Date()).getFullYear()} Young Starter Club. All rights reserved.</p>
    </div>
  </div></body></html>`;
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PATCH
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
