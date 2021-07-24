const mongoose = require('mongoose');

const port = 3700;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log("La conexion a la base de datos se ah realizado con exito!");
    })