import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { AttendanceLog } from '../../../lib/db/models/index.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

function getDayStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const GET: APIRoute = async ({ url, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);

    const role = locals.user.role;
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin' || role === 'superadmin';
    if (!isTeacher && !isAdmin) return json({ success: false, message: 'Forbidden' }, 403);

    await connectDB();

    const teacherId = url.searchParams.get('teacherId');
    const studentId = url.searchParams.get('studentId');
    const date = url.searchParams.get('date');
    const week = url.searchParams.get('week');
    const status = url.searchParams.get('status');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const filter: Record<string, any> = {};

    if (isTeacher) {
      filter.teacherId = locals.user.id;
    } else if (teacherId) {
      filter.teacherId = teacherId;
    }

    if (studentId) filter.studentId = studentId;
    if (status) filter.status = status;

    if (from || to) {
      filter.scheduledDate = {};
      if (from) filter.scheduledDate.$gte = getDayStart(new Date(from));
      if (to) {
        const end = getDayStart(new Date(to));
        end.setDate(end.getDate() + 1);
        filter.scheduledDate.$lt = end;
      }
    } else if (date) {
      const start = getDayStart(new Date(date));
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      filter.scheduledDate = { $gte: start, $lt: end };
    } else if (week) {
      const start = getDayStart(new Date(week));
      const end = new Date(start);
      end.setDate(end.getDate() + 7);
      filter.scheduledDate = { $gte: start, $lt: end };
    }

    const logs = await AttendanceLog.find(filter)
      .populate('studentId', 'name')
      .populate('teacherId', 'name email')
      .populate('scheduleId', 'subject time')
      .sort({ scheduledDate: -1, createdAt: -1 })
      .lean();

    const normalized = (logs as any[]).map((log) => ({
      ...log,
      subject: log.scheduleId?.subject ?? '',
      time: log.scheduleId?.time ?? '',
      studentName: log.studentId?.name ?? '',
      teacherName: log.teacherId?.name ?? log.teacherId?.email ?? '',
    }));

    return json({ success: true, logs: normalized });
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch attendance logs',
      },
      500
    );
  }
};

