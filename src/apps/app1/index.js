const express = require('express');
const router = express.Router();

// Базовый роут для app1
router.get('/', (req, res) => {
  res.json({
    message: 'Приложение 1 работает',
    app: 'app1',
    version: '1.0.0'
  });
});

module.exports = router; 