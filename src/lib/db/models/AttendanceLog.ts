import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type AttendanceStatus = 'pending' | 'attended' | 'absent' | 'cancelled';

export interface IAttendanceLog extends Document {
  scheduleId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  scheduledDate: Date;
  status: AttendanceStatus;
  markedAt: Date | null;
  markedBy: mongoose.Types.ObjectId | null;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceLogSchema = new Schema<IAttendanceLog>(
  {
    scheduleId: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    scheduledDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'attended', 'absent', 'cancelled'],
      default: 'pending',
      required: true,
    },
    markedAt: { type: Date, default: null },
    markedBy: { type: Schema.Types.ObjectId, default: null },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

AttendanceLogSchema.index({ scheduleId: 1, scheduledDate: 1 }, { unique: true });
AttendanceLogSchema.index({ teacherId: 1, scheduledDate: -1 });
AttendanceLogSchema.index({ studentId: 1, scheduledDate: -1 });
AttendanceLogSchema.index({ status: 1, scheduledDate: -1 });

function getAttendanceLogModel(): Model<IAttendanceLog> {
  if (mongoose.models.AttendanceLog) return mongoose.models.AttendanceLog as Model<IAttendanceLog>;
  return mongoose.model<IAttendanceLog>('AttendanceLog', AttendanceLogSchema);
}

const AttendanceLog = getAttendanceLogModel();
export default AttendanceLog;

