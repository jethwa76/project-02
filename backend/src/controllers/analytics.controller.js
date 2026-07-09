import { Item } from '../models/item.model.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

export const dashboardAnalytics = asyncHandler(async (req, res) => {
  const ownerMatch = req.user.role === 'admin' ? {} : { owner: req.user._id };
  const [users, records, statusBreakdown, monthly] = await Promise.all([
    req.user.role === 'admin' ? User.countDocuments() : 1,
    Item.countDocuments(ownerMatch),
    Item.aggregate([{ $match: ownerMatch }, { $group: { _id: '$status', value: { $sum: '$value' }, count: { $sum: 1 } } }]),
    Item.aggregate([
      { $match: ownerMatch },
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          value: { $sum: '$value' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])
  ]);

  res.json({ success: true, data: { users, records, statusBreakdown, monthly } });
});
