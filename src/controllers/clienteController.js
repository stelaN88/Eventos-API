
const clienteModel = require('../models/clienteModel');

const STATUS_VALIDOS = ['bom', 'medio', 'ruim'];

exports.listar = async (req, res) => {
  try {
    const clientes = await clienteModel.listarTodos();
    res.json(clientes);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.buscarPorId = async (req, res) => {
  try {
    const cliente = await clienteModel.buscarPorId(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.criar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'nome e telefone são obrigatórios.' });
    }
    if (status && !STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: `status deve ser um de: ${STATUS_VALIDOS.join(', ')}.` });
    }

    const id = await clienteModel.criar(nome.trim(), telefone.trim(), status);
    const novo = await clienteModel.buscarPorId(id);
    res.status(201).json({ mensagem: 'Cliente criado!', cliente: novo });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'nome e telefone são obrigatórios.' });
    }
    if (status && !STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: `status deve ser um de: ${STATUS_VALIDOS.join(', ')}.` });
    }

    const existe = await clienteModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Cliente não encontrado.' });

    await clienteModel.atualizar(
      req.params.id, nome.trim(), telefone.trim(), status || existe.status
    );
    const atualizado = await clienteModel.buscarPorId(req.params.id);
    res.json({ mensagem: 'Cliente atualizado!', cliente: atualizado });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.remover = async (req, res) => {
  try {
    const existe = await clienteModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Cliente não encontrado.' });

    await clienteModel.remover(req.params.id);
    res.json({ mensagem: 'Cliente removido!' });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};