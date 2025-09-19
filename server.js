require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL');
});


app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err);
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
});


app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send('Faltan datos');
  }

  db.query(
    'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
    [nombre, precio],
    (err) => {
      if (err) {
        console.error('❌ Error al agregar producto:', err);
        return res.status(500).send('Error al agregar producto');
      }
      res.send('Producto agregado');
    }
  );
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
