const express = require('express');
const router = express.Router();
const authController =require('../controller/authControllers');

router.post('/', authController.handleLogin);

module.exports = router;