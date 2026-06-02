
const express = require('express');
const path = require('path');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json'); // ← importa o JSON gerado

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // ← rota do Swagger

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);

module.exports = app;