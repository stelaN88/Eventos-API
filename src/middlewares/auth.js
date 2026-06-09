const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação via JWT.
 * Verifica se o token Bearer está presente e é válido.
 * Em caso de sucesso, adiciona os dados do usuário decodificado em `req.usuario` e chama o próximo middleware.
 * Em caso de falha, retorna status 401 com mensagem de erro.
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} req.headers.authorization - Header de autorização no formato "Bearer <token>"
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para chamar o próximo middleware
 * @returns {void}
 */
const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};

module.exports = autenticar;