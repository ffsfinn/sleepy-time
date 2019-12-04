const Sleeptime = require('../models/sleep');
const Sleepuser = require('../models/user');

module.exports = {
    index,
    create,
    show
};

async function index(req, res) {
            // console.log('USER : ',user)
            // console.log("SLEEPY : ", user.sleepTimes)
            Sleepuser.findById(req.user._id)
                .populate('sleepTimes')
                .exec((error, user) => {
                    if (error) throw new Error(error)
                    res.render('sleepy/main', {
                        user: user
                    })
            })
}

async function create(req, res) {
    try {
        console.log(req.params.userId)
        let sleep = new Sleeptime(req.body); // seperate sleeptime
        const newSleepTime = await sleep.save()
        const user = await Sleepuser.findById(req.params.userId)
        const populated = await user.sleepTimes.push(newSleepTime)
        // console.log(" controllers/sleepy.js at line 30 : ", populated)
        await user.save()
        res.redirect('/sleepy')
    } catch (error) {
        // throw new Error(error)
        res.send("FAILURE")

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

