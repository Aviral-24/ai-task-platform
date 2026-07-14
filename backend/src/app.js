const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // [cite: 144]
const rateLimit = require('express-rate-limit'); // [cite: 145]
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect Database
connectDB();

// Security Middlewares [cite: 141]
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// API Rate Limiting (100 requests per 15 minutes) [cite: 145]
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;