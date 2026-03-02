import { connectDB } from './client.ts';
import Student from './models/Student.ts';
import Schedule from './models/Schedule.ts';

export async function getStudents(filters?: { active?: boolean; limit?: number }) {
  await connectDB();
  let query = Student.find(
    filters?.active !== undefined ? { active: filters.active } : {}
  ).sort({ name: 1 });
  if (filters?.limit) query = query.limit(filters.limit);
  return query.lean();
}

export async function getStudentById(id: string) {
  await connectDB();
  return Student.findById(id).lean();
}

export async function createStudent(data: {
  name: string;
  phone?: string;
  email?: string;
  telegramChatId?: string;
  active?: boolean;
}) {
  await connectDB();
  const student = await Student.create(data);
  return student.toObject();
}

export async function updateStudent(id: string, updates: Record<string, any>) {
  await connectDB();
  return Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
}

export async function deleteStudent(id: string) {
  await connectDB();
  await Student.findByIdAndDelete(id);
  return { success: true };
}

export async function getSchedules(filters?: {
  studentId?: string;
  dayOfWeek?: number;
  active?: boolean;
}) {
  await connectDB();
  const where: Record<string, any> = {};
  if (filters?.studentId) where.studentId = filters.studentId;
  if (filters?.dayOfWeek !== undefined) where.dayOfWeek = filters.dayOfWeek;
  if (filters?.active !== undefined) where.active = filters.active;

  return Schedule.find(where)
    .populate('studentId', 'name telegramChatId phone')
    .sort({ dayOfWeek: 1, time: 1 })
    .lean();
}

export async function getScheduleById(id: string) {
  await connectDB();
  return Schedule.findById(id)
    .populate('studentId', 'name telegramChatId phone email')
    .lean();
}

export async function createSchedule(data: {
  studentId: string;
  className: string;
  classType: 'online' | 'onsite';
  dayOfWeek: number;
  time: string;
  duration?: number;
  reminderMinutes?: number;
  active?: boolean;
}) {
  await connectDB();
  const schedule = await Schedule.create(data);
  return Schedule.findById(schedule._id)
    .populate('studentId', 'name telegramChatId phone')
    .lean();
}

export async function updateSchedule(id: string, updates: Record<string, any>) {
  await connectDB();
  return Schedule.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    .populate('studentId', 'name telegramChatId phone')
    .lean();
}

export async function deleteSchedule(id: string) {
  await connectDB();
  await Schedule.findByIdAndDelete(id);
  return { success: true };
}

export async function getDashboardStats() {
  await connectDB();

  const [totalStudents, totalSchedules, activeSchedules] = await Promise.all([
    Student.countDocuments({ active: true }),
    Schedule.countDocuments(),
    Schedule.countDocuments({ active: true }),
  ]);

  return {
    totalStudents,
    totalPrograms: 0,           // add a Program model later
    totalEnrollments: totalSchedules,
    activeSchedules,
  };
}

export async function getPrograms() {
  // TODO: create a Program mongoose model and replace this stub
  return [];
}