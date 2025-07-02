const express = require('express');
const router = express.Router();
const controller = require('../controller/ticketing.controller');
const { decoded } = require('../utils/auth');

const handler = (req,res,next) => {
    const headers = req.headers;
    if (headers?.authorization) {
        const token = headers.authorization.slice(7);
        try {
            const payload = decoded(token);
            console.log(payload);
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

router.post('/add', handler, controller.addTicket);
router.get('/:userId', handler, controller.getTickets);

module.exports = router;