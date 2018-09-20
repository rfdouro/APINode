//carrega a aplicação
const app = require('./src/app');
//carrega o manuseio de arquivos
const fs = require("fs");
//cria uma conexão simples
const con = require('./src/persistence/conection');

//define a porta da aplicação
const PORT = process.env.PORT || 3000;
//abre o servidor para atender as requisições
const server = app.listen(PORT, () => {
 var host = server.address().address;
 var port = server.address().port;
 console.log(`Servidor ${host} trabalhando na porta ${port}...`);
});
//trata eventuais erros
server.on('error', (error) => {
 if (error.syscall !== 'listen') {
  throw error;
 }
 const bind = typeof port === 'string' ?
         'Pipe ' + port :
         'Port ' + port;
 switch (error.code) {
  case 'EACCES':
   console.error(bind + ' requer elevação de privilégios');
   process.exit(1);
   break;
  case 'EADDRINUSE':
   console.error(bind + ' (em uso atualmente)');
   process.exit(1);
   break;
  default:
   throw error;
 }
});

