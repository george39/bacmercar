'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArrozSchema = Schema({
    providerId: { type: String }, //{ type: Schema.Types.ObjectId, ref: 'Provider' },
    name: { type: String, required: [true, 'El nombre es necesario'] },
    code: { type: String, required: [true, 'El codigo es necesario'] },
    quantity: { type: Number, required: [true, 'La contidad es necesaria'] },
    priceHigher: { type: Number, required: [true, 'El precio al por mayor es necesario'] },
    priceClient: { type: Number, required: [true, 'El precio del cliente es necesario'] },
    image: { type: String, required: false }
});



module.exports = mongoose.model('Arroz', ArrozSchema);