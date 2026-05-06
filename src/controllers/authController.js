const User = require('../models/User');
const jwt = require('jsonwebtoken');

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

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