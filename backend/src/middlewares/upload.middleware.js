import multer from 'multer';
import { ApiError } from '../utils/api-error.js';

// Use memory storage so the file buffer can be sent to Cloudinary
const storage = multer.memoryStorage();

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new ApiError(422, 'Only image uploads are allowed'));
    }
    cb(null, true);
  }
});
