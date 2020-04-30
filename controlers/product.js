'use strict'

var bcrypt = require('bcrypt-nodejs');

var Product = require('../models/product');

var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');


/***********************************************************************
CREAR UN PRODUCTO
************************************************************************/
function saveProduct(req, res) {

    var product = new Product()
    var params = req.body;

    if (params.name) {
        product.providerId = params.providerId;
        product.name = params.name;
        product.priceHigher = params.priceHigher;
        product.priceClient = params.priceClient;
        product.image = params.image;



        product.save((err, productSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear producto'
                });
            } else {
                if (!productSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear producto'
                    });
                } else {
                    res.status(200).send({
                        product: productSave
                    });
                }
            }
        });
    }

}



/***********************************************************************
ACTUALIZAR UN PRODUCTO
************************************************************************/
function updateProduct(req, res) {

    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, { new: true }, (err, productUpdate) => {
        if (err) {

            res.status(500).send({
                message: 'Error al actualizar productos'
            });
        } else {
            if (!productUpdate) {
                res.status(404).send({
                    message: 'El producto con ese id no existe'
                });
            } else {
                res.status(200).send({
                    product: productUpdate
                });
            }
        }
    });
}


/***********************************************************************
LISTAT TODOS LOS PORODUCTOS
************************************************************************/
function getProduct(req, res) {

    Product.find((err, product) => {
        if (err) {

            res.status(500).send({
                message: 'Error al cargar productos'
            });
        } else {
            if (!product) {
                res.status(404).send({
                    message: 'No existen productos'
                });
            } else {
                res.status(200).send({
                    product
                });

            }
        }
    });
}


/***********************************************************************
ELIMINAR UN PRODUCTO
************************************************************************/
function deleteProduct(req, res) {

    var productId = req.params.id;


    Product.findByIdAndRemove(productId, (err, productDeleted) => {
        if (err) {

            res.status(500).send({
                message: 'Error al eliminar productos'
            });
        } else {
            if (!productDeleted) {
                res.status(404).send({
                    message: 'No se ha podido borrar el producto'
                });
            } else {

                res.status(200).send({
                    product: productDeleted
                });
            }

        }
    });
}



/***********************************************************************
CARGAR IMAGENES
************************************************************************/
function uploadImage(req, res) {
    var productId = req.params.id;
    var file_name = 'No subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {


            Product.findByIdAndUpdate(productId, { image: file_name }, { new: true }, (err, productUpdate) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al subir imagen'
                    });
                } else {
                    if (!productUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido subir la imagen'
                        });
                    } else {
                        res.status(200).send({
                            product: productUpdate,
                            image: file_name
                        });
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(500).send({
                        message: 'Extension no valida '
                    });
                } else {
                    res.status(500).send({
                        message: 'Extension no valida '
                    });
                }
            });
        }
    } else {
        res.status(200).send({
            message: 'No se ha subido ningun archivo'
        });
    }
}



function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/product/' + imageFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({
                message: 'La imagen no existe'
            });
        }
    });
}



module.exports = {
    saveProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    uploadImage,
    getImageFile
};