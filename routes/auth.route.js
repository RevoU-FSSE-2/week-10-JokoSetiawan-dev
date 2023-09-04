const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller');

const authRoute = Router();

authRoute.post('/register', register)
authRoute.post('/login', login)

module.exports = authRoute
