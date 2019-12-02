const sleepTime = require('../models/sleep');

module.exports = {
    index
};

function index(req, res) {
    res.render('sleepy', {
        user: req.user
    });
}