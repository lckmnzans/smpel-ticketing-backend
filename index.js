const express = require('express');
const app = express();
const http = require('http');

const hostname = 'localhost';
const port = 8080;

const router = require('./router/route');
const bodyParser = require('body-parser');

const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', router);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})