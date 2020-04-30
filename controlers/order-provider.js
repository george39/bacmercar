'use strict'

var OrderProvider = require('../models/order-provider');



/***********************************************************************
CREAR UNA ORDEN DE UN PROVEEDOR
************************************************************************/
function saveOrderProvider(req, res) {

    var orderProvider = new OrderProvider();
    var params = req.body;

    if (params.nameProduct) {
        orderProvider.providerId = params.providerId;
        orderProvider.nameProduct = params.nameProduct;
        orderProvider.quantity = params.quantity;
        orderProvider.price = params.price;


        orderProvider.save((err, orderProviderSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear el pedido'
                });
            } else {
                if (!orderProviderSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear el pedido'
                    });
                } else {
                    res.status(200).json({
                        order: orderProviderSave
                    });
                }
            }
        });

    }
}




/***********************************************************************
ACTUALIZAR UN PRODUCTO
************************************************************************/
function updateOrderProvider(req, res) {

    var orderProviderId = req.params.id;
    var update = req.body;

    OrderProvider.findByIdAndUpdate(orderProviderId, update, { new: true }, (err, orederUpdate) => {
        if (err) {

            res.status(500).json({
                message: 'Error al actualizar orden proveedor'
            });
        } else {
            if (!orederUpdate) {
                res.status(404).json({
                    message: 'No se ha podido  actualizar orden proveedor'
                });
            } else {
                res.status(200).json({
                    orderProvider: orederUpdate
                });
            }
        }
    });
}


/***********************************************************************
LISTAR TODAS LAS ORDENES
************************************************************************/
function getOrderProvider(req, res) {

    OrderProvider.find((err, orderProvider) => {

        if (err) {

            res.status(500).json({
                message: 'Error al listas las ordenes'
            });
        } else {
            if (!orderProvider) {
                res.status(404).json({
                    message: 'No se han obtenido resultados'
                });
            } else {
                res.status(200).json({

                    orderProvider: orderProvider
                });
            }
        }
    });
}



/***********************************************************************
ELIMINAR UN PEDIDO
************************************************************************/
function deleteOreder(req, res) {
    var orderId = req.params.id;

    OrderProvider.findByIdAndRemove(orderId, (err, orderDelete) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar el pedido'
            });
        } else {
            if (!orderDelete) {
                res.status(404).json({
                    message: 'No se ha podio eliminar el pedido'
                });
            } else {
                res.status(200).json({
                    orderProvider: orderDelete
                });
            }
        }
    });
}

module.exports = {
    saveOrderProvider,
    updateOrderProvider,
    getOrderProvider,
    deleteOreder
};