// Criar modo treino
export function setTrainingMode(req, res) {
    res.render('trainingMode');
}

// Criar configurações de modo cronometrado
export function setTimerSettings(req, res) {
    res.render('timerSettings');
}

// Criar modo cronometrado
export function setTimerMode(req, res) {
    res.render('timerMode', { time: req.body.time });
}
