const mongoose = require('mongoose');
const { Schema } = mongoose;

//Clubes : River, Flamengo, Barcelona, Real Madrid, Psg, Monaco, Leister city, Arsenal, Maschester United, Manchester city
//Selecciones : Argentina, Brasil, España, Alemania, Francia

const ClubData = Schema({
    team : String,
    dt : String,
    stadium : String,
    players : {
        gk : [String],
        def : [String],
        med : [String],
        del : [String]
    }
});

module.exports = mongoose.model('ClubDatos', ClubData);



