const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API CRUD SQLite rodando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
  });