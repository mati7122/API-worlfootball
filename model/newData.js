const mongoose = require('mongoose');
const { Schema } = mongoose;

const newData = Schema({
    author : String, 
    title : String,
    img : String,
    date : { type: Date, default: Date.now },
    content : String
})

module.exports = mongoose.model('NewModel', newData);