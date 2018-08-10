'use strict'

var Imagenes = require('../models/imagenes');
var fs= require('fs');
var path= require('path');

function uploadImage(req, res)
{
    var file_name='No subido...'
    var imagen= new Imagenes();

    if(req.files)
    {
        var file_path= req.files.image.path;
        console.log(req.files);
        var file_split= file_path.split('\\');
        file_name= file_split[1];
        
        var file_ext = file_name.split('.');
        console.log(file_ext[1]);

        if(file_ext[1]=='jpg' ||file_ext[1]=='png' ||file_ext[1]=='gif')
        {
            imagen.nombre= file_name;
            imagen.save((err, imageSaved)=>
            {
                if(err)
                {
                    res.status(500).send({message: 'Error al subir archivo'});
                }
                else
                {
                    if(!imageSaved)
                    {
                        res.status(404).send({message: 'No se ha podido guardar la imagen.'});
                    }
                    else
                    {
                        res.status(200).send({imagen: imageSaved});
                    }
                }
            });
        }
        else
        {
            res.status(200).send({message: 'Archivo no valido.'});
        }

    }
    else
    {
        res.status(200).send({message:'No se ha subido ninguna imagen.'});
    }

}

function getImage(req, res)
{
    var imageFile= req.params.imageFile;
    
    var path_file = './uploads/'+imageFile;

    fs.exists(path_file, (exist)=>
    {
        if(exist)
        {
            res.sendFile(path.resolve(path_file));
        }
        else
        {
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

function mostrarImagenes(req, res)
{
    Imagenes.find().exec((err, docs)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al obtener las imagenes.'});
        }
        else
        {
            if(!docs)
            {
                res.status(404).send({message: 'No se encontraron imagenes'});
            }
            else
            {
                res.status(200).send({docs});
            }
        }
    });
}

function deleteImagen(req, res)
{
    var id = req.params.id;

    Imagenes.findByIdAndRemove(id, (err, imageRemoved)=>
    {
        if(err)
        {
            res.status(500).send({message:'Error al eliminar la imagen'});
        }
        else
        {
            if(!imageRemoved)
            {
                res.status(404).send({message: 'NO se pudo eliminar la imagen.'});
            }
            else
            {
                res.status(200).send({imageRemoved});
            }
        }
    });
}

module.exports=
{
    uploadImage,
    getImage,
    mostrarImagenes,
    deleteImagen
};