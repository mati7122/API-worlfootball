const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchData = Schema({
    gameTime : String,
    referee : {
        name: String,
        nationality: String
    }
})

module.exports = mongoose.model('MatchData', MatchData);