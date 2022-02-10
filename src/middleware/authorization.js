const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ message: 'Token não foi informado.' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ message: 'Erro no formato do token.' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: 'Erro de formatação de token' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Token inválido' });

    req.userId = decoded.id;

    return next();
  });
};