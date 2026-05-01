import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import Schedule from '../../../lib/db/models/Schedule.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);
    await connectDB();
    const role = locals.user.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isTeacher = role === 'teacher';

    const schedule = await Schedule.findById(params.id)
      .populate('studentId', 'name telegramChatId phone')
      .populate('teacherId', 'name email phone isApproved')
      .lean();

    if (!schedule || !schedule.studentId)
       return json({ success: false, message: 'Schedule not found' }, 404);

    if (isTeacher && String((schedule as any).teacherId?._id ?? (schedule as any).teacherId) !== locals.user.id) {
      return json({ success: false, message: 'Forbidden' }, 403);
    }
    if (!isTeacher && !isAdmin) return json({ success: false, message: 'Forbidden' }, 403);

    return json({ success: true, schedule });
  } catch (error) {
    return json({ success: false, message: 'Failed to fetch schedule' }, 500);
  }
};

export const PUT: APIRoute = async ({ params, request, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);
    await connectDB();
    const body = await request.json();

    const role = locals.user.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isTeacher = role === 'teacher';
    if (!isTeacher && !isAdmin) return json({ success: false, message: 'Forbidden' }, 403);

    const existing = await Schedule.findById(params.id).lean();
    if (!existing) return json({ success: false, message: 'Schedule not found' }, 404);
    if (isTeacher && String((existing as any).teacherId) !== locals.user.id) {
      return json({ success: false, message: 'Forbidden' }, 403);
    }

    // Teachers cannot reassign schedules to another teacher
    if (isTeacher && 'teacherId' in body) delete body.teacherId;

    const schedule = await Schedule.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
      .populate('studentId', 'name telegramChatId phone')
      .populate('teacherId', 'name email phone isApproved')
      .lean();

    if (!schedule) return json({ success: false, message: 'Schedule not found' }, 404);
    return json({ success: true, schedule });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update schedule',
    }, 500);
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);
    await connectDB();
    const role = locals.user.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isTeacher = role === 'teacher';
    if (!isTeacher && !isAdmin) return json({ success: false, message: 'Forbidden' }, 403);

    const existing = await Schedule.findById(params.id).lean();
    if (!existing) return json({ success: false, message: 'Schedule not found' }, 404);
    if (isTeacher && String((existing as any).teacherId) !== locals.user.id) {
      return json({ success: false, message: 'Forbidden' }, 403);
    }

    await Schedule.updateOne({ _id: params.id }, { $set: { isActive: false } });
    return json({ success: true });
  } catch (error) {
    return json({ success: false, message: 'Failed to delete schedule' }, 500);
  }
};