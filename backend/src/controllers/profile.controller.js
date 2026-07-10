import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import { logActivity } from '../services/activity.service.js';
import cloudinary from '../config/cloudinary.js';

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

export const updateProfile = asyncHandler(async (req, res) => {
  if (req.validated.body.email) {
    const exists = await User.exists({ email: req.validated.body.email, _id: { $ne: req.user._id } });
    if (exists) throw new ApiError(409, 'Email is already in use');
  }

  const user = await User.findByIdAndUpdate(req.user._id, req.validated.body, { new: true, runValidators: true });
  await logActivity(req.user._id, 'updated profile', 'user', req.user._id);
  res.json({ success: true, data: { user } });
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+passwordHash');
  const valid = await user.comparePassword(req.validated.body.currentPassword);

  if (!valid) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  await user.setPassword(req.validated.body.newPassword);
  await user.save();
  await logActivity(req.user._id, 'changed password', 'user', req.user._id);
  res.json({ success: true, message: 'Password updated successfully' });
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(422, 'Avatar image is required');
  }

  let avatarUrl;

  if (process.env.CLOUDINARY_CLOUD_NAME) {
    // Upload to Cloudinary from memory buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'stellar-crm/avatars',
          public_id: `user-${req.user._id}`,
          overwrite: true,
          transformation: [
            { width: 300, height: 300, crop: 'fill', gravity: 'face' },
            { quality: 'auto', fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    avatarUrl = result.secure_url;
  } else {
    // Fallback to local storage
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const safeName = `${Date.now()}-${req.file.originalname.replace(/[^a-z0-9.]/gi, '-')}`;
    const filePath = path.join(uploadDir, safeName);
    await fs.promises.writeFile(filePath, req.file.buffer);
    avatarUrl = `/uploads/${safeName}`;
  }

  const user = await User.findByIdAndUpdate(req.user._id, { avatarUrl }, { new: true });
  await logActivity(req.user._id, 'uploaded avatar', 'user', req.user._id);
  res.json({ success: true, data: { user } });
});
