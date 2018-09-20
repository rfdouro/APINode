'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
 var Animal = require('../models/animal');
 Animal.todos(function (animals) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(animals));
 });
});

router.get('/:id', function (req, res) {
 var Animal = require('../models/animal');
 var idConsulta = req.params.id;
 Animal.selecionaPorID(idConsulta, function (animal) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(animal));
 });
});

router.post('/', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Animal = require('../models/animal');
 Animal.cadastra({
  nome: req.body.nome,
  pessoaId: req.body.pessoaId
 }, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Inserido com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

router.put('/', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Animal = require('../models/animal');
 Animal.altera({
  id: req.body.id,
  nome: req.body.nome,
  pessoaId: req.body.pessoaId
 }, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Alterado com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

router.delete('/:id', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Animal = require('../models/animal');
 Animal.exclui(req.params.id, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Excluído com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

module.exports = router;

