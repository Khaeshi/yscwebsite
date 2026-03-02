import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  telegramChatId: { type: String, trim: true },
  phone:          { type: String, trim: true },
  email:          { type: String, trim: true, lowercase: true },
  active:         { type: Boolean, default: true },
}, { timestamps: true });

// Prevent model recompilation on hot-reload
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;