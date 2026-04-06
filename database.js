// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) return console.error('Erro ao conectar ao SQLite:', err.message);
  console.log('Conectado ao banco SQLite.');
});

// Cria tabela users se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
)`);

module.exports = db;