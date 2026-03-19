import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.js';
import Registration from '../../../lib/db/models/Registration.js';
import Event from '../../../lib/db/models/Event.js';
import { Resend } from 'resend';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const PATCH: APIRoute = async ({ request, locals, params }) => {
  try {
    const user = locals.user;
    if (!user) return json({ success: false, message: 'Unauthorized' }, 401);

    await connectDB();
    const { status, statusNote } = await request.json();

    if (!['approved', 'rejected'].includes(status)) {
      return json({ success: false, message: 'Status must be approved or rejected' }, 400);
    }

    const reg = await Registration.findById(params.id).lean() as any;
    if (!reg) return json({ success: false, message: 'Registration not found' }, 404);

    const now = new Date();
    const updated = await Registration.findByIdAndUpdate(
      params.id,
      { $set: {
        status,
        statusNote: statusNote?.trim() ?? '',
        ...(status === 'approved' ? { confirmedAt: now } : { rejectedAt: now }),
      }},
      { new: true, returnDocument: 'after' }
    ).lean() as any;

    // Send confirmation email on approval only
    if (status === 'approved') {
      const event = await Event.findById(reg.eventId).lean() as any;
      resend.emails.send({
        from:    `Young Starter Club <${import.meta.env.RESEND_FROM_EMAIL}>`,
        to:      reg.email,
        subject: `You're Confirmed! — ${event?.title ?? 'Summer Class'}`,
        html:    buildConfirmEmail({ reg, event }),
      }).catch((err: any) => console.error('Resend confirm error:', err));
    }

    return json({ success: true, registration: updated });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};

function buildConfirmEmail({ reg, event }: { reg: any; event: any }) {
  const dateStr = event?.startDate
    ? new Date(event.startDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'TBA';
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
        ${event?.instrument ? `<p style="margin:4px 0 0;font-size:14px;color:#059669">🎵 ${event.instrument}</p>` : ''}
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">📅 Starting ${dateStr}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">⏰ ${event?.schedule ?? 'Morning sessions only (8:00 AM – 12:00 PM)'}</p>
      </div>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">Our team will contact you shortly with more details. For questions:</p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
        ${event?.contactPhone ? `<p style="margin:0 0 6px;font-size:14px;color:#374151">📱 <strong>${event.contactPhone}</strong></p>` : ''}
        ${event?.contactEmail ? `<p style="margin:0;font-size:14px;color:#374151">✉️ <strong>${event.contactEmail}</strong></p>` : ''}
      </div>
      <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6">Your personal information is protected under the Data Privacy Act of 2012 (RA 10173).</p>
    </div>
    <div style="background:#f3f4f6;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">© ${new Date().getFullYear()} Young Starter Club. All rights reserved.</p>
    </div>
  </div></body></html>`;
}