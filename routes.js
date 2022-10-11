import { Router } from 'express';
const route = Router();
import { setTimerSettings, setTimerMode, setTrainingMode } from './src/controllers/timerController.js';
import { setMenu } from './src/controllers/menuController.js';

// Rota - Menu
route.get('/', setMenu);

// Rota - Configurações de Timer
route.get('/timer-settings', setTimerSettings);

// Rotas - Modos de Jogo
route.post('/timer-mode', setTimerMode);
route.get('/training-mode', setTrainingMode);

export default route;