const { Router } = require('express');
const route = Router();
const userCtrl = require('../controllers/user.controller');

// route.get('/', userCtrl.listUsers);
route.post('/register', userCtrl.registerUser);
route.post('/login', userCtrl.login);

module.exports = route;
