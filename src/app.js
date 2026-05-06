const express = require('express');
require('dotenv').config();
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use((req, res, next) => {
  const sanitizar = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else {
          sanitizar(obj[key]);
        }
      }
    }
  };
  sanitizar(req.body);
  sanitizar(req.query);
  sanitizar(req.params);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);


module.exports = app;