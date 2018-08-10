'use strict'

var Videos = require('../models/videos');

function subirVideo(req, res)
{
    var video = new Videos();

    var params = req.body;

    video.nombre= params.nombre;
    video.description= params.description;
    video.embed= params.embed;

    video.save((err, videoSaved)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al guardar el video.'});
        }
        else
        {
            if(!videoSaved)
            {
                res.status(404).send({message: 'No se ha podido guardar el video'});
            }
            else
            {
                res.status(200).send({video: videoSaved});
            }
        }
    });


}

function mostrarVideo(req, res)
{
    var params = req.body;

    var embed = params.embed;

    Videos.findOne({embed: embed}, (err, video)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al buscar el video.'});
        }
        else
        {
            if(!video)
            {
                res.status(404).send({message: 'No se ha encontrado ningun video.'});
            }
            else
            {
                res.status(200).send({video});
            }
        }
    });
}

function mostrarVideos(req, res)
{
    Videos.find().exec((err, docs)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al obtener los videos.'});
        }
        else
        {
            if(!docs)
            {
                res.status(404).send({message: 'No se han encontrado los videos.'});
            }
            else
            {
                res.status(200).send(docs);
            }
        }
    });
}

function eliminarVideo(req, res)
{
    var id= req.params.id;

    Videos.findByIdAndRemove(id, (err, videoRemoved)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al eliminar video'});
        }
        else
        {
            if(!videoRemoved)
            {
                res.status(404).send({message: 'No se pudo eliminar el video.'});
            }
            else
            {
                res.status(200).send({videoRemoved});
            }
        }
    });
}

module.exports =
{
    subirVideo,
    mostrarVideo,
    mostrarVideos,
    eliminarVideo
};