require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { migrate } = require('./config/migrate');
const { errorHandler } = require('./middleware/errorHandler');

// Validar variáveis de ambiente obrigatórias
if (!process.env.JWT_SECRET) {
  console.error('ERRO: JWT_SECRET não configurado no arquivo .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Rota de Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Importar e usar Rotas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Error Handler (DEVE ser o último middleware)
app.use(errorHandler);

// Inicializar Banco e Servidor
async function bootstrap() {
  try {
    await migrate();
    
    app.listen(PORT, () => {
      console.log(`Backend rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

bootstrap();
