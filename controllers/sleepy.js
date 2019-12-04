const Sleeptime = require('../models/sleep');
const Sleepuser = require('../models/user');

module.exports = {
    index,
    create,
    show
};

function index(req, res) {
    Sleepuser.findById(req.user._id, function(err, user){
        Sleeptime.findOne(user.sleepTimes[0], function(err, sleepy){
            console.log('USER : ',user)
            console.log("SLEEPY : ", user.sleepTimes)
            res.render('sleepy/main', {
                user,
                sleepy : user.sleepTimes
            });
        });
    });
}

async function create(req, res) {
    try{
        let sleep = new Sleeptime(req.body); // seperate sleeptime
        const newSleepTime = await sleep.save()
        const user = await Sleepuser.findOne(req.params.id)
        const populated = await user.sleepTimes.push(newSleepTime)
        await user.save()
        const party =  await Sleepuser.findById(req.params.id)
            .populate('sleep')
            .exec((error, user) => {
                if (error) throw new Error(error)
                console.log(user)
                res.redirect('/sleepy')
            })
            console.log(party)
    } catch (error ) {
        throw new Error(error)
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