
const pool = require('../config/database');

const listarTodos = async () => {
  const [rows] = await pool.execute('SELECT * FROM clientes ORDER BY id_cliente');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1', [id]
  );
  return rows[0] || null;
};

const criar = async (nome, telefone, status) => {
  const [result] = await pool.execute(
    'INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)',
    [nome, telefone, status || 'medio']
  );
  return result.insertId;
};

const atualizar = async (id, nome, telefone, status) => {
  const [result] = await pool.execute(
    'UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?',
    [nome, telefone, status, id]
  );
  return result.affectedRows;
};

const remover = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM clientes WHERE id_cliente = ?', [id]
  );
  return result.affectedRows;
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };