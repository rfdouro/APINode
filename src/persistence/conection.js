//carrega o ORM
var sequelize = require("sequelize");

var Conexao = function () {
 //inicia o arquivo de banco de dados
 this.conexao = new sequelize('null', 'null', 'null', {//passa null para usuario, senha e ip
  dialect: 'sqlite',
  storage: 'bd.sqlite'
 });
};

module.exports = new Conexao().conexao;

