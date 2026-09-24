import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    alertType: { type: String, default: 'EVACUATION' },
    location: { type: String, default: 'All Affected Regions' },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'HIGH' },
    active: { type: Boolean, default: true },
    actionRequired: { type: String, default: 'Stay tuned to official emergency broadcasts' },
    broadcastedBy: { type: String, default: 'Emergency Operation Center' }
  },
  { timestamps: true }
);

export const Alert = mongoose.models.Alert || mongoose.model('Alert', alertSchema);
