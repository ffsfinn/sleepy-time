const Sleeptime = require('../models/sleep');
const Sleepuser = require('../models/user');
const Sleepnote = require('../models/note');

module.exports = {
    index,
    create,
    show
};

function index(req, res) {
    Sleeptime.findById(req.user._id)
        .populate('sleepNotes')
        .exec((error, time) => {
            if (error) throw new Error(error)
            res.render('sleepy/main', {
                time: time
        });
    });
}

async function create(req, res) {
    try {
        console.log(req.params.userId)
        let note = new Sleepnote(req.body);
        const newSleepNote = await note.save()
        const time = await Sleeptime.findById(req.params.userId)
        const populated = await time.sleepNotes.push(newSleepNote)
        await time.save()
        res.redirect('/sleepy')
    } catch (error) {
        res.send("FAILURE")

    }
}

function show(req, res) {
    Sleeptime.findById(req.params.id, function(err, sleepy){
        res.render('sleepy/notes', {
            user: req.user,
            sleepy
        });
    });
}