
const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');
const produtoModel = require('../models/produtoModel');

exports.listar = async (req, res) => {
  try {
    const pedidos = await pedidoModel.listarTodos();
    res.json(pedidos);
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.buscarPorId = async (req, res) => {
  try {
    const pedido = await pedidoModel.buscarPorId(req.params.id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });

    const itens = await pedidoModel.buscarItensDoPedido(req.params.id);
    res.json({ ...pedido, itens });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

/**
 * Body esperado:
 * {
 *   "data": "2026-06-22",
 *   "clientes_id_cliente": 1,
 *   "itens": [
 *     { "produtos_id_produto": 3, "quantidade": 2, "valor": 49.90 }
 *   ]
 * }
 */
exports.criar = async (req, res) => {
  try {
    const { data, clientes_id_cliente, itens } = req.body;

    if (!data || !clientes_id_cliente || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        erro: 'data, clientes_id_cliente e ao menos um item em "itens" são obrigatórios.',
      });
    }

    const clienteExiste = await clienteModel.buscarPorId(clientes_id_cliente);
    if (!clienteExiste) {
      return res.status(400).json({ erro: 'Cliente informado não existe.' });
    }

    for (const item of itens) {
      if (!item.produtos_id_produto || !item.quantidade || item.valor === undefined) {
        return res.status(400).json({
          erro: 'Cada item precisa de produtos_id_produto, quantidade e valor.',
        });
      }
      const produtoExiste = await produtoModel.buscarPorId(item.produtos_id_produto);
      if (!produtoExiste) {
        return res.status(400).json({ erro: `Produto ${item.produtos_id_produto} não existe.` });
      }
    }

    const id = await pedidoModel.criar(data, clientes_id_cliente, itens);
    const novoPedido = await pedidoModel.buscarPorId(id);
    const novosItens = await pedidoModel.buscarItensDoPedido(id);

    res.status(201).json({
      mensagem: 'Pedido criado!',
      pedido: { ...novoPedido, itens: novosItens },
    });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

/**
 * Atualiza apenas data e cliente do pedido (itens não são alterados).
 */
exports.atualizar = async (req, res) => {
  try {
    const { data, clientes_id_cliente } = req.body;

    if (!data || !clientes_id_cliente) {
      return res.status(400).json({ erro: 'data e clientes_id_cliente são obrigatórios.' });
    }

    const existe = await pedidoModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Pedido não encontrado.' });

    const clienteExiste = await clienteModel.buscarPorId(clientes_id_cliente);
    if (!clienteExiste) {
      return res.status(400).json({ erro: 'Cliente informado não existe.' });
    }

    await pedidoModel.atualizar(req.params.id, data, clientes_id_cliente);
    const atualizado = await pedidoModel.buscarPorId(req.params.id);
    const itens = await pedidoModel.buscarItensDoPedido(req.params.id);

    res.json({ mensagem: 'Pedido atualizado!', pedido: { ...atualizado, itens } });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};

exports.remover = async (req, res) => {
  try {
    const existe = await pedidoModel.buscarPorId(req.params.id);
    if (!existe) return res.status(404).json({ erro: 'Pedido não encontrado.' });

    await pedidoModel.remover(req.params.id);
    res.json({ mensagem: 'Pedido removido!' });
  } catch (e) { res.status(500).json({ erro: e.message }); }
};