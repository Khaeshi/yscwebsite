import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ITeacher extends Document {
  email: string;
  hashedPassword: string;
  role: 'teacher';
  name: string;
  phone?: string;
  isApproved: boolean;
  approvedAt?: Date | null;
  approvedBy?: string | null;
  createdAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, enum: ['teacher'], default: 'teacher' },
    name: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true },
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date, default: null },
    approvedBy: { type: String, default: null },
    createdAt: { type: Date, default: () => new Date() },
  },
  {
    collection: 'users',
    versionKey: false,
  }
);

TeacherSchema.index({ email: 1 }, { unique: true });
TeacherSchema.index({ role: 1, createdAt: -1 });

function getTeacherModel(): Model<ITeacher> {
  if (mongoose.models.Teacher) return mongoose.models.Teacher as Model<ITeacher>;
  return mongoose.model<ITeacher>('Teacher', TeacherSchema);
}

const Teacher = getTeacherModel();
export default Teacher;

