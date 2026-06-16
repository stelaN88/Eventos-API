
const pool = require('../config/database');

async function buscarPorEmail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ? LIMIT 1', [email]
  );
  return rows[0] || null;
}

async function buscarPorId(id) {
  const [rows] = await pool.execute(
    'SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ? LIMIT 1', [id]
  );
  return rows[0] || null;
}

async function criar(nome, email, senhaHash) {
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return result.insertId;
}

module.exports = { buscarPorEmail, buscarPorId, criar };