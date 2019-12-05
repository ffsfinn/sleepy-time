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
        console.log('THIS IS THE TIME ID IN USER ID ::', time)
        const timeDel = await time.sleepTimes.remove(req.params.id)
        console.log('DID IT DELETE? :: ',timeDel)
        timeDel.splice([0])
    } catch(error) {
        res.send('FAIL')
    }

    console.log('USER ID:', req.user._id)
    console.log('ID ???', req.body)
    console.log('ID ???', req.params.body)

    res.redirect('/sleepy');
}

