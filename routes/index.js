const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require("../controllers/auth/auth.controller");
const vocabularyController = require("../controllers/vocabulary/vocabulary.controller");
const tagController = require("../controllers/tags/tag.controller");
const router = express.Router();

// POST /api/auth/register
router.post('/auth/register', authController.register);

// POST /api/auth/login
router.post('/auth/login', authController.login);

// POST /api/auth/logout
router.post('/auth/logout', authMiddleware.validateToken, authController.logout);

// Vocabulary Routes
// POST /api/vocabularies - Tạo từ vựng mới
router.post('/vocabularies/create', authMiddleware.validateToken, vocabularyController.create);

// GET /api/vocabularies - Lấy danh sách tất cả từ vựng
router.get('/vocabularies', authMiddleware.validateToken, vocabularyController.list);

// PUT /api/vocabularies/:id - Cập nhật từ vựng theo ID
router.put('/vocabularies/:id', authMiddleware.validateToken, vocabularyController.update);

// DELETE /api/vocabularies/:id - Xóa từ vựng theo ID
router.delete('/vocabularies/:id', authMiddleware.validateToken, vocabularyController.delete);

// Tag Routes
// POST /api/vocabularies - Tạo tag
router.post('/tags/create', authMiddleware.validateToken, tagController.create);

// GET /api/vocabularies - Lấy danh sách tags
router.get('/tags', authMiddleware.validateToken, tagController.list);

// PUT /api/vocabularies/:id - Cập nhật tags theo ID
router.put('/tags/:id', authMiddleware.validateToken, tagController.update);

// DELETE /api/vocabularies/:id - Xóa tags theo ID
router.delete('/tags/:id', authMiddleware.validateToken, tagController.delete);

module.exports = router;