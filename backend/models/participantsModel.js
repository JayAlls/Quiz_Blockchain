const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: String,
    score: Number
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;