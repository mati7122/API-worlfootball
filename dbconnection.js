const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb+srv://matiash:matiash@carsdb.290x4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("La conexion a la base de datos ah sido exitosa");
        })
}

module.exports = connectDB;
