const express = require('express');
const router = express.Router();

const clientController = require("../controllers/client/client.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//CLIENT
router.get('/login', clientController.login);
router.get('/', authMiddleware.validateToken, clientController.home);
router.get('/vocabulary', authMiddleware.validateToken, clientController.vocabulary);

module.exports = router;