'use strict'

var OrderClient = require('../models/order-client');


/***********************************************************************
GUARDAR UN PEDIDO DE UN CLIENTE
************************************************************************/
function saveOrderClient(req, res) {

    var orderClient = new OrderClient();
    var params = req.body;


    if (params.userId) {
        orderClient.userId = params.userId;
        orderClient.productId = params.productId;
        orderClient.detail = params.detail;
        orderClient.price = params.price;

        orderClient.save((err, orderSave) => {
            if (err) {

                res.status(500).json({
                    message: 'Error al crear el pedido'
                });
            } else {
                if (!orderSave) {
                    res.status(404).json({
                        message: 'No se ha podido crear el pedido'
                    });
                } else {
                    res.status(200).json({
                        orderClient: orderSave
                    });
                }
            }
        });

    }

}



/************************************************************
LISTAR TODOS LOS PEDIDOS DE CLIENTES
*************************************************************/
function getOrderClient(req, res) {


    OrderClient.find((err, orderClient) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener los pedidos'
            });
        } else {
            if (!orderClient) {
                res.status(404).json({
                    message: 'No se ha podido obtener ningun pedido'
                });
            } else {
                res.status(200).json({
                    orderClient: orderClient
                });
            }
        }
    });

}



/************************************************************
ACTUALIZAR UN PEDIDO
*************************************************************/
function updateOrderClient(req, res) {

    var orderClientId = req.params.id;
    var update = req.body;

    OrderClient.findByIdAndUpdate(orderClientId, update, { new: true }, (err, orderUpdate) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar el pedido'
            });
        } else {
            if (!orderUpdate) {
                res.status(404).json({
                    message: 'No se ha podido actualizar el pedido'
                });
            } else {
                res.status(200).json({
                    orderClient: orderUpdate
                });
            }
        }
    });

}


/************************************************************
ELIMINAR UN PEDIDO DE UN CLIENTE
*************************************************************/
function deleteOrderClient(req, res) {

    var orderClientId = req.params.id;

    OrderClient.findByIdAndDelete(orderClientId, (err, orderDelete) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar el usuario'
            });
        } else {
            if (!orderDelete) {
                res.status(404).json({
                    message: 'No se ha podido eliminar el pedido'
                });
            } else {
                res.status(200).json({
                    orderClient: orderDelete
                });
            }
        }


    });

}

module.exports = {
    saveOrderClient,
    getOrderClient,
    updateOrderClient,
    deleteOrderClient
};