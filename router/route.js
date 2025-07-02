const express = require('express');
const router = express.Router();

const accRoute = require('../router/account.route');
router.use('/api/v1/account', accRoute);

const ticRoute = require('../router/ticketing.route');
router.use('/api/v1/ticket', ticRoute);

router.get('/', (req,res) => {
    console.log('Received GET request');
    res.send('GET request to the homepage')
})

router.post('/', (req,res) => {
    console.log('Received POST request');
    res.send('POST request to the homepage')
})

module.exports = router;