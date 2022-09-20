exports.setTimer = (req, res) => {
    res.render('indexTimer', { time: req.body.time });
};

exports.removeTimer = (req, res) => {
    res.render('indexNoTimer');
};

exports.setTimerSettings = (req, res) => {
    res.render('timerSettings');
};