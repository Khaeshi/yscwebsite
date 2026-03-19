import { m as mongooseExports, a as mongoose } from "./Schedule_6N9T0X2Z.mjs";
const StudentSchema = new mongooseExports.Schema(
  {
    name: { type: String, required: true, trim: true },
    telegramChatId: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);
function getStudentModel() {
  if (mongoose.models.Student) {
    return mongoose.models.Student;
  }
  return mongoose.model("Student", StudentSchema);
}
const Student = getStudentModel();
export {
  Student as S
};
