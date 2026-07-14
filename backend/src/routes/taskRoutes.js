const express = require('express');
const { createTask, getTasks, getTaskById } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks);
router.route('/:id').get(protect, getTaskById);

module.exports = router;