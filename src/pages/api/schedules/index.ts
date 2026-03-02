import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import Schedule from '../../../lib/db/models/Schedule.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async ({ url }) => {
  try {
    await connectDB();

    const studentId = url.searchParams.get('student_id');
    const dayOfWeek = url.searchParams.get('day');
    const active    = url.searchParams.get('active');

    const filter: Record<string, any> = {};
    if (studentId)           filter.studentId  = studentId;
    if (dayOfWeek)           filter.dayOfWeek  = Number(dayOfWeek);
    if (active !== null)     filter.active     = active === 'true';

    const rawSchedules = await Schedule.find(filter)
  .populate('studentId', 'name telegramChatId phone')
  .sort({ dayOfWeek: 1, time: 1 })
  .lean();

  // Filter out orphaned schedules where the referenced student was deleted
  const schedules = rawSchedules.filter(s => s.studentId != null);

  return json({ success: true, schedules });
  } catch (error) {
    console.error('GET /api/schedules error:', error);
    return json({ success: false, message: 'Failed to fetch schedules' }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();

    const body = await request.json();
    const { studentId, className, classType, dayOfWeek, time, duration, reminderMinutes, active } = body;

    if (!studentId || !className || !classType || dayOfWeek === undefined || !time) {
      return json({ success: false, message: 'Missing required fields: studentId, className, classType, dayOfWeek, time' }, 400);
    }

    const schedule = await Schedule.create({
      studentId,
      className,
      classType,
      dayOfWeek,
      time,
      duration:        duration        ?? 60,
      reminderMinutes: reminderMinutes ?? 60,
      active:          active          ?? true,
    });

    const populated = await Schedule.findById(schedule._id)
      .populate('studentId', 'name telegramChatId phone')
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