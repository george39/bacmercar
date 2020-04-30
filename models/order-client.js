'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderClientSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    detail: { type: String, required: [true, 'El detalle es obligatorio'] },
    price: { type: Number, required: [true, 'El precio es obligatorio'] },
    date: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('OderClient', OrderClientSchema);