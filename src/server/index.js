require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/database');
const config = require('./config/server');
const logger = require('./utils/logger');

const app = express();

// Подключение к базе данных
connectDB();

// Middleware безопасности
app.use(helmet());

// CORS настройки
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    error: 'Слишком много запросов с этого IP, попробуйте позже.'
  }
});
app.use('/api/', limiter);

// Middleware для парсинга JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Сжатие ответов
app.use(compression());

// Базовый роут
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в API podnimisdivanazhopu',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Обработка 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.originalUrl
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  logger.error('Ошибка сервера:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Внутренняя ошибка сервера' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Запуск сервера
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Сервер запущен на порту ${PORT} в режиме ${config.nodeEnv}`);
});

module.exports = app; 