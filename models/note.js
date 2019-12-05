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
    sleepNotes: {
        type: Schema.Types.ObjectId,
        ref: 'Sleepnote'
    },
    submitted: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Sleepnote', sleepNote);