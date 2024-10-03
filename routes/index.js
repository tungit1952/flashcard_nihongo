const express = require('express');
const authController = require("../controllers/auth/auth.controller");
const router = express.Router();

// POST /api/auth/register
router.post('/auth/register', authController.register);

// POST /api/auth/login
router.post('/auth/login', authController.login);

module.exports = router;
