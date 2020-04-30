'use strict'


var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/autenticated');
var mdAdmin = require('../middlewares/is-admin');
var OrderProviderControler = require('../controlers/order-provider');


api.post('/save-order-provider', [mdAuth.ensureAuth, mdAdmin.isAdmin], OrderProviderControler.saveOrderProvider);
api.put('/update-order-provider/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], OrderProviderControler.updateOrderProvider);
api.get('/get-order-provider', [mdAuth.ensureAuth, mdAdmin.isAdmin], OrderProviderControler.getOrderProvider);
api.delete('/delete-order-provider/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], OrderProviderControler.deleteOreder);




module.exports = api;