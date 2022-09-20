exports.setTimerMode = (req, res) => {
    res.render('timerMode', { time: req.body.time });
};

exports.setTrainingMode = (req, res) => {
    res.render('trainingMode');
};

exports.setTimerSettings = (req, res) => {
    res.render('timerSettings');
};