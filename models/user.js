const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    sleepTimes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Sleeptime'
        }
    ]
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Sleepuser', userSchema);