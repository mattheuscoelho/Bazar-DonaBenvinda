const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'UNAUTHORIZED', 'Token de autenticação não fornecido ou inválido.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER || 'bazar-donabenvinda'
    });

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'TOKEN_EXPIRED', 'O token de autenticação expirou.'));
    }
    return next(new ApiError(401, 'INVALID_TOKEN', 'Token de autenticação inválido.'));
  }
}

module.exports = { authMiddleware };
