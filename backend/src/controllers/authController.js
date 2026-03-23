const { getDb } = require('../config/db');
const authService = require('../services/authService');
const { ApiError } = require('../middleware/errorHandler');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Validação básica
      if (!name || !email || !password) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'Nome, email e senha são obrigatórios.');
      }

      if (password.length < 8) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'A senha deve ter no mínimo 8 caracteres.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'Formato de email inválido.');
      }

      const db = await getDb();
      
      // Verificar duplicidade
      const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
      if (existingUser) {
        throw new ApiError(400, 'DUPLICATE_EMAIL', 'Este email já está em uso.');
      }

      const hashedPassword = await authService.hashPassword(password);
      
      const result = await db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      const newUser = await db.get('SELECT id, name, email, createdAt FROM users WHERE id = ?', [result.lastID]);
      
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'Email e senha são obrigatórios.');
      }

      const db = await getDb();
      const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

      if (!user) {
        throw new ApiError(401, 'INVALID_CREDENTIALS', 'Email ou senha incorretos.');
      }

      const isPasswordValid = await authService.comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError(401, 'INVALID_CREDENTIALS', 'Email ou senha incorretos.');
      }

      const token = authService.generateToken(user);

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      // O req.user é preenchido pelo authMiddleware
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
