import json2csv from 'json2csv';
import { Item } from '../models/item.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import { logActivity } from '../services/activity.service.js';

const { Parser } = json2csv;

function buildFilter(query, user) {
  const filter = user.role === 'admin' ? {} : { owner: user._id };

  if (query.search) {
    filter.$text = { $search: query.search };
  }
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  return filter;
}

export const listItems = asyncHandler(async (req, res) => {
  const query = req.validated.query;
  const filter = buildFilter(query, req.user);
  const skip = (query.page - 1) * query.limit;
  const sort = { [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1 };
  const [items, total] = await Promise.all([
    Item.find(filter).populate('owner', 'name email avatarUrl').sort(sort).skip(skip).limit(query.limit),
    Item.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: {
      items,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit)
      }
    }
  });
});

export const getItem = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.owner = req.user._id;
  const item = await Item.findOne(filter).populate('owner', 'name email avatarUrl');

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.json({ success: true, data: { item } });
});

export const createItem = asyncHandler(async (req, res) => {
  const item = await Item.create({ ...req.validated.body, owner: req.user._id });
  await logActivity(req.user._id, 'created item', 'item', item._id, { title: item.title });
  res.status(201).json({ success: true, data: { item } });
});

export const updateItem = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.owner = req.user._id;
  const item = await Item.findOneAndUpdate(filter, req.validated.body, {
    new: true,
    runValidators: true
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  await logActivity(req.user._id, 'updated item', 'item', item._id, { title: item.title });
  res.json({ success: true, data: { item } });
});

export const deleteItem = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.owner = req.user._id;
  const item = await Item.findOneAndDelete(filter);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  await logActivity(req.user._id, 'deleted item', 'item', item._id, { title: item.title });
  res.json({ success: true, message: 'Item deleted successfully' });
});

export const itemStats = asyncHandler(async (req, res) => {
  const match = req.user.role === 'admin' ? {} : { owner: req.user._id };
  const [summary] = await Item.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pipelineValue: { $sum: '$value' },
        won: { $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] } },
        open: { $sum: { $cond: [{ $in: ['$status', ['lead', 'qualified', 'proposal']] }, 1, 0] } }
      }
    }
  ]);
  const byStatus = await Item.aggregate([{ $match: match }, { $group: { _id: '$status', count: { $sum: 1 }, value: { $sum: '$value' } } }]);

  res.json({ success: true, data: { summary: summary || { total: 0, pipelineValue: 0, won: 0, open: 0 }, byStatus } });
});

export const exportCsv = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { owner: req.user._id };
  const items = await Item.find(filter).lean();
  const parser = new Parser({ fields: ['title', 'company', 'value', 'status', 'priority', 'createdAt'] });
  res.header('Content-Type', 'text/csv');
  res.attachment('stellar-items.csv');
  res.send(parser.parse(items));
});
