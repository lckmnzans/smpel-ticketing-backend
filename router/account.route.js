const express = require('express');
const router = express.Router();
const controller = require('../controller/account.controller');
const { decoded } = require('../utils/auth');

router.post('/register', controller.registerAccount);
router.get('/login', controller.loginAccount);

function handler(req,res,next) {
    const headers = req.headers;
    if (headers?.authorization) {
        const token = headers.authorization.slice(7);
        const payload = decoded(token);
    }
}

module.exports = router;