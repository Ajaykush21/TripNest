const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const buildUserResponse = (user, token) => ({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    phone: user.phone,
    createdAt: user.createdAt,
  },
});

exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('Email already registered');
  }

  let assignedRole = 'user';
  if (role === 'admin') {
    const existingAdmin = await User.exists({ role: 'admin' });
    if (existingAdmin) {
      res.status(400);
      throw new Error('An admin account already exists. Contact support to manage admin access.');
    }
    assignedRole = 'admin';
  }

  const user = await User.create({
    name,
    email,
    password,
    role: assignedRole,
  });

  const token = generateToken({ id: user._id, role: user.role });

  res
    .status(201)
    .cookie('token', token, TOKEN_COOKIE_OPTIONS)
    .json(buildUserResponse(user, token));
});

exports.loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (role && role !== user.role) {
    res.status(403);
    throw new Error(`Account does not have ${role} access`);
  }

  const token = generateToken({ id: user._id, role: user.role });

  res
    .status(200)
    .cookie('token', token, TOKEN_COOKIE_OPTIONS)
    .json(buildUserResponse(user, token));
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', { ...TOKEN_COOKIE_OPTIONS, maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.json({
    user: req.user,
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const allowedFields = ['name', 'email', 'password', 'avatarUrl', 'phone'];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  const updatedUser = await user.save();
  const token = generateToken({ id: updatedUser._id, role: updatedUser.role });

  res
    .status(200)
    .cookie('token', token, TOKEN_COOKIE_OPTIONS)
    .json(buildUserResponse(updatedUser, token));
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.role = role;
  await user.save();

  res.json({ message: 'Role updated', user });
});

