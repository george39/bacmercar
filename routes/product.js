'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/autenticated');
var mdAdmin = require('../middlewares/is-admin');

var ProductController = require('../controlers/product');
var ArrozController = require('../controlers/abarrotes/arroz');
var AceiteController = require('../controlers/abarrotes/aceite');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/product' });
var md_uploadArroz = multipart({ uploadDir: './uploads/arroz' });
var md_uploadAceite = multipart({ uploadDir: './uploads/aceite' });


api.post('/save-product', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.saveProduct);
api.put('/update-product/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.updateProduct);
api.get('/get-product', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.getProduct);
api.get('/get-product-unic/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.getProductUnic);
api.delete('/delete-product/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ProductController.deleteProduct);
api.post('/upload-image-product/:id', [mdAuth.ensureAuth, md_upload], ProductController.uploadImage);
api.get('/get-image-product/:imageFile', ProductController.getImageFile);


/************************************************************
 ABARROTES
 *************************************************************/
api.post('/save-arroz', [mdAuth.ensureAuth, mdAdmin.isAdmin], ArrozController.saveArroz);
api.get('/get-arroz', [mdAuth.ensureAuth], ArrozController.getArroz);
api.get('/get-arroz-unic/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ArrozController.getArrozUnic);
api.put('/update-arroz/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ArrozController.updateArroz);
api.delete('/delete-arroz/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], ArrozController.deleteArroz);
api.post('/upload-image-arroz/:id', [mdAuth.ensureAuth, md_uploadArroz], ArrozController.uploadImage);
api.get('/get-image-arroz/:imageFile', ArrozController.getImageFile);


// aciete
api.post('/save-aceite', [mdAuth.ensureAuth, mdAdmin.isAdmin], AceiteController.saveAceite);
api.get('/get-aceite', [mdAuth.ensureAuth, mdAdmin.isAdmin], AceiteController.getAceite);
api.get('/get-aceite-unic/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AceiteController.getAceiteUnic);
api.put('/update-aceite/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AceiteController.updateAceite);
api.delete('/delete-aceite/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AceiteController.deleteAceite);
api.post('/upload-image-aceite/:id', [mdAuth.ensureAuth, md_uploadAceite], AceiteController.uploadImage);
api.get('/get-image-aceite/:imageFile', AceiteController.getImageFile);


module.exports = api;