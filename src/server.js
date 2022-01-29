const cors = require('cors');
const express = require('express');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  return res.send('Its alive!');
});

module.exports = server;
