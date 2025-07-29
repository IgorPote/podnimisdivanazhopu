const express = require('express');
const router = express.Router();

// Базовый роут для app2
router.get('/', (req, res) => {
  res.json({
    message: 'Приложение 2 работает',
    app: 'app2',
    version: '1.0.0'
  });
});

module.exports = router; 