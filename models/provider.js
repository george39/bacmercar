'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProviderSchema = new Schema({
    nameProvider: { type: String, required: [true, 'El nombre es obligatorio'] },
    nameCompany: { type: String, required: [true, 'El nombre de la empresa es obligatorio'] }
});


module.exports = mongoose.model('Provider', ProviderSchema);