'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');

// modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Pruebas del controlador de usuario',
        user: req.user
    });
};


/***********************************************************************
CREAR UN USUARIO
************************************************************************/
function saveUser(req, res) {

    // Crear objeto usuario
    var user = new User();

    // Recoger parametros
    var params = req.body;

    if (params.password && params.name && params.surname && params.email && params.address) {

        // Asignar valoresal objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.address = params.address;
        user.email = params.email;


        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al comprobar usuario'
                });
            } else {
                if (!issetUser) {

                    bcrypt.hash(params.password, null, null, function(err, hash) {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: 'Error al guardar usuario'
                                });
                            } else {

                                if (!userStored) {
                                    res.status(404).send({
                                        message: 'No se ha registrado el usuario'
                                    });
                                } else {

                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }

                        });
                    });
                } else {
                    res.status(400).send({
                        message: 'El usuario con ese email ya existe'
                    });
                }
            }
        });



    } else {
        res.status(400).send({
            message: 'Introduce los datos correctamente'
        });
    }

};



/***********************************************************************
LOGIN
************************************************************************/
function login(req, res) {

    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar usuario'
            });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {

                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {

                            res.status(200).send({
                                user
                            });
                        }

                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse'
                        });
                    }
                });
            } else {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            }
        }
    });
}



/***********************************************************************
ACTUALIZAR UN USUARIO
************************************************************************/
function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({
            message: 'No tienes permisos para actualizar el usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
};



module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser
};