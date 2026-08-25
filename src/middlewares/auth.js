
const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ erro: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;

    const idInformado = req.headers['x-user-id'];
    if (!idInformado)
      return res.status(403).json({ erro: 'X-User-Id não informado no header.' });

    if (Number(idInformado) !== Number(decoded.id))
      return res.status(403).json({ erro: 'X-User-Id não corresponde ao token.' });

    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};

module.exports = autenticar;