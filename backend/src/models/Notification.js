import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    notificationType: { type: String, enum: ['INFO', 'WARNING', 'CRITICAL', 'DISPATCH'], default: 'INFO' },
    status: { type: String, enum: ['UNREAD', 'READ'], default: 'UNREAD' }
  },
  { timestamps: true }
);

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
