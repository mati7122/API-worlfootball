//cargar modulos node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

//ejecutar express(http)
const app = express();

//cargar ficheros rutas
const dateRoutes = require('fichero de rutas')

//Middlewares
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {

});

//añadir prefijo a rutas
app.use('/api' , rutas)

//exportar modulo
module.exports = app;