import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { PayrollRate, Teacher } from '../../../lib/db/models/index.ts';

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

async function getCurrentRate(teacherId: string) {
  return PayrollRate.findOne({ teacherId }).sort({ effectiveFrom: -1, createdAt: -1 }).lean();
}

export const GET: APIRoute = async ({ locals, url }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  try {
    await connectDB();
    const teacherId = url.searchParams.get('teacherId');

    if (teacherId) {
      const rate = await getCurrentRate(teacherId);
      return json({ success: true, rate: rate ?? null });
    }

    const teachers = await Teacher.find({ role: 'teacher' })
      .select('_id name email')
      .sort({ createdAt: -1 })
      .lean();

    const rates = await Promise.all(
      (teachers as any[]).map(async (teacher) => {
        const currentRate = await getCurrentRate(String(teacher._id));
        return {
          teacherId: String(teacher._id),
          teacherName: teacher.name || teacher.email,
          teacherEmail: teacher.email,
          currentRate: currentRate
            ? {
                amountPerSession: currentRate.amountPerSession,
                currency: currentRate.currency,
                effectiveFrom: currentRate.effectiveFrom,
                createdAt: currentRate.createdAt,
              }
            : null,
        };
      })
    );

    return json({ success: true, rates });
  } catch (error) {
    return json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to fetch payroll rates' },
      500
    );
  }
};

export const POST: APIRoute = async ({ locals, request }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  try {
    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body) return json({ success: false, message: 'Invalid JSON body' }, 400);

    const teacherId = (body.teacherId ?? '').toString();
    const amountPerSession = Number(body.amountPerSession);
    const currency = (body.currency ?? 'PHP').toString().trim() || 'PHP';
    const effectiveFrom = body.effectiveFrom ? new Date(body.effectiveFrom) : new Date();

    if (!teacherId || Number.isNaN(amountPerSession) || amountPerSession < 0) {
      return json({ success: false, message: 'teacherId and non-negative amountPerSession are required' }, 400);
    }

    const teacher = await Teacher.findById(teacherId).lean();
    if (!teacher) return json({ success: false, message: 'Teacher not found' }, 404);

    const rate = await PayrollRate.create({
      teacherId,
      amountPerSession,
      currency,
      effectiveFrom,
      setBy: admin.user.id,
    });

    return json({ success: true, rate }, 201);
  } catch (error) {
    return json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to set payroll rate' },
      500
    );
  }
};

