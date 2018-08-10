'use strict'

var express = require('express');
var bp = require('body-parser');

var app = express();

//Cargamos rutas 
var user_routes = require('./routes/usuarios');
var video_routes = require('./routes/videos');
var curso_routes = require('./routes/cursos');
var imagen_routes = require('./routes/imagenes');

//configuramos body-paser

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
    1
//configuramos cabeceras http
app.use((req, res, next)=>
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTION, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTION, DELETE');

    next();
});

//rutas bases de la api.
app.use('/api', user_routes);
app.use('/api', video_routes);
app.use('/api', curso_routes);
app.use('/api', imagen_routes);

module.exports= app;