'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = Schema(
    {
        nombre: String,
        description: String,
        temas: [String]
    }
)

module.exports = mongoose.model('Curso', CourseSchema);