'use strict'

var bcrypt = require('bcrypt-nodejs');


var Aceite = require('../../models/abarrotes/aceite');

var jwt = require('../../services/jwt');
var fs = require('fs');
var path = require('path');



/***********************************************************************
CREAR UN ACEITE
************************************************************************/
function saveAceite(req, res) {

    var aceite = new Aceite()
    var params = req.body;

    if (params.name) {
        aceite.providerId = params.providerId;
        aceite.name = params.name;
        aceite.code = params.code;
        aceite.quantity = params.quantity;
        aceite.priceHigher = params.priceHigher;
        aceite.priceClient = params.priceClient;
        aceite.image = params.image;



        aceite.save((err, aceiteSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear aceite'
                });
            } else {
                if (!aceiteSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear aceite'
                    });
                } else {
                    res.status(200).send({
                        aceite: aceiteSave
                    });
                }
            }
        });
    }

}



/***********************************************************************
ACTUALIZAR UN ACEITE
************************************************************************/
function updateAceite(req, res) {

    var aceiteId = req.params.id;
    var update = req.body;

    Aceite.findByIdAndUpdate(aceiteId, update, { new: true }, (err, aceiteUpdate) => {
        if (err) {

            res.status(500).send({
                message: 'Error al actualizar aceite'
            });
        } else {
            if (!aceiteUpdate) {
                res.status(404).send({
                    message: 'El aceite con ese id no existe'
                });
            } else {
                res.status(200).send({
                    aceite: aceiteUpdate
                });
            }
        }
    });
}


/***********************************************************************
LISTAT TODOS LOS ACEITE
************************************************************************/
function getAceite(req, res) {

    Aceite.find((err, aceite) => {
        if (err) {

            res.status(500).send({
                message: 'Error al cargar aceiteo'
            });
        } else {
            if (!aceite) {
                res.status(404).send({
                    message: 'No existen aceiteo'
                });
            } else {
                res.status(200).send({
                    aceite
                });

            }
        }
    });
}


/************************************************************
 LISTAR UN ACEITE ESPECIFICO
*************************************************************/
function getAceiteUnic(req, res) {

    let aceiteId = req.params.id;

    Aceite.findById(aceiteId).populate({ path: 'aceite_id' }).exec((err, aceite) => {

        if (err) {
            return res.status(500).json({
                message: 'Error al obtener aceite'
            });
        } else {
            if (!aceite) {
                return res.status(404).json({
                    message: 'El aceite no existe'
                });
            } else {
                return res.status(200).json({
                    aceite
                });
            }
        }

    });
}


/***********************************************************************
ELIMINAR UN ACEITE
************************************************************************/
function deleteAceite(req, res) {

    var aceiteId = req.params.id;


    Aceite.findByIdAndRemove(aceiteId, (err, aceiteDeleted) => {
        if (err) {

            res.status(500).send({
                message: 'Error al eliminar aceite'
            });
        } else {
            if (!aceiteDeleted) {
                res.status(404).send({
                    message: 'No se ha podido borrar el aceite'
                });
            } else {

                res.status(200).send({
                    aceite: aceiteDeleted
                });
            }

        }
    });
}



/***********************************************************************
CARGAR ACEITE
************************************************************************/
function uploadImage(req, res) {
    var aceiteId = req.params.id;
    var file_name = 'No subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg' || file_ext === 'gif') {


            Aceite.findByIdAndUpdate(aceiteId, { image: file_name }, { new: true }, (err, aceiteUpdate) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al subir imagen'
                    });
                } else {
                    if (!aceiteUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido subir la imagen'
                        });
                    } else {
                        res.status(200).send({
                            aceite: aceiteUpdate,
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
    var path_file = './uploads/aceite/' + imageFile;

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
    saveAceite,
    updateAceite,
    getAceite,
    deleteAceite,
    uploadImage,
    getImageFile,
    getAceiteUnic,

};