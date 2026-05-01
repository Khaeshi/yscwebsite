import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IPayrollRate extends Document {
  teacherId: mongoose.Types.ObjectId;
  amountPerSession: number;
  currency: string;
  effectiveFrom: Date;
  setBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PayrollRateSchema = new Schema<IPayrollRate>(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    amountPerSession: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'PHP', trim: true },
    effectiveFrom: { type: Date, required: true },
    setBy: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

PayrollRateSchema.index({ teacherId: 1, effectiveFrom: -1 });

function getPayrollRateModel(): Model<IPayrollRate> {
  if (mongoose.models.PayrollRate) return mongoose.models.PayrollRate as Model<IPayrollRate>;
  return mongoose.model<IPayrollRate>('PayrollRate', PayrollRateSchema);
}

const PayrollRate = getPayrollRateModel();
export default PayrollRate;

