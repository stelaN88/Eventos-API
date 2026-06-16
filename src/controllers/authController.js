// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const gerarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha)
      return res.status(400).json({ erro: 'Preencha todos os campos.' });

    const existe = await usuarioModel.buscarPorEmail(email);
    if (existe)
      return res.status(400).json({ erro: 'Email já cadastrado.' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoId = await usuarioModel.criar(nome, email, senhaHash);

    const token = gerarToken(novoId);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario)
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida)
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });

    const token = gerarToken(usuario.id_usuario);
    res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};