const { Router } = require('express');
const { createTransfer, getAllTransfer, updateTransferStatus, deleteTransfer, getTransferHistory } = require('../controllers/transfer.controller');
const { authenticationMiddleware, authorizationMiddleware } = require('../middleware/auth')

const transferReqRoute = Router();

transferReqRoute.post('/', authorizationMiddleware({ role : ['maker', 'approver', 'admin']}), createTransfer);
transferReqRoute.get('/', authorizationMiddleware({ role: ['maker', 'approver', 'admin'] }), getAllTransfer);
transferReqRoute.get('/history', authorizationMiddleware({ role: ['admin'] }), getTransferHistory);
transferReqRoute.patch('/:id', authorizationMiddleware({ role: ['approver', 'admin'] }), updateTransferStatus);
transferReqRoute.delete('/:id', authorizationMiddleware({ role: ['admin'] }), deleteTransfer);

module.exports = transferReqRoute;