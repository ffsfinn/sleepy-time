const Sleeptime = require('../models/sleep');
const Sleepuser = require('../models/user');

module.exports = {
    index,
    create,
    show,
    delete: deleteTime
};

function index(req, res) {
    Sleepuser.findById(req.user._id)
        .populate('sleepTimes')
        .exec((error, user) => {
            if (error) throw new Error(error)
            res.render('sleepy/main', {
                user: user
        });
    });
}

async function create(req, res) {
    try {
        console.log(req.params.userId)
        let sleep = new Sleeptime(req.body);
        const newSleepTime = await sleep.save()
        const user = await Sleepuser.findById(req.params.userId)
        const populated = await user.sleepTimes.push(newSleepTime)
        await user.save()
        res.redirect('/sleepy')
    } catch (error) {
        res.send('FAIL')

    }
}

function show(req, res) {
    Sleeptime.findById(req.params.id, function(err, sleepy){
        res.render('sleepy/new', {
            user: req.user,
            sleepy
        });
    });
}

async function deleteTime(req, res) {
    try {
        const time = await Sleepuser.findById(req.user._id)
        const deleted = await time.sleepTimes.pull(req.params.id)
        const result = await time.save()
        res.status(200) // status OK and good
        res.redirect('/sleepy');
    } catch(error) {
        console.error(error)
        res.status(500) // Returns an Error
        res.send('server error')
    }
}

