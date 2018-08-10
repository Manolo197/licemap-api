'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT||4000;

mongoose.connect('mongodb://root:root1234@ds119052.mlab.com:19052/licemapweb', (err, res)=>
{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log('La conexion a la base de datos funciona');

        app.listen(port, console.log('Servidor a la escucha en http://localhost:4000'));

    }
})