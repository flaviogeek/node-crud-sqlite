const express = require('express');
const db = require('../database');
const router = express.Router();

// Listar todos usuários
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Erro ao listar usuários', err);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
    console.log(`Listando todos os usuários (${rows.length} encontrados)`);
    res.json(rows);
  });
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar usuário', err);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
    if (!row) {
      console.log(`Usuário não encontrado: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`Usuário retornado: ID ${id}`);
    res.json(row);
  });
});

// Criar usuário
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      console.error('Erro ao criar usuário', err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
    console.log(`Usuário criado: ID ${this.lastID}, Nome: ${name}`);
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function(err) {
    if (err) {
      console.error('Erro ao atualizar usuário', err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
    if (this.changes === 0) {
      console.log(`Usuário não encontrado para atualização: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`Usuário atualizado: ID ${id}, Nome: ${name}`);
    res.json({ message: 'Usuário atualizado' });
  });
});

// Deletar usuário
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Erro ao deletar usuário', err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
    if (this.changes === 0) {
      console.log(`Usuário não encontrado para deleção: ID ${id}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(`Usuário deletado: ID ${id}`);
    res.json({ message: 'Usuário deletado' });
  });
});

module.exports = router;