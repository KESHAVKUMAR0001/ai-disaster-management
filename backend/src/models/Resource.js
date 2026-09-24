import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    resourceType: { type: String, required: true },
    resourceName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    availableQuantity: { type: Number, default: 0 },
    location: { type: String, default: 'Central Depot' },
    latitude: { type: Number, default: 12.975 },
    longitude: { type: Number, default: 77.600 },
    availability: { type: String, enum: ['AVAILABLE', 'PARTIALLY_AVAILABLE', 'DEPLOYED', 'OUT_OF_STOCK'], default: 'AVAILABLE' },
    status: { type: String, default: 'READY' }
  },
  { timestamps: true }
);

export const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
