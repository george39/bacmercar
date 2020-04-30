'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OderProviderSchema = new Schema({
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
    nameProduct: { type: String, required: [true, 'El nombre del producto es obligatorio'] },
    quantity: { type: Number, required: [true, 'La cantidad es necesario'] },
    price: { type: Number, required: [true, 'El precio es obligatorio'] },
    date: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('OrderProvider', OderProviderSchema);