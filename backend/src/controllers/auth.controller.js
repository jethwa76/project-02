import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';
import { logActivity } from '../services/activity.service.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

function sendAuth(res, user, status = 200) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  res.cookie('refreshToken', refreshToken, cookieOptions);
  return { accessToken, refreshToken };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.validated.body;
  const exists = await User.exists({ email });

  if (exists) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const user = new User({ name, email, role: role || 'user' });
  await user.setPassword(password);
  const { accessToken, refreshToken } = sendAuth(res, user, 201);
  await user.setRefreshToken(refreshToken);
  await user.save();
  await logActivity(user._id, 'registered', 'auth', user._id);

  res.status(201).json({
    success: true,
    data: { user: user.toJSON(), accessToken, refreshToken }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await User.findOne({ email }).select('+passwordHash +refreshTokenHash');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Account is disabled');
  }

  user.lastLoginAt = new Date();
  const { accessToken, refreshToken } = sendAuth(res, user);
  await user.setRefreshToken(refreshToken);
  await user.save();
  await logActivity(user._id, 'logged in', 'auth', user._id);

  res.json({
    success: true,
    data: { user: user.toJSON(), accessToken, refreshToken }
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, 'Refresh token required');
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.sub).select('+refreshTokenHash');

  if (!user || !user.refreshTokenHash) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const isValid = await bcrypt.compare(token, user.refreshTokenHash);
  if (!isValid) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const accessToken = signAccessToken(user);
  res.json({ success: true, data: { accessToken } });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshTokenHash: 1 } });
    await logActivity(req.user._id, 'logged out', 'auth', req.user._id);
  }

  res.clearCookie('refreshToken', cookieOptions);
  res.json({ success: true, message: 'Logged out successfully' });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});
