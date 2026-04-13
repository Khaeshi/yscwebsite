import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  className:        { type: String, required: true, trim: true },
  /** Shown in Telegram topic line; falls back to className if empty */
  instrumentLabel:  { type: String, default: '', trim: true },
  classType:        { type: String, enum: ['online', 'onsite'], required: true },
  dayOfWeek:        { type: Number, min: 0, max: 6, required: true },
  time:             { type: String, required: true },  // "HH:MM"
  duration:         { type: Number, default: 60 },     // minutes
  reminderMinutes:  { type: Number, default: 60 },
  sessionNumber:    { type: Number, default: 1, min: 1 },
  /** e.g. "1st", "2nd set" — shown after "session" in the topic line */
  sessionSetLabel:  { type: String, default: '1st', trim: true },
  /** Appended after clock time, e.g. "Philippines (PHT)" */
  timeRegion:       { type: String, default: 'Philippines (PHT)', trim: true },
  lastReminderSent: { type: Date, default: null },     
  active:           { type: Boolean, default: true },
}, { timestamps: true });

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

export default Schedule;