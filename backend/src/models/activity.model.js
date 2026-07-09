import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true, maxlength: 80 },
    entityType: { type: String, enum: ['item', 'user', 'auth'], required: true },
    entityId: mongoose.Schema.Types.ObjectId,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

activitySchema.index({ actor: 1, createdAt: -1 });
activitySchema.index({ entityType: 1, createdAt: -1 });

export const Activity = mongoose.model('Activity', activitySchema);
