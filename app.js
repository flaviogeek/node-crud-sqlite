const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

// Logging de todas as requisições HTTP
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API CRUD SQLite rodando 🚀');
});

// Health check
app.get('/health', (req, res) => {
  console.log('[Health check solicitado]');
  res.status(200).json({ status: 'ok' });
});

// Readiness check
app.get('/ready', (req, res) => {
  const db = require('./database');
  db.get('SELECT 1', (err) => {
    if (err) {
      console.log('[Readiness check] NOT READY');
      return res.status(503).json({ status: 'not ready' });
    }
    console.log('[Readiness check] READY');
    res.status(200).json({ status: 'ready' });
  });
});

module.exports = app;