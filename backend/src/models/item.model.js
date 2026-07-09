import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    body: { type: String, required: true, maxlength: 800 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    company: { type: String, required: true, trim: true, maxlength: 120 },
    value: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['lead', 'qualified', 'proposal', 'won', 'lost'],
      default: 'lead',
      index: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      index: true
    },
    closeDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    notes: [noteSchema],
    isFavorite: { type: Boolean, default: false },
    archivedAt: Date
  },
  { timestamps: true }
);

itemSchema.index({ title: 'text', company: 'text', tags: 'text' });
itemSchema.index({ owner: 1, createdAt: -1 });
itemSchema.index({ status: 1, priority: 1 });

itemSchema.virtual('isOpen').get(function isOpen() {
  return !['won', 'lost'].includes(this.status);
});

export const Item = mongoose.model('Item', itemSchema);
