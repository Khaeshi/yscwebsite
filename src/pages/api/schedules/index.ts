import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { Schedule } from '../../../lib/db/models/index.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async ({ url, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);
    await connectDB();

    const role = locals.user.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isTeacher = role === 'teacher';

    const studentId = url.searchParams.get('studentId');
    const teacherId = url.searchParams.get('teacherId');
    const active = url.searchParams.get('active');

    const filter: Record<string, any> = {};
    if (studentId) filter.studentId = studentId;
    if (active !== null) filter.isActive = active === 'true';

    if (isTeacher) {
      filter.teacherId = locals.user.id;
    } else if (isAdmin) {
      if (teacherId) filter.teacherId = teacherId;
    } else {
      return json({ success: false, message: 'Forbidden' }, 403);
    }

    const rawSchedules = await Schedule.find(filter)
      .populate('studentId', 'name telegramChatId phone')
      .populate('teacherId', 'name email phone isApproved')
      .sort({ time: 1 })
      .lean();

    // Filter out orphaned schedules where the referenced student was deleted
    const schedules = rawSchedules.filter((s: any) => s.studentId != null);

    return json({ success: true, schedules });
  } catch (error) {
    console.error('GET /api/schedules error:', error);
    return json({ success: false, message: 'Failed to fetch schedules' }, 500);
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    if (!locals.user) return json({ success: false, message: 'Unauthorized' }, 401);
    await connectDB();

    const body = await request.json();
    const {
      studentId,
      dayOfWeek,
      time,
      durationMinutes,
      repeatWeekly,
      startDate,
      endDate,
      isActive,
      chatbotTemplate,
      subject,
      teacherId,
    } = body;

    const role = locals.user.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isTeacher = role === 'teacher';
    if (!isAdmin && !isTeacher) return json({ success: false, message: 'Forbidden' }, 403);

    if (!studentId || !subject || !Array.isArray(dayOfWeek) || !time || !startDate) {
      return json({ success: false, message: 'Missing required fields: studentId, subject, dayOfWeek[], time, startDate' }, 400);
    }

    const resolvedTeacherId = isTeacher ? locals.user.id : teacherId;
    if (!resolvedTeacherId) {
      return json({ success: false, message: 'Missing teacherId (admin only)' }, 400);
    }

    const schedule = await Schedule.create({
      studentId,
      teacherId: resolvedTeacherId,
      subject,
      dayOfWeek,
      time,
      durationMinutes: typeof durationMinutes === 'number' ? durationMinutes : 60,
      repeatWeekly: repeatWeekly ?? true,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      isActive: isActive ?? true,
      chatbotTemplate: typeof chatbotTemplate === 'string' ? chatbotTemplate : '',
    });

    const populated = await Schedule.findById(schedule._id)
      .populate('studentId', 'name telegramChatId phone')
      .populate('teacherId', 'name email phone isApproved')
      .lean();

    return json({ success: true, schedule: populated }, 201);
  } catch (error) {
    console.error('POST /api/schedules error:', error);
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create schedule',
    }, 500);
  }
};