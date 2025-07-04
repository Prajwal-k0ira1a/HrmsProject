import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  month: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])$/ // 01 to 12
  },
  year: {
    type: Number,
    required: true,
    min: 2020
  },
  basicSalary: {
    type: Number,
    required: true,
    min: 0
  },
  allowances: {
    houseRent: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  deductions: {
    tax: { type: Number, default: 0 },
    providentFund: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  totalAllowances: {
    type: Number,
    default: 0
  },
  totalDeductions: {
    type: Number,
    default: 0
  },
  grossSalary: {
    type: Number,
    default: 0
  },
  netSalary: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payroll = mongoose.model('Payroll', payrollSchema);
export default Payroll;
