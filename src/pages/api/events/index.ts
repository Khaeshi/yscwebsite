import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.js';
import Event from '../../../lib/db/models/Event.js';
import Registration from '../../../lib/db/models/Registration.js';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    + '-' + Date.now();
}

// GET /api/events
export const GET: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const url     = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';
    const filter  = isAdmin ? {} : { status: 'published' };
    const events  = await Event.find(filter).sort({ startDate: 1 }).lean() as any[];

    const ids    = events.map((e: any) => e._id);
    const counts = await Registration.aggregate([
      { $match: { eventId: { $in: ids } } },
      { $group: { _id: '$eventId', total: { $sum: 1 },
          pending:  { $sum: { $cond: [{ $eq: ['$status', 'pending']  }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] } },
      }}
    ]);
    const countMap = Object.fromEntries(counts.map((c: any) => [String(c._id), c]));
    const result   = events.map((e: any) => ({
      ...e,
      registrationCounts: countMap[String(e._id)] ?? { total: 0, pending: 0, approved: 0, rejected: 0 },
    }));

    return json({ success: true, events: result });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};

// POST /api/events — admin only
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const user = locals.user;
    if (!user) return json({ success: false, message: 'Unauthorized' }, 401);

    await connectDB();
    const body = await request.json();

    // Auto-generate slug if missing
    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }

    const event = await Event.create(body);
    return json({ success: true, event }, 201);
  } catch (err: any) {
    if (err.code === 11000) return json({ success: false, message: 'Slug already exists' }, 409);
    return json({ success: false, message: err.message }, 500);
  }
};