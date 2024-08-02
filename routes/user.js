const express = require('express');
const router = express.Router();

const { register } = require('../controller/register');
const { login } = require('../controller/login');
const { authenticateToken, validateUser } = require('../controller/authController');

// Route handlers
router.post('/register', register);
router.post('/login', login);
router.get('/validate', authenticateToken, validateUser);

module.exports = router;
