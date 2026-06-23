
const pool = require('../config/database');

/**
 * Lista todos os pedidos com dados básicos do cliente.
 */
const listarTodos = async () => {
  const [rows] = await pool.execute(
    `SELECT p.id_pedido, p.data, p.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos p
     JOIN clientes c ON c.id_cliente = p.clientes_id_cliente
     ORDER BY p.id_pedido`
  );
  return rows;
};

/**
 * Busca um pedido pelo ID (sem os itens).
 */
const buscarPorId = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM pedidos WHERE id_pedido = ? LIMIT 1', [id]
  );
  return rows[0] || null;
};

/**
 * Busca os itens (produtos) de um pedido específico.
 */
const buscarItensDoPedido = async (idPedido) => {
  const [rows] = await pool.execute(
    `SELECT pp.produtos_id_produto, pr.nome AS produto_nome,
            pp.quantidade, pp.valor
     FROM produtos_pedidos pp
     JOIN produtos pr ON pr.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [idPedido]
  );
  return rows;
};

/**
 * Cria um pedido e seus itens em uma única transação.
 * @param {string} data - data no formato YYYY-MM-DD
 * @param {number} clienteId
 * @param {Array<{produtos_id_produto:number, quantidade:number, valor:number}>} itens
 */
const criar = async (data, clienteId, itens) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      'INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)',
      [data, clienteId]
    );
    const idPedido = result.insertId;

    for (const item of itens) {
      await conn.execute(
        `INSERT INTO produtos_pedidos
           (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
         VALUES (?, ?, ?, ?)`,
        [item.produtos_id_produto, idPedido, item.quantidade, item.valor]
      );
    }

    await conn.commit();
    return idPedido;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

/**
 * Atualiza apenas os dados gerais do pedido (data e cliente).
 * Itens não são alterados aqui (poderia ser expandido depois).
 */
const atualizar = async (id, data, clienteId) => {
  const [result] = await pool.execute(
    'UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?',
    [data, clienteId, id]
  );
  return result.affectedRows;
};

/**
 * Remove um pedido e seus itens (em transação, por integridade referencial).
 */
const remover = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?', [id]);
    const [result] = await conn.execute('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    await conn.commit();
    return result.affectedRows;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  listarTodos, buscarPorId, buscarItensDoPedido, criar, atualizar, remover,
};