const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./database.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  dob TEXT,
  age INTEGER
)`);

app.post('/api/addUser', (req, res) => {
  const { name, dob, age } = req.body;
  db.run('INSERT INTO users (name, dob, age) VALUES (?, ?, ?)', [name, dob, age]);
  res.json({ success: true });
});

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users ORDER BY id DESC', (err, rows) => {
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
