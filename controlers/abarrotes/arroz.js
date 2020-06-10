'use strict'

var bcrypt = require('bcrypt-nodejs');


var Arroz = require('../../models/abarrotes/arroz');

var jwt = require('../../services/jwt');
var fs = require('fs');
var path = require('path');



/***********************************************************************
CREAR UN ARROZ
************************************************************************/
function saveArroz(req, res) {

    var arroz = new Arroz()
    var params = req.body;

    if (params.name) {
        arroz.providerId = params.providerId;
        arroz.name = params.name;
        arroz.code = params.code;
        arroz.quantity = params.quantity;
        arroz.quantityClient = 0;
        arroz.priceHigher = params.priceHigher;
        arroz.priceClient = params.priceClient;
        arroz.image = params.image;



        arroz.save((err, arrozSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear arroz'
                });
            } else {
                if (!arrozSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear arroz'
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
ACTUALIZAR UN ARROZ
************************************************************************/
function updateArroz(req, res) {

    var arrozId = req.params.id;
    var update = req.body;

    Arroz.findByIdAndUpdate(arrozId, update, { new: true }, (err, arrozUpdate) => {
        if (err) {

            res.status(500).send({
                message: 'Error al actualizar arrozo'
            });
        } else {
            if (!arrozUpdate) {
                res.status(404).send({
                    message: 'El arroz con ese id no existe'
                });
            } else {
                res.status(200).send({
                    arroz: arrozUpdate
                });
            }
        }
    });
}


/***********************************************************************
LISTAT TODOS LOS ARROCES
************************************************************************/
function getArroz(req, res) {

    Arroz.find((err, arroz) => {
        if (err) {

            res.status(500).send({
                message: 'Error al cargar arrozo'
            });
        } else {
            if (!arroz) {
                res.status(404).send({
                    message: 'No existen arrozo'
                });
            } else {
                res.status(200).send({
                    arroz
                });

            }
        }
    });
}


/************************************************************
 LISTAR UN ARROZ ESPECIFICO
*************************************************************/
function getArrozUnic(req, res) {

    let arrozId = req.params.id;

    Arroz.findById(arrozId).populate({ path: 'arroz_id' }).exec((err, arroz) => {

        if (err) {
            return res.status(500).json({
                message: 'Error al obtener arroz'
            });
        } else {
            if (!arroz) {
                return res.status(404).json({
                    message: 'El arroz no existe'
                });
            } else {
                return res.status(200).json({
                    arroz
                });
            }
        }

    });
}


/***********************************************************************
ELIMINAR UN ARROZ
************************************************************************/
function deleteArroz(req, res) {

    var arrozId = req.params.id;


    Arroz.findByIdAndRemove(arrozId, (err, arrozDeleted) => {
        if (err) {

            res.status(500).send({
                message: 'Error al eliminar arroz'
            });
        } else {
            if (!arrozDeleted) {
                res.status(404).send({
                    message: 'No se ha podido borrar el arroz'
                });
            } else {

                res.status(200).send({
                    arroz: arrozDeleted
                });
            }

        }
    });
}



/***********************************************************************
CARGAR IMAGENES
************************************************************************/
function uploadImage(req, res) {
    var arrozId = req.params.id;
    var file_name = 'No subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg' || file_ext === 'gif') {


            Arroz.findByIdAndUpdate(arrozId, { image: file_name }, { new: true }, (err, arrozUpdate) => {

                if (err) {
                    res.status(500).send({
                        message: 'Error al subir imagen'
                    });
                } else {
                    if (!arrozUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido subir la imagen'
                        });
                    } else {
                        res.status(200).send({
                            arroz: arrozUpdate,
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
    var path_file = './uploads/arroz/' + imageFile;

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
    saveArroz,
    updateArroz,
    getArroz,
    deleteArroz,
    uploadImage,
    getImageFile,
    getArrozUnic,

};