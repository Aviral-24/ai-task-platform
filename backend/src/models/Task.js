const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    inputText: { type: String, required: true },
    operationType: { 
        type: String, 
        required: true,
        enum: ['Uppercase', 'Lowercase', 'Reverse String', 'Word Count'] // [cite: 31-41]
    },
    status: { 
        type: String, 
        default: 'Pending', // [cite: 49]
        enum: ['Pending', 'Running', 'Success', 'Failed'] // [cite: 49, 55, 61]
    },
    result: { type: String, default: null }, // [cite: 59]
    logs: { type: String, default: 'Task initialized.' } // [cite: 59]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);