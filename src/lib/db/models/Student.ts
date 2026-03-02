import mongoose, { Schema, type Document, type Model } from 'mongoose';

// ── Types ────────────────────────────────────────────────────────────────────
export interface IStudent extends Document {
  name:           string;
  telegramChatId?: string;
  phone?:         string;
  email?:         string;
  active:         boolean;
  createdAt:      Date;
  updatedAt:      Date;
}

// ── Schema ───────────────────────────────────────────────────────────────────
const StudentSchema = new Schema<IStudent>(
  {
    name:           { type: String, required: true, trim: true },
    telegramChatId: { type: String, trim: true },
    phone:          { type: String, trim: true },
    email:          { type: String, trim: true, lowercase: true },
    active:         { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── Safe model registration ──────────────────────────────────────────────────
// In serverless environments each function invocation may import this module
// fresh, but mongoose.models may or may not have carried over. We explicitly
// delete a stale compiled model when the schema hasn't been registered yet,
// then always re-register from the schema defined in THIS module.
//
// Why not just `mongoose.models.Student || mongoose.model(...)`?
// Because on cold starts in some runtimes mongoose.models.Student exists as a
// reference to a previously compiled model whose schema is no longer in scope,
// causing "Schema hasn't been registered for model Student".

function getStudentModel(): Model<IStudent> {
  // If the model was already compiled in this process/module scope, reuse it.
  if (mongoose.models.Student) {
    return mongoose.models.Student as Model<IStudent>;
  }
  // Otherwise register it fresh from the schema above.
  return mongoose.model<IStudent>('Student', StudentSchema);
}

const Student = getStudentModel();

export default Student;