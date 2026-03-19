import mongoose from 'mongoose';

// 🔮 SaaS: add orgId

const RegistrationSchema = new mongoose.Schema({
  eventId:            { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  fullName:           { type: String, required: true },
  email:              { type: String, required: true, lowercase: true },
  phone:              { type: String, required: true },
  dateOfBirth:        { type: Date,   required: true },
  parentGuardian:     { type: String, required: true },
  instrumentInterest: { type: String, default: '' },
  consentGiven:       { type: Boolean, required: true, default: false },
  consentDate:        { type: Date,    default: null },

  status:     { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  statusNote: { type: String, default: '' },
  confirmedAt: { type: Date, default: null },
  rejectedAt:  { type: Date, default: null },

}, { timestamps: true });

RegistrationSchema.index({ eventId: 1, status: 1 });
RegistrationSchema.index({ eventId: 1, createdAt: -1 });
RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

delete (mongoose.models as any).Registration;
export default mongoose.model('Registration', RegistrationSchema);