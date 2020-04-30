'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/autenticated');
var mdAdmin = require('../middlewares/is-admin');

var ProductController = require('../controlers/product');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/product' });


api.post('/save-product', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.saveProduct);
api.put('/update-product/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.updateProduct);
api.get('/get-product', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.getProduct);
api.delete('/delete-product/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.deleteProduct);
api.post('/upload-image-product/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.uploadImage);
api.get('/get-image-product/:imageFile', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.getImageFile);


module.exports = api;