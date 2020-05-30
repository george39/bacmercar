'use strict'

var express = require('express');

var fileUpload = require('express-fileupload');

var app = express();


app.put('/', (req, res, next) => {

    // if (!req.files) {
    //     res.status(400).json({
    //         message: 'No selecciono nada'
    //     });
    // }


    // Obtener nombre del archivo
    var archivo = req.files.image;
    var nombreCortado = archivo.name.split('.');

    res.status(200).json({
        message: 'Peticion realizada correctametne',
        nombreCortado: nombreCortado
    });
});


module.exports = app;