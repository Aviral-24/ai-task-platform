const { Queue } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
};

// Create a new queue instance
const taskQueue = new Queue('ai-tasks', { connection });

const addTaskToQueue = async (taskData) => {
    // Add job to Redis queue
    await taskQueue.add('process-text', taskData);
};

module.exports = { addTaskToQueue };