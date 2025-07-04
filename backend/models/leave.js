import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  type: {
    type: String,
    enum: ['sick', 'casual', 'earned', 'maternity', 'paternity'],
    required: true
  },
  dateFrom: {
    type: Date,
    required: true
  },
  dateTo: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  rejectionReason: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  }
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
