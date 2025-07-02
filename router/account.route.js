const express = require('express');
const router = express.Router();
const controller = require('../controller/account.controller');

router.post('/register', controller.registerAccount);

module.exports = router;