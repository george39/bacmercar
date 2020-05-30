'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    name: { type: String, required: [true, 'El nombre es necesario'] },
    surname: { type: String, required: [true, 'El apellido es obligatorio'] },
    address: { type: String, required: [true, 'La dirección es necesaria'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    phone: { type: String, required: [true, 'El telefono es obligatorio'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    date: { type: Date, default: Date.now() },
    role: { type: String, required: true, default: 'USER_ROLE' },
    image: { type: String, required: false }
});


module.exports = mongoose.model('User', UserSchema);