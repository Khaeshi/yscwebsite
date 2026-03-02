// ─── MongoDB Models (current architecture) ───────────────────────────────────

export interface Student {
  _id: string;
  name: string;
  telegramChatId?: string;
  phone?: string;
  email?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  _id: string;
  studentId: Student | string;
  className: string;
  classType: 'online' | 'onsite';
  dayOfWeek: number;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  time: string;
  duration: number;
  reminderMinutes: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Keep these — still relevant ─────────────────────────────────────────────

export interface Program {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: 'music' | 'arts' | 'sports' | 'cooking' | 'photography';
  price?: number;
  durationWeeks?: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Instructor {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  specialization: string[];
  bio?: string;
  experienceYears?: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Media {
  _id: string;
  s3Key: string;
  s3Url: string;
  filename: string;
  fileType: string;
  fileSize: number;
  folder: string;
  altText?: string;
  caption?: string;
  createdAt: string;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateStudentDTO {
  name: string;
  phone?: string;
  email?: string;
  telegramChatId?: string;
}

export interface UpdateStudentDTO extends Partial<CreateStudentDTO> {
  active?: boolean;
}

export interface CreateScheduleDTO {
  studentId: string;
  className: string;
  classType: 'online' | 'onsite';
  dayOfWeek: number;
  time: string;
  duration?: number;
  reminderMinutes?: number;
  active?: boolean;
}

export interface UpdateScheduleDTO extends Partial<CreateScheduleDTO> {}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalStudents: number;
  totalPrograms: number;
  totalEnrollments: number;
  activeSchedules: number;
}