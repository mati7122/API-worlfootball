const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/world_football", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("La conexion a la base de datos ah sido exitosa");
        })
}

module.exports = connectDB;
