const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const {
  criarEvento, listarEventos, buscarEventoPorId,
  atualizarEvento, deletarEvento, inscreverEvento,
} = require('../controllers/eventoController');

router.get('/', listarEventos);
router.get('/:id', buscarEventoPorId);
router.post('/', autenticar, criarEvento);
router.put('/:id', autenticar, atualizarEvento);
router.delete('/:id', autenticar, deletarEvento);
router.post('/:id/inscrever', autenticar, inscreverEvento);

module.exports = router;