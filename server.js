const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Para permitir requisições do front-end

const app = express();
const PORT = 5000;

// Ativar o middleware CORS para permitir requisições de diferentes origens (front-end)
app.use(cors());

// Conectar ou criar o banco de dados 'clientes.db'
const db = new sqlite3.Database('./clientes.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar a tabela 'clientes' se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    telefone TEXT,
    email TEXT
  )
`);

// Endpoint para buscar todos os clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Adicionar um novo cliente
app.post('/clientes', express.json(), (req, res) => {
  const { nome, telefone, email } = req.body;
  const sql = 'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)';
  db.run(sql, [nome, telefone, email], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
