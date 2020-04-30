'use strict'

exports.isAdmin = function(req, res, next) {
    if (req.user.role != 'ADMIN_ROLE') {
        return res.status(500).json({
            message: 'No tienes acceso a esta zona'
        });
    }
    next();
};