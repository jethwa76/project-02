import multer from 'multer';
import { ApiError } from '../utils/api-error.js';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-z0-9.]/gi, '-')}`;
    cb(null, safeName);
  }
});

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
