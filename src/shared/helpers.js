const { HTTP_STATUS, ERROR_MESSAGES } = require('./constants');

// Генерация случайного ID
const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Форматирование ответа API
const formatResponse = (data, message = 'Успешно', status = HTTP_STATUS.OK) => {
  return {
    success: status < 400,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

// Форматирование ошибки API
const formatError = (message, status = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = null) => {
  return {
    success: false,
    error: {
      message,
      status,
      details,
      timestamp: new Date().toISOString()
    }
  };
};

// Валидация email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация пароля
const isValidPassword = (password) => {
  return password && password.length >= 8;
};

// Очистка объекта от undefined и null значений
const cleanObject = (obj) => {
  const cleaned = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

// Асинхронная обработка ошибок
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Проверка на пустой объект
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Форматирование размера файла
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

module.exports = {
  generateId,
  formatResponse,
  formatError,
  isValidEmail,
  isValidPassword,
  cleanObject,
  asyncHandler,
  isEmpty,
  formatFileSize
}; 