
const categoriaModel = require('../models/categoriaModel');

exports.listar = async (req, res) => {
  try {
    const categorias = await categoriaModel.listarTodas();
    res.json(categorias);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.buscarPorId = async (req, res) => {
  try {
    const categoria = await categoriaModel.buscarPorId(req.params.id);
    if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada.' });
    res.json(categoria);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório.' });
    const id = await categoriaModel.criar(nome.trim());
    const nova = await categoriaModel.buscarPorId(id);
    res.status(201).json({ mensagem: 'Categoria criada!', categoria: nova });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório.' });
    const existe = await categoriaModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Categoria não encontrada.' });
    await categoriaModel.atualizar(req.params.id, nome.trim());
    res.json({ mensagem: 'Categoria atualizada!', categoria: await categoriaModel.buscarPorId(req.params.id) });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.remover = async (req, res) => {
  try {
    const existe = await categoriaModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Categoria não encontrada.' });
    await categoriaModel.remover(req.params.id);
    res.json({ mensagem: 'Categoria removida!' });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};