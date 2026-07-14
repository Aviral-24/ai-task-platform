const Task = require('../models/Task');
const { addTaskToQueue } = require('../services/queueService');

const createTask = async (req, res) => {
    const { title, inputText, operationType } = req.body;
    try {
        // Step 2: Create task record with status Pending [cite: 49]
        const task = await Task.create({
            user: req.user._id,
            title,
            inputText,
            operationType,
            status: 'Pending'
        });

        // Step 3: Push to Redis queue [cite: 51]
        await addTaskToQueue({
            taskId: task._id,
            inputText: task.inputText,
            operationType: task.operationType
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks, getTaskById };