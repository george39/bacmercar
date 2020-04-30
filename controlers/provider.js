'use strict'

var bcrypt = require('bcrypt-nodejs');

var Provider = require('../models/provider');

var jwt = require('../services/jwt');



/***********************************************************************
CREAR UN PROVEEDOR
************************************************************************/
function saveProvider(req, res) {

    var provider = new Provider();

    var params = req.body;


    if (params.nameProvider && params.nameCompany) {
        provider.nameProvider = params.nameProvider;
        provider.nameCompany = params.nameCompany;


        provider.save((err, providerSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar proveedor'
                });
            } else {
                if (!providerSave) {
                    res.status(404).send({
                        message: 'No se ha guardado el provider'
                    });
                } else {
                    res.status(200).send({

                        provider: providerSave
                    });
                }
            }
        });
    }
};



/***********************************************************************
ACTUALIZAR UN PRODUCTO
************************************************************************/
function updateProvider(req, res) {

    var providerId = req.params.id;
    var update = req.body;

    Provider.findByIdAndUpdate(providerId, update, { new: true }, (err, providerUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el proveedor'
            });
        } else {
            if (!providerUpdate) {
                res.status(404).send({
                    message: 'El proveedor con ese id no existe'
                });
            } else {
                res.status(200).send({
                    provider: providerUpdate
                });
            }
        }
    });
}


/***********************************************************************
LISTAR TODOS LOS PROVEEDORES
************************************************************************/
function getProvider(req, res) {

    Provider.find((err, provider) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener el proveedor'
            });
        } else {
            if (!provider) {
                res.status(404).send({
                    message: 'El proveedor no existe'
                });
            } else {
                res.status(200).send({
                    provider
                });
            }
        }
    });
}


/***********************************************************************
ELIMINAR UN PRODUCTO
************************************************************************/
function deleteProvider(req, res) {

    var providerId = req.params.id;


    Provider.findByIdAndDelete(providerId, (err, providerDeleted) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar el proveedor'
            });
        } else {
            if (!providerDeleted) {
                res.status(404).send({
                    message: 'El proveedor con ese id no existe'
                });
            } else {
                res.status(200).send({
                    provider: providerDeleted
                });
            }
        }
    });
}



module.exports = {
    saveProvider,
    updateProvider,
    getProvider,
    deleteProvider
}