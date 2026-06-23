
const pool = require('../config/database');

const listarTodos = async () => {
  const [rows] = await pool.execute(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque,
            p.categorias_id_categoria, c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     ORDER BY p.id_produto`
  );
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM produtos WHERE id_produto = ? LIMIT 1', [id]
  );
  return rows[0] || null;
};

const criar = async (nome, valor, estoque, categoriaId) => {
  const [result] = await pool.execute(
    'INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria) VALUES (?, ?, ?, ?)',
    [nome, valor, estoque, categoriaId]
  );
  return result.insertId;
};

const atualizar = async (id, nome, valor, estoque, categoriaId) => {
  const [result] = await pool.execute(
    `UPDATE produtos
     SET nome = ?, valor = ?, estoque = ?, categorias_id_categoria = ?
     WHERE id_produto = ?`,
    [nome, valor, estoque, categoriaId, id]
  );
  return result.affectedRows;
};

const remover = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM produtos WHERE id_produto = ?', [id]
  );
  return result.affectedRows;
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };