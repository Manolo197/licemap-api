'use strict'

var Cursos= require('../models/cursos');

function guardarCurso(req, res)
{
    var curso = new Cursos();
    var params = req.body;

    curso.nombre= params.nombre;
    curso.description= params.description;
    curso.temas= params.temas;

    curso.save((err, courseSaved)=>
    {
        if(err)
        {
            res.status(500).send({message:'Error al guardar el video.'});
        }
        else
        {
            if(!courseSaved)
            {
                res.status(404).send({message: 'No se ha podido guardar el video.'});
            }
            else
            {
                res.status(200).send({curso: courseSaved});
            }
        }   
    });

}

function obtenerCurso(req, res)
{
    var params = req.body;

    var curso = params.nombre;

    Cursos.findOne({nombre: curso}, (err, course)=>
    {
        if(err)
        {
            res.status(500).send({messgae: 'Error al buscar el curso'});
        }
        else
        {
            if(!course)
            {
                res.status(404).send({message:'No se ha encontrado el curso'});
            }
            else
            {
                res.status(200).send({course});
            }
        }
    });
}

function mostratCursos(req, res)
{
    Cursos.find().exec((err, docs)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al obtener los cursos'});
        }
        else
        {
            if(!docs)
            {
                res.status(404).send({message: 'No se encontraron cursos'});
            }
            else
            {
                res.status(200).send({docs});
            }
        }
    });
}

function eliminarCurso(req, res)
{
    var id= req.params.id;

    Cursos.findByIdAndRemove(id, (err, courseRemoved)=>
    {
        if(err)
        {
            res.status(500).send({message: 'Error al eliminar el video.'});
        }
        else
        {
            if(!courseRemoved)
            {
                res.status(404).send({message: 'No se ha podido eliminar el video'});
            }
            else
            {
                res.status(200).send({courseRemoved});
            }
        }
    });
}

module.exports= 
{
    guardarCurso,
    obtenerCurso,
    mostratCursos,
    eliminarCurso
};