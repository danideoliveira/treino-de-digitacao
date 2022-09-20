const express = require('express');
const route = express.Router();
const timerController = require('./src/controllers/timerController');
const menuController = require('./src/controllers/menuController');

// Rota Menu
route.get('/', menuController.setMenu);

// Rota configurações de Timer
route.get('/timer-settings', timerController.setTimerSettings)

// Rotas Modo de Jogo
route.post('/timer-mode', timerController.setTimerMode);
route.get('/training-mode', timerController.setTrainingMode);

module.exports = route;