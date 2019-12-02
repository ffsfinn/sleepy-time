const Sleeptime = require('../models/sleep');
const Sleepuser = require('../models/user');

module.exports = {
    index,
    new: newTime,
    create,
    show
};

function index(req, res) {
    Sleeptime.find({}, function(err, time) {
        res.render('sleepy/main', {
            user: req.user,
            time
        });
    });
}

function newTime(req, res) {
    res.render('sleepy/new', {
        user: req.user
    });
}

function create(req, res) {
    res.render('sleepy/new', {
        user: req.user
    });
    let time = new Sleeptime(req.body);
    time.save(function(err){
        if(err) return res.render('sleepy/new');
        res.redirect('sleepy');
    });
}

function show(req, res) {
    Sleeptime.findById(req.params.id, function(err, time){
        res.render('sleepy/show', {
            user: req.user,
            time
        });
    });
}