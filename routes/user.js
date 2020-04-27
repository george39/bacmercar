'use strict'

var express = require('express');
var UserControler = require('../controlers/user');


var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

api.get('/pruebas', mdAuth.ensureAuth, UserControler.pruebas);
api.post('/save-user', UserControler.saveUser);
api.post('/login', UserControler.login);



module.exports = api;