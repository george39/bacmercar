'use strict'

var bcrypt = require('bcrypt-nodejs');

var Product = require('../models/product');
var Arroz = require('../models/abarrotes/arroz');

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
        product.code = params.code;
        product.quantity = params.quantity;
        product.quantityClient = 0;
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
CREAR UN ARROZ
************************************************************************/
function saveArroz(req, res) {

    var arroz = new Arroz()
    var params = req.body;

    if (params.name) {
        arroz.providerId = params.providerId;
        arroz.name = params.name;
        arroz.priceHigher = params.priceHigher;
        arroz.priceClient = params.priceClient;
        arroz.image = params.image;



        arroz.save((err, arrozSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear aroz'
                });
            } else {
                if (!arrozSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear aroz'
                    });
                } else {
                    res.status(200).send({
                        arroz: arrozSave
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
ACTUALIZAR UN PRODUCTO
************************************************************************/
function updateProductVenta(req, res) {

    var productId = req.params.id;

    var update = { $set: { quantity: req.body.quantity } }; // req.body;


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


/************************************************************
 LISTAR UN PRODUCTO ESPECIFICO
*************************************************************/
function getProductUnic(req, res) {

    let productId = req.params.id;

    Product.findById(productId).populate({ path: 'product_id' }).exec((err, product) => {

        if (err) {
            return res.status(500).json({
                message: 'Error al obtener proveedor'
            });
        } else {
            if (!product) {
                return res.status(404).json({
                    message: 'El proveedor no existe'
                });
            } else {
                return res.status(200).json({
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

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg' || file_ext === 'gif') {


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
    getImageFile,
    getProductUnic,
    saveArroz,
    updateProductVenta

};