const express = require('express');
const path = require('path');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const pedidosRoutes  = require('./routes/pedidosRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/api/status', (req, res) => {
  res.json({ versao: '2.0.0', status: 'online' });
});

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);

module.exports = app;