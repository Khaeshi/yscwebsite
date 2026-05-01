import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { AttendanceLog, Schedule } from '../../../lib/db/models/index.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

function normalizeDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDayRange(d: Date) {
  const start = normalizeDateOnly(d);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export const POST: APIRoute = async ({ url, request }) => {
  try {
    const secretFromQuery = url.searchParams.get('secret') ?? '';
    const secretFromHeader = request.headers.get('x-cron-secret') ?? '';
    const expected = import.meta.env.CRON_SECRET as string | undefined;

    if (!expected || (secretFromQuery !== expected && secretFromHeader !== expected)) {
      return json({ success: false, message: 'Unauthorized' }, 401);
    }

    await connectDB();

    const now = new Date();
    const todayDay = now.getDay();
    const { start, end } = sameDayRange(now);

    const schedules = await Schedule.find({
      isActive: true,
      dayOfWeek: todayDay,
    })
      .select('_id teacherId studentId')
      .lean();

    let generated = 0;

    for (const schedule of schedules as any[]) {
      const result = await AttendanceLog.updateOne(
        { scheduleId: schedule._id, scheduledDate: start },
        {
          $setOnInsert: {
            scheduleId: schedule._id,
            teacherId: schedule.teacherId,
            studentId: schedule.studentId,
            scheduledDate: start,
            status: 'pending',
            markedAt: null,
            markedBy: null,
            note: '',
          },
        },
        { upsert: true }
      );

      if ((result as any).upsertedCount > 0) generated += 1;
    }

    return json({
      success: true,
      date: start.toISOString(),
      generated,
      scannedSchedules: schedules.length,
      range: { start: start.toISOString(), end: end.toISOString() },
    });
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate attendance',
      },
      500
    );
  }
};

