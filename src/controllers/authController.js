const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT para o usuário autenticado.
 * @param {string} id - ID do usuário no MongoDB
 * @returns {string} Token JWT com validade de 7 dias
 */
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Registra um novo usuário na aplicação.
 * Verifica se o e-mail já está cadastrado antes de criar o usuário.
 * Em caso de sucesso, retorna o token JWT gerado.
 * @async
 * @param {Object} req - Objeto de requisição do Express
 * @param {string} req.body.nome - Nome do usuário
 * @param {string} req.body.email - E-mail do usuário
 * @param {string} req.body.senha - Senha do usuário
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Promise<void>}
 */
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }
    const usuario = await User.create({ nome, email, senha });
    const token = gerarToken(usuario._id);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * Realiza o login do usuário.
 * Verifica se o e-mail existe e se a senha está correta.
 * Em caso de sucesso, retorna o token JWT gerado.
 * @async
 * @param {Object} req - Objeto de requisição do Express
 * @param {string} req.body.email - E-mail do usuário
 * @param {string} req.body.senha - Senha do usuário
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }
    const token = gerarToken(usuario._id);
    res.json({ mensagem: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};