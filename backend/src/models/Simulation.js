import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema(
  {
    disasterId: { type: String, default: '' },
    planName: { type: String, required: true },
    score: { type: Number, default: 85 },
    responseTime: { type: Number, default: 20 },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'OVERRIDDEN'], default: 'PENDING' },
    scenarioDetails: {
      severity: { type: String, default: 'HIGH' },
      peopleAffected: { type: Number, default: 100 },
      deployedTeams: { type: Number, default: 3 },
      allocatedSupplies: { type: String, default: 'Medical kits, Evacuation boats' }
    },
    recommendations: [{ type: String }]
  },
  { timestamps: true }
);

export const Simulation = mongoose.models.Simulation || mongoose.model('Simulation', simulationSchema);
