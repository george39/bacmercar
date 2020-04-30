'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = Schema({
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
    name: { type: String, required: [true, 'El nombre es necesario'] },
    priceHigher: { type: Number, required: [true, 'El precio al por mayor es necesario'] },
    priceClient: { type: Number, required: [true, 'El precio del cliente es necesario'] },
    image: { type: String, required: false }
});



module.exports = mongoose.model('Product', ProductSchema);