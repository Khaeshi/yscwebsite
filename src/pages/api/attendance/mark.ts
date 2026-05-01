import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { AttendanceLog } from '../../../lib/db/models/index.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);

    const role = locals.user.role;
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin' || role === 'superadmin';
    if (!isTeacher && !isAdmin) return json({ success: false, message: 'Forbidden' }, 403);

    const body = await request.json().catch(() => null);
    if (!body) return json({ success: false, message: 'Invalid JSON body' }, 400);

    const logId = (body.logId ?? '').toString();
    const status = (body.status ?? '').toString();
    const note = body.note ? body.note.toString() : '';

    if (!logId || (status !== 'attended' && status !== 'absent')) {
      return json({ success: false, message: 'Body must include logId and status=attended|absent' }, 400);
    }

    await connectDB();

    const attendance = await AttendanceLog.findById(logId).lean();
    if (!attendance) return json({ success: false, message: 'Attendance log not found' }, 404);

    if (isTeacher && String((attendance as any).teacherId) !== locals.user.id) {
      return json({ success: false, message: 'Forbidden' }, 403);
    }

    const updated = await AttendanceLog.findByIdAndUpdate(
      logId,
      {
        $set: {
          status,
          note,
          markedAt: new Date(),
          markedBy: locals.user.id,
        },
      },
      { new: true }
    )
      .populate('studentId', 'name')
      .populate('scheduleId', 'subject time')
      .lean();

    return json({ success: true, log: updated });
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to mark attendance',
      },
      500
    );
  }
};

