import mongoose from 'mongoose';

const emergencyRouteSchema = new mongoose.Schema(
  {
    routeName: { type: String, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    status: { type: String, enum: ['CLEAR', 'CONGESTED', 'BLOCKED', 'RESTRICTED'], default: 'CLEAR' },
    distanceKm: { type: Number, default: 5 },
    estimatedMinutes: { type: Number, default: 15 },
    safeForHeavyVehicles: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const EmergencyRoute = mongoose.models.EmergencyRoute || mongoose.model('EmergencyRoute', emergencyRouteSchema);
