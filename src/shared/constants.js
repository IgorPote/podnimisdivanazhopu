// HTTP статус коды
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Роли пользователей
const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

// Статусы приложений
const APP_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error'
};

// Типы приложений
const APP_TYPES = {
  WEB: 'web',
  API: 'api',
  SERVICE: 'service'
};

// Лимиты
const LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_REQUESTS_PER_MINUTE: 100,
  MAX_LOGIN_ATTEMPTS: 5,
  PASSWORD_MIN_LENGTH: 8
};

// Сообщения об ошибках
const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Не авторизован',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND: 'Ресурс не найден',
  VALIDATION_ERROR: 'Ошибка валидации',
  INTERNAL_ERROR: 'Внутренняя ошибка сервера',
  INVALID_CREDENTIALS: 'Неверные учетные данные',
  USER_EXISTS: 'Пользователь уже существует',
  APP_NOT_FOUND: 'Приложение не найдено'
};

module.exports = {
  HTTP_STATUS,
  USER_ROLES,
  APP_STATUS,
  APP_TYPES,
  LIMITS,
  ERROR_MESSAGES
}; 