import type { APIRoute } from 'astro';
import { MongoClient, ObjectId } from 'mongodb';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

function assertAdmin(locals: App.Locals) {
  if (!locals.user) return { ok: false as const, response: json({ success: false, message: 'Unauthorized' }, 401) };
  const role = locals.user.role;
  if (role !== 'admin' && role !== 'superadmin') {
    return { ok: false as const, response: json({ success: false, message: 'Forbidden' }, 403) };
  }
  return { ok: true as const, user: locals.user };
}

function parseId(idParam: string | undefined) {
  if (!idParam) return null;
  try {
    return new ObjectId(idParam);
  } catch {
    return null;
  }
}

export const PUT: APIRoute = async ({ request, locals, params }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  const _id = parseId(params.id);
  if (!_id) return json({ success: false, message: 'Invalid teacher id' }, 400);

  const body = await request.json().catch(() => null);
  if (!body) return json({ success: false, message: 'Invalid JSON body' }, 400);

  const update: Record<string, any> = {};
  if (body.email != null) update.email = body.email.toString().trim().toLowerCase();
  if (body.name != null) update.name = body.name.toString().trim();
  if (body.phone != null) update.phone = body.phone ? body.phone.toString().trim() : undefined;

  const uri = import.meta.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('YSC');

    const teacher = await db.collection('users').findOne({ _id, role: 'teacher' });
    if (!teacher) return json({ success: false, message: 'Teacher not found' }, 404);

    if (update.email && update.email !== teacher.email) {
      const exists = await db.collection('users').findOne({ email: update.email, _id: { $ne: _id } });
      if (exists) return json({ success: false, message: 'Email already exists' }, 409);
    }

    await db.collection('users').updateOne({ _id }, { $set: update });
    const updated = await db.collection('users').findOne({ _id }, { projection: { hashedPassword: 0 } });
    return json({ success: true, teacher: updated });
  } catch (err: any) {
    return json({ success: false, message: err?.message ?? 'Failed to update teacher' }, 500);
  } finally {
    await client.close();
  }
};

export const PATCH: APIRoute = async ({ request, locals, params }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  const _id = parseId(params.id);
  if (!_id) return json({ success: false, message: 'Invalid teacher id' }, 400);

  const body = await request.json().catch(() => null);
  if (!body) return json({ success: false, message: 'Invalid JSON body' }, 400);

  const isApproved = Boolean(body.isApproved);
  const uri = import.meta.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('YSC');

    const teacher = await db.collection('users').findOne({ _id, role: 'teacher' });
    if (!teacher) return json({ success: false, message: 'Teacher not found' }, 404);

    const update: Record<string, any> = {
      isApproved,
      approvedBy: admin.user.id,
      approvedAt: isApproved ? new Date() : null,
    };

    await db.collection('users').updateOne({ _id }, { $set: update });
    const updated = await db.collection('users').findOne({ _id }, { projection: { hashedPassword: 0 } });
    return json({ success: true, teacher: updated });
  } catch (err: any) {
    return json({ success: false, message: err?.message ?? 'Failed to update approval' }, 500);
  } finally {
    await client.close();
  }
};

export const DELETE: APIRoute = async ({ locals, params }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  const _id = parseId(params.id);
  if (!_id) return json({ success: false, message: 'Invalid teacher id' }, 400);

  const uri = import.meta.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('YSC');

    const teacher = await db.collection('users').findOne({ _id, role: 'teacher' });
    if (!teacher) return json({ success: false, message: 'Teacher not found' }, 404);

    await db.collection('users').deleteOne({ _id });
    return json({ success: true });
  } catch (err: any) {
    return json({ success: false, message: err?.message ?? 'Failed to delete teacher' }, 500);
  } finally {
    await client.close();
  }
};

