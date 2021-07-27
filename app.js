const express = require('express');
const bodyParser = require('body-parser');

app = express();

//import routes
const routes = require('./routes');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//load routes
app.use('/api', routes);

// module.exports = app;
const mongoose = require('mongoose');
const port = 3000;
// const app = require('./app');

mongoose.connect('mongodb+srv://matiash:matiash@carsdb.290x4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexion ah la base de datos ah sido establecida')

        app.listen(port, () => {
            console.log(`Servidor corriendo en puerto ${port}`)
        })
    })
