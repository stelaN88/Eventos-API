
const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');

exports.listar = async (req, res) => {
  try {
    const produtos = await produtoModel.listarTodos();
    res.json(produtos);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.buscarPorId = async (req, res) => {
  try {
    const produto = await produtoModel.buscarPorId(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
    res.json(produto);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.criar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({ erro: 'nome, valor e categorias_id_categoria são obrigatórios.' });
    }

    const categoriaExiste = await categoriaModel.buscarPorId(categorias_id_categoria);
    if (!categoriaExiste) {
      return res.status(400).json({ erro: 'Categoria informada não existe.' });
    }

    const id = await produtoModel.criar(
      nome.trim(), valor, estoque ?? 1, categorias_id_categoria
    );
    const novo = await produtoModel.buscarPorId(id);
    res.status(201).json({ mensagem: 'Produto criado!', produto: novo });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({ erro: 'nome, valor e categorias_id_categoria são obrigatórios.' });
    }

    const existe = await produtoModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Produto não encontrado.' });

    const categoriaExiste = await categoriaModel.buscarPorId(categorias_id_categoria);
    if (!categoriaExiste) {
      return res.status(400).json({ erro: 'Categoria informada não existe.' });
    }

    await produtoModel.atualizar(
      req.params.id, nome.trim(), valor, estoque ?? existe.estoque, categorias_id_categoria
    );
    const atualizado = await produtoModel.buscarPorId(req.params.id);
    res.json({ mensagem: 'Produto atualizado!', produto: atualizado });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.remover = async (req, res) => {
  try {
    const existe = await produtoModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Produto não encontrado.' });

    await produtoModel.remover(req.params.id);
    res.json({ mensagem: 'Produto removido!' });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};