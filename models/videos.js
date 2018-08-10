'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = Schema(
    {
        nombre: String,
        description: String,
        embed: String
    }
)

module.exports = mongoose.model('Video', VideoSchema);