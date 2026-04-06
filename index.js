// index.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// Middleware JSON nativo
app.use(express.json());

// Rotas
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API CRUD SQLite rodando 🚀');
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Porta
const PORT = process.env.PORT || 3000;

// Inicia servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});