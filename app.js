'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


/***********************************************************************
CARGAR RUTAS
************************************************************************/
var userRoutes = require('./routes/user');
var providerRoutes = require('./routes/provider');
var productRoutes = require('./routes/product');
var orderProviderRoutes = require('./routes/order-provider');
var orderClienteRoutes = require('./routes/order-client');
var uploadRoutes = require('./routes/upload');


/***********************************************************************
MIDLEWARES DE VODY-PARSER
************************************************************************/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/***********************************************************************
CONFIGURAR CABECERAS Y CORS
************************************************************************/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Headers");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

/***********************************************************************
RUTAS BODY-PARSER
************************************************************************/
app.use('/', userRoutes);
app.use('/', providerRoutes);
app.use('/', productRoutes);
app.use('/', orderProviderRoutes);
app.use('/', orderClienteRoutes);
app.use('/upload', uploadRoutes);





module.exports = app;