// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco SQLite
const DB_PATH = path.resolve(__dirname, 'users.db');

// Conecta ou cria o banco
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(`[${new Date().toISOString()}] Erro ao conectar no SQLite:`, err.message);
    process.exit(1); // sai do app se não conseguir conectar
  }
  console.log(`[${new Date().toISOString()}] Conectado ao banco SQLite em ${DB_PATH}`);
});

// Cria a tabela 'users' se não existir
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`,
  (err) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Erro ao criar tabela 'users':`, err.message);
    } else {
      console.log(`[${new Date().toISOString()}] Tabela 'users' pronta para uso`);
    }
  }
);

module.exports = db;