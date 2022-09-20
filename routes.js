const express = require('express');
const route = express.Router();
const timerController = require('./src/controllers/timerController');
const menuController = require('./src/controllers/menuController');

// Rota Menu
route.get('/', menuController.setMenu);

// Rota configurações de Timer
route.get('/timer-settings', timerController.setTimerSettings)

// Rotas Timer
route.post('/timer-on', timerController.setTimer);
route.get('/timer-off', timerController.removeTimer);

module.exports = route;