
const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const c = require('../controllers/pedidoController');

router.use(autenticar); // todas as rotas exigem token + X-User-Id

router.get('/',       c.listar);
router.get('/:id',    c.buscarPorId);
router.post('/',      c.criar);
router.put('/:id',    c.atualizar);
router.delete('/:id', c.remover);

module.exports = router;