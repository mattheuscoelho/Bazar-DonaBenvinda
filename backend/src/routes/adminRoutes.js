const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * Protected Admin Routes
 */
router.get('/overview', authMiddleware, (req, res) => {
  res.json({
    message: 'Acesso autorizado ao painel administrativo.',
    user: req.user
  });
});

module.exports = router;
