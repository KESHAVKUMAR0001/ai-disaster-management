import mongoose from 'mongoose';

const rescueTeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    teamLeader: { type: String, required: true },
    currentLocation: { type: String, default: 'Base Station Alpha' },
    latitude: { type: Number, default: 12.98 },
    longitude: { type: Number, default: 77.58 },
    status: { type: String, enum: ['STANDBY', 'DEPLOYED', 'EN_ROUTE', 'RESTING'], default: 'STANDBY' },
    membersCount: { type: Number, default: 8 },
    specialization: { type: String, default: 'Search and Rescue' },
    contact: { type: String, default: '+1-800-RESCUE' }
  },
  { timestamps: true }
);

export const RescueTeam = mongoose.models.RescueTeam || mongoose.model('RescueTeam', rescueTeamSchema);
