import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { AttendanceLog, PayrollRate, Teacher } from '../../../lib/db/models/index.ts';

type Period = 'weekly' | 'bimonthly' | 'monthly';

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

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

function getPeriodBounds(period: Period, date: Date) {
  const d = startOfDay(date);

  if (period === 'weekly') {
    const day = d.getDay(); // 0 Sun -> 6 Sat
    const diffFromMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(d);
    start.setDate(d.getDate() + diffFromMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { periodStart: startOfDay(start), periodEnd: endOfDay(end) };
  }

  if (period === 'bimonthly') {
    const year = d.getFullYear();
    const month = d.getMonth();
    if (d.getDate() <= 15) {
      return {
        periodStart: new Date(year, month, 1, 0, 0, 0, 0),
        periodEnd: new Date(year, month, 15, 23, 59, 59, 999),
      };
    }
    const lastDay = new Date(year, month + 1, 0).getDate();
    return {
      periodStart: new Date(year, month, 16, 0, 0, 0, 0),
      periodEnd: new Date(year, month, lastDay, 23, 59, 59, 999),
    };
  }

  // monthly
  const year = d.getFullYear();
  const month = d.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  return {
    periodStart: new Date(year, month, 1, 0, 0, 0, 0),
    periodEnd: new Date(year, month, lastDay, 23, 59, 59, 999),
  };
}

async function getCurrentRateForTeacher(teacherId: string, periodEnd: Date) {
  const rate = await PayrollRate.findOne({
    teacherId,
    effectiveFrom: { $lte: periodEnd },
  })
    .sort({ effectiveFrom: -1, createdAt: -1 })
    .lean();

  if (rate) return rate;
  return PayrollRate.findOne({ teacherId }).sort({ effectiveFrom: -1, createdAt: -1 }).lean();
}

export const GET: APIRoute = async ({ locals, url }) => {
  const admin = assertAdmin(locals);
  if (!admin.ok) return admin.response;

  try {
    await connectDB();

    const periodParam = (url.searchParams.get('period') ?? 'weekly') as Period;
    if (!['weekly', 'bimonthly', 'monthly'].includes(periodParam)) {
      return json({ success: false, message: 'Invalid period' }, 400);
    }

    const dateParam = url.searchParams.get('date') ?? new Date().toISOString().slice(0, 10);
    const inputDate = new Date(dateParam);
    if (Number.isNaN(inputDate.getTime())) {
      return json({ success: false, message: 'Invalid date' }, 400);
    }

    const teacherIdFilter = url.searchParams.get('teacherId');
    const { periodStart, periodEnd } = getPeriodBounds(periodParam, inputDate);

    const attendanceFilter: Record<string, any> = {
      status: 'attended',
      scheduledDate: { $gte: periodStart, $lte: periodEnd },
    };
    if (teacherIdFilter) attendanceFilter.teacherId = teacherIdFilter;

    const attendedLogs = await AttendanceLog.find(attendanceFilter)
      .populate('studentId', 'name')
      .populate('scheduleId', 'subject time')
      .lean();

    const logsByTeacher = new Map<string, any[]>();
    for (const log of attendedLogs as any[]) {
      const teacherId = String(log.teacherId);
      const arr = logsByTeacher.get(teacherId) ?? [];
      arr.push(log);
      logsByTeacher.set(teacherId, arr);
    }

    let teachers: any[] = [];
    if (teacherIdFilter) {
      const teacher = await Teacher.findById(teacherIdFilter).select('_id name email').lean();
      if (teacher) teachers = [teacher];
    } else {
      teachers = await Teacher.find({ role: 'teacher' }).select('_id name email').lean();
    }

    const summaries = await Promise.all(
      teachers.map(async (teacher) => {
        const teacherId = String(teacher._id);
        const logs = logsByTeacher.get(teacherId) ?? [];
        const currentRate = await getCurrentRateForTeacher(teacherId, periodEnd);
        const ratePerSession = currentRate?.amountPerSession ?? 0;
        const sessionsCount = logs.length;
        const totalAmount = sessionsCount * ratePerSession;

        const breakdown = logs.map((log) => ({
          logId: String(log._id),
          scheduledDate: log.scheduledDate,
          studentName: log.studentId?.name ?? '',
          subject: log.scheduleId?.subject ?? '',
          time: log.scheduleId?.time ?? '',
          status: log.status,
        }));

        return {
          teacherId,
          teacherName: teacher.name || teacher.email,
          period: periodParam,
          periodStart,
          periodEnd,
          sessionsCount,
          ratePerSession,
          currency: currentRate?.currency ?? 'PHP',
          totalAmount,
          breakdown,
        };
      })
    );

    return json({
      success: true,
      period: periodParam,
      date: dateParam,
      periodStart,
      periodEnd,
      summaries,
    });
  } catch (error) {
    return json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to compute payroll summary' },
      500
    );
  }
};

