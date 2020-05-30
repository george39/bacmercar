'use strict'

var express = require('express');
var ProviderController = require('../controlers/provider');

var api = express.Router();
var mdAuth = require('../middlewares/autenticated');
var mdAdmin = require('../middlewares/is-admin');

api.post('/save-provider', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProviderController.saveProvider);
api.put('/update-provider/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProviderController.updateProvider);
api.get('/get-provider', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProviderController.getProvider);
api.delete('/delete-provider/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProviderController.deleteProvider);
api.get('/get-provider-unico/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProviderController.getProviderUnico);


module.exports = api;