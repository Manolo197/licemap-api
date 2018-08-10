'use strict'

var express = require('express');
var videoController = require('../controllers/videos');

var api = express.Router();

api.post('/subir-video', videoController.subirVideo);
api.post('/obtener-video', videoController.mostrarVideo);
api.delete('/eliminar-video/:id', videoController.eliminarVideo);
api.get('/videos', videoController.mostrarVideos);

module.exports= api;