var Sequelize = require("sequelize");

var Pessoa = function () {
 //conexao com banco de dados
 this.con = require('../persistence/conection');
 //define uma tabela chamada pessoa com os campos indicados
 this.Modelo = this.con.define('pessoa', {
  nome: {
   type: Sequelize.STRING,
   allowNull: false
  },
  idade: Sequelize.INTEGER
 });

 this.setConexao = function (c) {
  this.con = c;
 };

 /**
  * cadastra os dados referentes 
  * @param {type} dados
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.cadastra = function (dados, cbSucesso, cbErro) {
  var modelo = this.Modelo;
  //ver em http://docs.sequelizejs.com/manual/tutorial/transactions.html
  this.con.transaction(function(t1){
   return modelo.create(dados, t1).then(cbSucesso).catch(cbErro);
  });
 };

 /**
  * altera os dados referentes ao modelo 
  * @param {type} dados 
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.altera = function (dados, cbSucesso, cbErro) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findOne({where: {id: dados.id}}).then(function (obj) {
     if (obj) {
      obj.update(dados).then(cbSucesso).catch(cbErro);
     }
    });
   });
  }
 };

 //recebe uma função para ter o retorno dos dados
 this.todos = function (funcao) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findAll().then(funcao);
   });
  }
 };

 //recebe um id para pesquisa e uma função para ter o retorno dos dados
 this.selecionaPorID = function (idC, funcao) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findOne({where: {id: idC}}).then(funcao);
   });
  }
 };
 
 //recebe um id para pesquisa e uma função para ter o retorno dos dados
 this.selecionaAnimais = function (idC, funcao) {
  if (this.con != null) {
   //importa o modelo animal
   var Animal = require('../models/animal');
   var modelo = Animal.Modelo;
   this.con.sync().then(function () {
    modelo.findAll({where: {pessoaId: idC}}).then(funcao);
   });
  }
 };

 /**
  * exclui uma pessoa pelo id 
  * @param {type} id
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.exclui = function (id, cbSucesso, cbErro) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.destroy({
     where: {
      id: {
       $eq: id
      }
     }
    }).then(cbSucesso).catch(cbErro);
   });
  }
 };

};

module.exports = new Pessoa();





