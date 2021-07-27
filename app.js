const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbconnection');

connectDB();

app = express();

//import routes
const routes = require('./routes');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//load routes
app.use('/api', routes);

module.exports = app;

