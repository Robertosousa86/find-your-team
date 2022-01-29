const server = require('./server');

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
