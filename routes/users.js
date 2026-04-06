// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /users - lista todos
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /users/:id - usuário específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(row);
  });
});

// POST /users - cria usuário
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nome e email obrigatórios' });

  db.run('INSERT INTO users(name,email) VALUES(?,?)', [name, email], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// PUT /users/:id - atualiza usuário
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ message: 'Usuário atualizado' });
    }
  );
});

// DELETE /users/:id - deleta usuário
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado' });
  });
});

module.exports = router;