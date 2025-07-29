const logger = require('../utils/logger');
const { formatError, HTTP_STATUS } = require('../../shared/helpers');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Логирование ошибки
  logger.error('Ошибка:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose ошибка валидации
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = formatError(message, HTTP_STATUS.BAD_REQUEST);
  }

  // Mongoose ошибка дублирования ключа
  if (err.code === 11000) {
    const message = 'Дублирование данных';
    error = formatError(message, HTTP_STATUS.CONFLICT);
  }

  // Mongoose ошибка неверного ObjectId
  if (err.name === 'CastError') {
    const message = 'Неверный формат ID';
    error = formatError(message, HTTP_STATUS.BAD_REQUEST);
  }

  // JWT ошибки
  if (err.name === 'JsonWebTokenError') {
    const message = 'Неверный токен';
    error = formatError(message, HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Токен истек';
    error = formatError(message, HTTP_STATUS.UNAUTHORIZED);
  }

  // Ошибка по умолчанию
  if (!error.error) {
    error = formatError(
      err.message || 'Внутренняя ошибка сервера',
      err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  res.status(error.error.status).json(error);
};

module.exports = errorHandler; 