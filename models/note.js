const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepNote = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    submitted: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Sleepnote', sleepNote);