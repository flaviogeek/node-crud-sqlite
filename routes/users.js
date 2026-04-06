// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// 🔹 Listar todos os usuários
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro listando usuários:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log(`[${new Date().toISOString()}] Listando todos os usuários (${rows.length} encontrados)`);
    res.json(rows);
  });
});

// 🔹 Criar usuário
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    console.warn(`[${new Date().toISOString()}] POST /users - Dados incompletos`);
    return res.status(400).json({ error: 'name e email são obrigatórios' });
  }

  db.run('INSERT INTO users(name,email) VALUES(?,?)', [name, email], function(err) {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro criando usuário:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log(`[${new Date().toISOString()}] Usuário criado: ID ${this.lastID}, Nome: ${name}`);
    res.status(200).json({ id: this.lastID, name, email });
  });
});

// 🔹 Buscar usuário por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro buscando usuário ${id}:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      console.warn(`[${new Date().toISOString()}] Usuário não encontrado: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`[${new Date().toISOString()}] Usuário retornado: ID ${id}`);
    res.json(row);
  });
});

// 🔹 Atualizar usuário por ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name || !email) {
    console.warn(`[${new Date().toISOString()}] PUT /users/${id} - Dados incompletos`);
    return res.status(400).json({ error: 'name e email são obrigatórios' });
  }

  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function(err) {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro atualizando usuário ${id}:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      console.warn(`[${new Date().toISOString()}] Usuário não encontrado para atualização: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`[${new Date().toISOString()}] Usuário atualizado: ID ${id}, Nome: ${name}`);
    res.json({ message: 'Usuário atualizado' });
  });
});

// 🔹 Deletar usuário por ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro deletando usuário ${id}:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      console.warn(`[${new Date().toISOString()}] Usuário não encontrado para deleção: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`[${new Date().toISOString()}] Usuário deletado: ID ${id}`);
    res.json({ message: 'Usuário deletado' });
  });
});

module.exports = router;