const express = require('express');
const route = express.Router();
const { signup, login, refresh, logout } = require('../controler/router/auth');

route.post('/signup',signup);
route.post('/login',login);
route.post('/refresh',refresh);
route.post('/logout',logout);

module.exports = route;