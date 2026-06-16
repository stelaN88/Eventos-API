
const pool = require('../config/database');

const listarTodas = async () => {
  const [rows] = await pool.execute('SELECT * FROM categorias ORDER BY id_categoria');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM categorias WHERE id_categoria = ? LIMIT 1', [id]
  );
  return rows[0] || null;
};

const criar = async (nome) => {
  const [result] = await pool.execute(
    'INSERT INTO categorias (nome) VALUES (?)', [nome]
  );
  return result.insertId;
};

const atualizar = async (id, nome) => {
  const [result] = await pool.execute(
    'UPDATE categorias SET nome = ? WHERE id_categoria = ?', [nome, id]
  );
  return result.affectedRows;
};

const remover = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM categorias WHERE id_categoria = ?', [id]
  );
  return result.affectedRows;
};

module.exports = { listarTodas, buscarPorId, criar, atualizar, remover };