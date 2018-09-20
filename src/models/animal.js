var Sequelize = require("sequelize");

var Animal = function () {
 //conexao com banco de dados
 this.con = require('../persistence/conection');
 //define uma tabela chamada animal com os campos indicados
 this.Modelo = this.con.define('animal', {
  nome: {
   type: Sequelize.STRING,
   allowNull: false
  }
 });
 //importa o modelo pessoa
 var Pessoa = require('../models/pessoa');
 //associa o animal a pessoa
 //uma pessoa pode ter um animal
 //this.Modelo.belongsTo(Pessoa.Modelo);
 //uma pessoa pode ter varios animais
 //no modelo Animal é criado um campo FK chamado pessoaId
 Pessoa.Modelo.hasMany(this.Modelo, {foreignKey: 'pessoaId', sourceKey: 'id'});
 //this.Modelo.belongsTo(Pessoa.Modelo, {foreignKey: 'pessoaId', targetKey: 'id'});

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
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.create(dados).then(cbSucesso).catch(cbErro);
   });
  }
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

 /**
  * exclui uma animal pelo id 
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

module.exports = new Animal();
