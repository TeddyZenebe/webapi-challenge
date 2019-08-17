const express = require('express');
const router = require('./projectactionRouter')
const server = express();

server.use(express.json())
server.use('/api/project', router)


server.get('/', (req, res) => {
  res.send(`<h3>Project and Action API!</h3>`)
});

module.exports = server;
