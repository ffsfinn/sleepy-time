const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Sleepuser = require('../models/user');

passport.use(new GoogleStrategy({
    clientID = process.env.GOOGLE_CLIENT_ID,
    clientSecret = process.env.GOOGLE_SECRET,
    callbackURL = process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb){
    Sleepuser.findOne({googleId: profile.id}, function(err, sleepUser){
        if(err) return cb(err);
        if(sleepUser) {
            return cb(null, sleepUser);
        }
    });
}));