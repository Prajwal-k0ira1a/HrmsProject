import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewPeriod: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  goals: [{
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
      default: 'not-started'
    },
    completionDate: { type: Date }
  }],
  ratings: {
    communication: { type: Number, min: 1, max: 5 },
    teamwork: { type: Number, min: 1, max: 5 },
    leadership: { type: Number, min: 1, max: 5 },
    technical: { type: Number, min: 1, max: 5 },
    overall: { type: Number, min: 1, max: 5 }
  },
  feedback: {
    strengths: { type: String },
    improvements: { type: String },
    comments: { type: String }
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;
