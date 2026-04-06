// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Conecta ou cria banco SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no SQLite:', err.message);
    process.exit(1);
  }
  console.log('Conectado ao banco SQLite.');
});

// Cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
)`);

// ===============================
// Rotas CRUD
// ===============================

// GET /users - lista todos os usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /users - cria novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validação
  if (!name || !email) {
    return res.status(400).json({ error: 'Name e email são obrigatórios' });
  }

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// GET /users/:id - busca usuário por ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(row);
  });
});

// PUT /users/:id - atualiza usuário
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name e email são obrigatórios' });
  }

  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ id, name, email });
  });
});

// DELETE /users/:id - deleta usuário
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado', id });
  });
});

// ===============================
// Health checks
// ===============================

// Health check simples
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Readiness check - verifica conexão com o banco
app.get('/ready', (req, res) => {
  db.get('SELECT 1', (err) => {
    if (err) return res.status(503).json({ status: 'not ready' });
    res.status(200).json({ status: 'ready' });
  });
});

// ===============================
// Inicia servidor
// ===============================
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port} 🚀`);
});