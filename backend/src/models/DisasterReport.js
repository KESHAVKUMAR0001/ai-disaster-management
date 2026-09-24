import mongoose from 'mongoose';

const disasterReportSchema = new mongoose.Schema(
  {
    disasterType: { type: String, required: true },
    description: { type: String, required: true },
    peopleAffected: { type: Number, default: 0 },
    situation: { type: String, default: 'URGENT' },
    location: { type: String, default: 'General Area' },
    locationName: { type: String, default: '' },
    latitude: { type: Number, default: 12.9716 },
    longitude: { type: Number, default: 77.5946 },
    address: { type: String, default: '' },
    severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
    riskScore: { type: Number, default: 0.5 },
    status: { type: String, enum: ['REPORTED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED'], default: 'REPORTED' },
    reportedBy: { type: String, default: 'Anonymous' },
    contactPhone: { type: String, default: '' }
  },
  { timestamps: true }
);

export const DisasterReport = mongoose.models.DisasterReport || mongoose.model('DisasterReport', disasterReportSchema);
