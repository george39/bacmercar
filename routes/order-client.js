'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

var orderClientController = require('../controlers/order-client');

api.post('/save-order-client', mdAuth.ensureAuth, orderClientController.saveOrderClient)
api.get('/get-order-client', mdAuth.ensureAuth, orderClientController.getOrderClient)
api.put('/update-order-client/:id', mdAuth.ensureAuth, orderClientController.updateOrderClient)
api.delete('/delete-order-client/:id', mdAuth.ensureAuth, orderClientController.deleteOrderClient)


module.exports = api;