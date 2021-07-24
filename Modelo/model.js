import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClubData = new Schema({
    clubName: String,
    stadium: String,
    match: {
        today: {date: String, Local: String, Visitor: String},
        tomorrow: {date: String, Local: String, Visitor: String},
        next: {date: String, Local: String, Visitor: String}
    },
    new: {
        title: String,
        content: String,
        image: String,
        date: String
    }
});

module.exports = mongoose.model('ClubDatos', ClubData);



