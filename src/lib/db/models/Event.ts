import mongoose from 'mongoose';

// 🔮 SaaS: add orgId

const EventSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  description:  { type: String, default: '' },
  instrument:   { type: String, default: '' },

  startDate:    { type: Date,   default: null },
  endDate:      { type: Date,   default: null },
  schedule:     { type: String, default: 'Morning sessions only (8:00 AM – 12:00 PM)' },
  location:     { type: String, default: '' },

  coverPhoto:    { type: String, default: null },
  coverPhotoKey: { type: String, default: null },

  maxSlots:     { type: Number, default: null },
  status:       { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },

  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },

}, { timestamps: true });

EventSchema.index({ slug: 1 }, { unique: true });

delete (mongoose.models as any).Event;
export default mongoose.model('Event', EventSchema);