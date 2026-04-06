const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conecta ou cria banco SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado ao banco SQLite.');
});

// Cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
)`);

// Rotas CRUD
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users(name,email) VALUES(?,?)', [name, email], function(err){
    if(err) return res.status(500).json({error: err.message});
    res.json({ id: this.lastID });
  });
});

// IMPORTANTE: ouvir em 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port} 🚀`);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(row);
    });
  });
  
  // PUT /users/:id
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    db.run(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json({ message: "Usuário atualizado" });
      }
    );
  });
  
  // DELETE /users/:id
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json({ message: "Usuário deletado" });
    });
  });