import { Activity } from '../models/activity.model.js';
import { Item } from '../models/item.model.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

export const listUsers = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 50);
  const search = req.query.search?.trim();
  const filter = search ? { $text: { $search: search } } : {};
  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter)
  ]);

  res.json({ success: true, data: { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true, runValidators: true });
  res.json({ success: true, data: { user } });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await Promise.all([User.findByIdAndDelete(req.params.id), Item.deleteMany({ owner: req.params.id })]);
  res.json({ success: true, message: 'User and owned records deleted' });
});

export const recentActivity = asyncHandler(async (_req, res) => {
  const activity = await Activity.find().populate('actor', 'name email avatarUrl').sort({ createdAt: -1 }).limit(20);
  res.json({ success: true, data: { activity } });
});
