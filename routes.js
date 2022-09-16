const express = require('express');
const route = express.Router();
const timerController = require('./src/controllers/timerController');

// Rotas Timer
route.get('/timer-on', timerController.setTimer);
route.get('/timer-off', timerController.removeTimer);

module.exports = route;