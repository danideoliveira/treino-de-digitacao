// Criar modo treino
exports.setTrainingMode = (req, res) => {
    res.render('trainingMode');
};

// Criar configurações de modo cronometrado
exports.setTimerSettings = (req, res) => {
    res.render('timerSettings');
};

// Criar modo cronometrado
exports.setTimerMode = (req, res) => {
    res.render('timerMode', { time: req.body.time });
};
