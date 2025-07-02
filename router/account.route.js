const express = require('express');
const router = express.Router();
const controller = require('../controller/account.controller');

router.post('/register', controller.registerAccount);
router.post('/login', controller.loginAccount);

module.exports = router;