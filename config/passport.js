const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Sleepuser = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb){
    Sleepuser.findOne({googleId: profile.id}, function(err, sleepUser){
        if(err) return cb(err);
        if(sleepUser) {
            return cb(null, sleepUser);
        } else {
            let newSleepUser = new Sleepuser({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newSleepUser.save(function(err){
                if(err) return cb(err);
                return cb(null, newSleepUser);
            })
        }
    });
}));

passport.serializeUser(function(sleepUser, done){
    done(null, sleepUser.id);
});

passport.deserializeUser(function(id, done){
    Sleepuser.findById(id, function(err, sleepUser){
        done(err, sleepUser);
    });
});
