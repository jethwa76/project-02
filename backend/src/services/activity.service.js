import { Activity } from '../models/activity.model.js';

export async function logActivity(actor, action, entityType, entityId, metadata = {}) {
  return Activity.create({ actor, action, entityType, entityId, metadata });
}
