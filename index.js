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