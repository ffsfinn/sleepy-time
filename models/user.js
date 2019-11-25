const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepUser = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Sleepuser', sleepUser);