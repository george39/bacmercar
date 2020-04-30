'use strict'

var express = require('express');
var UserControler = require('../controlers/user');


var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

api.get('/pruebas', mdAuth.ensureAuth, UserControler.pruebas);
api.post('/save-user', UserControler.saveUser);
api.post('/login', UserControler.login);
api.put('/update-user/:id', mdAuth.ensureAuth, UserControler.updateUser);
api.get('/get-user', mdAuth.ensureAuth, UserControler.getUser);
api.delete('/delete-user/:id', mdAuth.ensureAuth, UserControler.deleteUser);



module.exports = api;