import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.js';
import Registration from '../../../lib/db/models/Registration.js';
import Event from '../../../lib/db/models/Event.js';
import { Resend } from 'resend';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: 'Unauthorized' }, 401);

    await connectDB();
    const url     = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    const status  = url.searchParams.get('status');

    const filter: Record<string, any> = {};
    if (eventId) filter.eventId = eventId;
    if (status)  filter.status  = status;

    const registrations = await Registration.find(filter)
      .populate('eventId', 'title instrument startDate contactEmail contactPhone schedule')
      .sort({ createdAt: -1 })
      .lean();

    return json({ success: true, registrations });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const body = await request.json();
    const { eventId, fullName, email, phone, dateOfBirth, parentGuardian, instrumentInterest, consentGiven } = body;

    if (!eventId || !fullName || !email || !phone || !dateOfBirth || !parentGuardian) {
      return json({ success: false, message: 'All required fields must be filled out' }, 400);
    }
    if (!consentGiven) {
      return json({ success: false, message: 'You must agree to the privacy policy to register' }, 400);
    }

    const event = await Event.findById(eventId).lean() as any;
    if (!event) return json({ success: false, message: 'Event not found' }, 404);
    if (event.status !== 'published') {
      return json({ success: false, message: 'Registration is not open for this event' }, 400);
    }

    if (event.maxSlots) {
      const approvedCount = await Registration.countDocuments({ eventId, status: 'approved' });
      if (approvedCount >= event.maxSlots) {
        return json({ success: false, message: 'Sorry, this event is fully booked' }, 400);
      }
    }

    const registration = await Registration.create({
      eventId, fullName, email: email.toLowerCase(), phone,
      dateOfBirth: new Date(dateOfBirth),
      parentGuardian, instrumentInterest,
      consentGiven: true, consentDate: new Date(),
      status: 'pending',
    });

    // Send acknowledgement email (non-blocking)
    resend.emails.send({
      from:    `Young Starter Club <${import.meta.env.RESEND_FROM_EMAIL}>`,
      to:      email,
      subject: `Registration Received — ${event.title}`,
      html:    buildAckEmail({ fullName, event }),
    }).catch((err: any) => console.error('Resend ack error:', err));

    return json({ success: true, registration }, 201);
  } catch (err: any) {
    if (err.code === 11000) {
      return json({ success: false, message: 'This email is already registered for this event' }, 409);
    }
    return json({ success: false, message: err.message }, 500);
  }
};

function buildAckEmail({ fullName, event }: { fullName: string; event: any }) {
  const dateStr = event.startDate
    ? new Date(event.startDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'TBA';
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:36px 32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700">Young Starter Club</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Registration Received</p>
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:16px;color:#111827">Hi <strong>${fullName}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">
        Thank you for registering for <strong>${event.title}</strong>! We have received your application and our team will review it shortly.
      </p>
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:20px;margin-bottom:24px">
        <p style="margin:0 0 4px;font-size:12px;color:#7c3aed;font-weight:700;text-transform:uppercase">Event Details</p>
        <p style="margin:8px 0 0;font-size:18px;font-weight:700;color:#111827">${event.title}</p>
        ${event.instrument ? `<p style="margin:4px 0 0;font-size:14px;color:#7c3aed">🎵 ${event.instrument}</p>` : ''}
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">📅 Starting ${dateStr}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280">⏰ ${event.schedule}</p>
      </div>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        Once your registration is approved, you will receive a confirmation email. For questions:
      </p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
        ${event.contactPhone ? `<p style="margin:0 0 6px;font-size:14px;color:#374151">📱 <strong>${event.contactPhone}</strong></p>` : ''}
        ${event.contactEmail ? `<p style="margin:0;font-size:14px;color:#374151">✉️ <strong>${event.contactEmail}</strong></p>` : ''}
      </div>
      <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6">Your personal information is protected under the Data Privacy Act of 2012 (RA 10173).</p>
    </div>
    <div style="background:#f3f4f6;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">© ${new Date().getFullYear()} Young Starter Club. All rights reserved.</p>
    </div>
  </div></body></html>`;
}