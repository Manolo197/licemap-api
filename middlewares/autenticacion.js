'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret= 'licemap';

exports.ensureAuth = (req, res, next)=>
{

    if(!req.headers.authorization)
    {
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación.'});
    }
    
    var token= req.headers.authorization.replace(/['"]+/g, '');
    try
    {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix())
        {
            res.status(404).send({message:'El token ha expirado.'});    
        }
    }
    catch(ex)
    {
        res.status(404).send({message:'Token no valido'});
    }

    req.user= payload;
    next();

}