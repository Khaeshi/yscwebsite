import { m as mongoose } from "./client_CagqtE4a.mjs";
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  telegramChatId: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);
export {
  Student as S
};
