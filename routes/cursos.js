'use strict'

var express = require('express');
var cursoController = require('../controllers/cursos');

var api = express.Router();

api.post('/guardar-curso', cursoController.guardarCurso);
api.post('/obtener-curso', cursoController.obtenerCurso);
api.get('/obtener-cursos', cursoController.mostratCursos);
api.delete('/eliminar-curso/:id', cursoController.eliminarCurso);

module.exports= api;