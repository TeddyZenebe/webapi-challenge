const express = require('express');
const projectRouter = require('./projectRouter')
const server = express();

server.use(express.json())
server.use('/api/project', projectRouter)


server.get('/', (req, res) => {
  res.send(`<h3>Project and Action API!</h3>`)
});

module.exports = server;
