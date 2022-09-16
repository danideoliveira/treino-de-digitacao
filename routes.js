const express = require('express');
const route = express.Router();
const timerController = require('./src/controllers/timerController');
const menuController = require('./src/controllers/menuController');

// Rota Menu
route.get('/', menuController.setMenu);

// Rotas Timer
route.get('/timer-on', timerController.setTimer);
route.get('/timer-off', timerController.removeTimer);

module.exports = route;