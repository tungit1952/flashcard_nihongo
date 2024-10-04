const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require("../controllers/auth/auth.controller");
const vocabularyController = require("../controllers/vocabulary/vocabulary.controller");
const router = express.Router();

// POST /api/auth/register
router.post('/auth/register', authController.register);

// POST /api/auth/login
router.post('/auth/login', authController.login);

// Vocabulary Routes
// POST /api/vocabularies - Tạo từ vựng mới
router.post('/vocabularies', authMiddleware.validateToken, vocabularyController.create);

// GET /api/vocabularies - Lấy danh sách tất cả từ vựng
router.get('/vocabularies', authMiddleware.validateToken, vocabularyController.list);

// PUT /api/vocabularies/:id - Cập nhật từ vựng theo ID
router.put('/vocabularies/:id', authMiddleware.validateToken, vocabularyController.update);

// DELETE /api/vocabularies/:id - Xóa từ vựng theo ID
router.delete('/vocabularies/:id', authMiddleware.validateToken, vocabularyController.delete);

module.exports = router;