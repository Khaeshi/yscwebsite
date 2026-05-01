import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ISchedule extends Document {
  studentId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  subject: string;
  dayOfWeek: number[];
  time: string;
  durationMinutes: number;
  repeatWeekly: boolean;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  chatbotTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    subject: { type: String, required: true, trim: true },
    dayOfWeek: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr: number[]) =>
          Array.isArray(arr) && arr.length > 0 && arr.every((d) => Number.isInteger(d) && d >= 0 && d <= 6),
        message: 'dayOfWeek must be an array of integers 0..6',
      },
    },
    time: { type: String, required: true, trim: true }, // "HH:MM"
    durationMinutes: { type: Number, default: 60, min: 1 },
    repeatWeekly: { type: Boolean, default: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    chatbotTemplate: { type: String, default: '' },
  },
  { timestamps: true }
);

ScheduleSchema.index({ teacherId: 1, isActive: 1, time: 1 });
ScheduleSchema.index({ studentId: 1, isActive: 1 });

function getScheduleModel(): Model<ISchedule> {
  if (mongoose.models.Schedule) return mongoose.models.Schedule as Model<ISchedule>;
  return mongoose.model<ISchedule>('Schedule', ScheduleSchema);
}

const Schedule = getScheduleModel();
export default Schedule;