import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  className:       { type: String, required: true, trim: true },
  classType:       { type: String, enum: ['online', 'onsite'], required: true },
  dayOfWeek:       { type: Number, min: 0, max: 6, required: true },
  time:            { type: String, required: true },  // "HH:MM"
  duration:        { type: Number, default: 60 },     // minutes
  reminderMinutes: { type: Number, default: 60 },
  active:          { type: Boolean, default: true },
}, { timestamps: true });

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

export default Schedule;