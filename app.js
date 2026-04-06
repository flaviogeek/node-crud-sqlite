// app.js
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();

// Middleware para parse de JSON
app.use(bodyParser.json());

// Middleware de logging de requests (observabilidade básica)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rotas da API
app.use('/users', usersRouter);

// Health check
app.get('/health', (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check solicitado`);
  res.status(200).json({ status: 'ok' });
});

// Readiness check (verifica se banco está acessível)
app.get('/ready', (req, res) => {
  const db = require('./database');
  db.get('SELECT 1', (err) => {
    if (err) {
      console.warn(`[${new Date().toISOString()}] Readiness check falhou`);
      return res.status(503).json({ status: 'not ready' });
    }
    console.log(`[${new Date().toISOString()}] Readiness check OK`);
    res.status(200).json({ status: 'ready' });
  });
});

module.exports = app;