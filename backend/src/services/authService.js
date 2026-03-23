const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../middleware/errorHandler');

class AuthService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }

  generateToken(user) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido nas variáveis de ambiente.');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const options = {
      expiresIn: '1h',
      issuer: process.env.JWT_ISSUER || 'bazar-donabenvinda'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
}

module.exports = new AuthService();
