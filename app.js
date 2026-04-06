// app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use('/users', usersRouter);

// Health checks
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/ready', (req, res) => res.status(200).json({ status: 'ready' }));

module.exports = app;