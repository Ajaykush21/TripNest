const express = require('express');
const { body } = require('express-validator');
const {
  subscribe,
  getSubscribers,
  createNotification,
  getNotifications,
} = require('../controllers/newsletterController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Please provide a valid email address')],
  subscribe
);

router.get('/subscribers', protect, authorizeRoles('admin'), getSubscribers);
router.get('/notifications', protect, authorizeRoles('admin'), getNotifications);
router.post(
  '/notifications',
  protect,
  authorizeRoles('admin'),
  [
    body('title').isLength({ min: 4 }).withMessage('Title must be at least 4 characters'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('scheduledFor').isISO8601().withMessage('Scheduled date must be valid'),
  ],
  createNotification
);

module.exports = router;

