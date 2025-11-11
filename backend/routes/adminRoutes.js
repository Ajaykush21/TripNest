const express = require('express');
const { getDashboardSummary } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', protect, authorizeRoles('admin'), getDashboardSummary);

module.exports = router;

