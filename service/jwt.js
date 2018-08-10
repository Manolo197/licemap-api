'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret= 'licemap';

exports.createToken= (user)=>
{

    var payload= {

        sub: user._id,
        nombre: user.nombre,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix()

    }

    return jwt.encode(payload, secret);

}