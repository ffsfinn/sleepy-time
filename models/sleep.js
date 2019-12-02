const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepTime = new Schema({
    hours: {
        type: String,
        enum: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']
    },
    day: {
        type: String,
        enum: ['AM', 'PM']
    },
    submit: {
        type: Date
    }
});

module.exports = mongoose.model('Sleeptime', sleepTime);