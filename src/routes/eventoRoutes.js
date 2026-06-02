const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const {
  criarEvento, listarEventos, buscarEventoPorId,
  atualizarEvento, deletarEvento, inscreverEvento,
} = require('../controllers/eventoController');

router.get('/', (req, res) => {
  /*
    #swagger.summary = 'Lista todos os eventos'
    #swagger.responses[200] = { description: 'Lista de eventos retornada com sucesso' }
    #swagger.responses[500] = { description: 'Erro interno no servidor' }
  */
  listarEventos(req, res);
});

router.get('/:id', (req, res) => {
  /*
    #swagger.summary = 'Busca evento por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID do evento'
    }
    #swagger.responses[200] = { description: 'Evento encontrado com sucesso' }
    #swagger.responses[404] = { description: 'Evento não encontrado' }
  */
  buscarEventoPorId(req, res);
});

router.post('/', autenticar, (req, res) => {
  /*
    #swagger.summary = 'Cria um novo evento'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nome: 'Show de Rock',
        descricao: 'Descrição do evento',
        data: '2025-12-01',
        local: 'São Paulo'
      }
    }
    #swagger.responses[201] = { description: 'Evento criado com sucesso' }
    #swagger.responses[400] = { description: 'Dados inválidos' }
  */
  criarEvento(req, res);
});

router.put('/:id', autenticar, (req, res) => {
  /*
    #swagger.summary = 'Atualiza um evento existente'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID do evento'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nome: 'Show de Rock Atualizado',
        descricao: 'Nova descrição',
        data: '2025-12-10',
        local: 'Rio de Janeiro'
      }
    }
    #swagger.responses[200] = { description: 'Evento atualizado com sucesso' }
    #swagger.responses[404] = { description: 'Evento não encontrado' }
  */
  atualizarEvento(req, res);
});

router.delete('/:id', autenticar, (req, res) => {
  /*
    #swagger.summary = 'Deleta um evento'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID do evento'
    }
    #swagger.responses[200] = { description: 'Evento deletado com sucesso' }
    #swagger.responses[404] = { description: 'Evento não encontrado' }
  */
  deletarEvento(req, res);
});

router.post('/:id/inscrever', autenticar, (req, res) => {
  /*
    #swagger.summary = 'Inscreve o usuário autenticado em um evento'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'ID do evento'
    }
    #swagger.responses[200] = { description: 'Inscrição realizada com sucesso' }
    #swagger.responses[404] = { description: 'Evento não encontrado' }
  */
  inscreverEvento(req, res);
});

module.exports = router;