'use strict'

var express = require('express');
var ImageController = require('../controllers/imagenes');
var api = express.Router();

var multypart = require('connect-multiparty');

var md_upload = multypart({uploadDir: './uploads'});

api.post('/guardar-imagen', md_upload , ImageController.uploadImage);
api.get('/obtener-imagen/:imageFile', ImageController.getImage);
api.delete('/eliminar-imagen/:id', ImageController.deleteImagen);
api.get('/obtener-imagenes', ImageController.mostrarImagenes);

module.exports = api;