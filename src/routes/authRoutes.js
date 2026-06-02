const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');

router.post('/registrar', (req, res) => {
  /*
    #swagger.summary = 'Registra um novo usuário'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: '123456'
      }
    }
    #swagger.responses[201] = { description: 'Usuário registrado com sucesso' }
    #swagger.responses[400] = { description: 'Dados inválidos ou usuário já existe' }
  */
  registrar(req, res);
});

router.post('/login', (req, res) => {
  /*
    #swagger.summary = 'Realiza login do usuário'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        email: 'joao@email.com',
        senha: '123456'
      }
    }
    #swagger.responses[200] = { description: 'Login realizado com sucesso, retorna token JWT' }
    #swagger.responses[401] = { description: 'Email ou senha inválidos' }
  */
  login(req, res);
});

module.exports = router;