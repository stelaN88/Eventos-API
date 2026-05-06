const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

app.use(express.json());
app.use(mongoSanitize()); // Proteção contra NoSQL Injection

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à Eventos-API!' });
});

module.exports = app;