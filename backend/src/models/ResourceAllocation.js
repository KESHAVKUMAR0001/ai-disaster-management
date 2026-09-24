import mongoose from 'mongoose';

const resourceAllocationSchema = new mongoose.Schema(
  {
    disasterId: { type: String, required: true },
    resourceId: { type: String, required: true },
    resourceName: { type: String, default: '' },
    quantity: { type: Number, required: true },
    allocatedLocation: { type: String, required: true },
    status: { type: String, enum: ['DISPATCHED', 'IN_TRANSIT', 'DELIVERED'], default: 'DISPATCHED' }
  },
  { timestamps: true }
);

export const ResourceAllocation = mongoose.models.ResourceAllocation || mongoose.model('ResourceAllocation', resourceAllocationSchema);
