'use strict'

var Usuario = require('../models/usuarios');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../service/jwt');

function registrarUsuario(req, res)
{
    var usuario = new Usuario();

    var params = req.body;
    
    usuario.username= params.username;
    usuario.password= params.password;

    if(params.password)
    {
        bcrypt.hash(params.password, null, null, function(err, hash)
        {
            usuario.password= hash;

            if(usuario.username!=null)
            {
                usuario.save((err, userStored)=>
                {
                    if(err)
                    {
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }
                    else
                    {
                        if(!userStored)
                        {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                        else
                        {
                            res.status(200).send({usuario: userStored});
                        }
                    }
                });
            }
            else
            {
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    }
    else
    {
        res.status(500).send({message: 'Introduce la contraseña.'});
    }

}

function iniciarSesion(req, res)
{
    var params = req.body;

    var nombre = params.username;
    var password = params.password;

    Usuario.findOne({username: nombre}, (err, user)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error en la peticion'});
        }
        else
        {
            if(!user)
            {
                res.status(404).send({message: 'No existe el usuario.'});
            }
            else
            {
                bcrypt.compare(password, user.password, (err, check)=>
                {
                    if(err)
                    {
                        res.status(500).send({message:'Ha ocurrido un error al logearse'});
                    }
                    else
                    {
                        if(check)
                        {
                            if(params.getHash)
                            {
                                res.status(200).send({token: jwt.createToken(user)});
                            }
                            else
                            {
                                res.status(200).send({user});
                            }
                        }
                        else
                        {
                            res.status(404).send({message: 'El usuario no se ha podido logear.'});
                        }
                    }
                });
            }
        }
    });
}

function obtenerUsuarios(req, res)
{
    Usuario.find().exec((err, docs)=>
    {
        if(err)
        {
            res.status(500).send({message: 'error en la peticion.'});
        }
        else
        {
            if(!docs)
            {
                res.status(404).send({message: 'No se encontraron usuarios.'});
            }
            else
            {
                res.status(200).send(docs);
            }
        }
    });
}

function eliminarUsuarios(req, res)
{
    var id= req.params.id;

    Usuario.findByIdAndRemove(id, (err, userRemoved)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al eliminar el usuario'});
        }
        else
        {
            if(!userRemoved)
            {
                res.status(404).send({message: 'No se ha podido eliminar al usuario.'});
                
            }
            else
            {
                res.status(200).send({userRemoved});
            }
        }
    });

}

module.exports =
{
    obtenerUsuarios,
    registrarUsuario,
    iniciarSesion,
    eliminarUsuarios
};