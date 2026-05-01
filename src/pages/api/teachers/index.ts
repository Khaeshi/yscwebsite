import type { APIRoute } from 'astro';
import { MongoClient } from 'mongodb';
import { Argon2id } from 'oslo/password';

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

export const GET: APIRoute = async ({ locals }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  const uri = import.meta.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('YSC');
    const teachers = await db
      .collection('users')
      .find({ role: 'teacher' })
      .project({ hashedPassword: 0 })
      .sort({ createdAt: -1 })
      .toArray();

    return json({ success: true, teachers });
  } catch (err: any) {
    return json({ success: false, message: err?.message ?? 'Failed to fetch teachers' }, 500);
  } finally {
    await client.close();
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  const body = await request.json().catch(() => null);
  if (!body) return json({ success: false, message: 'Invalid JSON body' }, 400);

  const email = (body.email ?? '').toString().trim().toLowerCase();
  const password = (body.password ?? '').toString();
  const name = (body.name ?? '').toString().trim();
  const phone = body.phone ? body.phone.toString().trim() : undefined;

  if (!email || !password) {
    return json({ success: false, message: 'Missing required fields: email, password' }, 400);
  }

  const uri = import.meta.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('YSC');

    const exists = await db.collection('users').findOne({ email });
    if (exists) return json({ success: false, message: 'Email already exists' }, 409);

    const hashedPassword = await new Argon2id().hash(password);
    const now = new Date();
    const result = await db.collection('users').insertOne({
      email,
      hashedPassword,
      role: 'teacher',
      name,
      phone,
      isApproved: false,
      createdAt: now,
    });

    const teacher = await db
      .collection('users')
      .findOne({ _id: result.insertedId }, { projection: { hashedPassword: 0 } });

    return json({ success: true, teacher }, 201);
  } catch (err: any) {
    return json({ success: false, message: err?.message ?? 'Failed to create teacher' }, 500);
  } finally {
    await client.close();
  }
};

