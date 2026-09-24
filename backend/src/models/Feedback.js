import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'anonymous' },
    userName: { type: String, default: 'Citizen' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedbackText: { type: String, required: true }
  },
  { timestamps: true }
);

export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
