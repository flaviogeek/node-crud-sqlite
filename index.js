const app = require('./app');
const db = require('./database');

const PORT = process.env.PORT || 3000;

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`, (err) => {
    if (err) console.error('Erro ao criar tabela users', err);
    else console.log("Tabela 'users' pronta para uso");
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});