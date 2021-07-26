const mongoose = require('mongoose');
const port = 3200;
const app = require('./app');

mongoose.connect('mongodb+srv://matiash:matiash@carsdb.290x4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexion ah la base de datos ah sido establecida')

        app.listen(port, () => {
            console.log(`Servidor corriendo en puerto ${port}`)
        })
    })



