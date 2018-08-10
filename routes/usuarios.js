'use strict'

var express = require('express');
var UserController = require('../controllers/usuarios');
var md = require('../middlewares/autenticacion');

var api = express.Router();

api.get('/usuarios', UserController.obtenerUsuarios);
api.post('/registro' ,UserController.registrarUsuario);
api.post('/login', UserController.iniciarSesion);
api.delete('/delete/:id', UserController.eliminarUsuarios);

module.exports = api;