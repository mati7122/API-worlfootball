
const Team = require('./Modelo/model');

const controller = {

    //Pruebas

    test: (req, res) => {
        res.status(200).send({
            message: 'Ruta de prueba Nº1'
        })
    },

    test2: (req, res) =>  {
        res.status(200).send({
            message: 'Ruta de prueba Nº2'
        })
    },

    test3: (req, res) => {
        res.status(200).send({
            message: 'Ruta de prueba Nº3'
        })
    },



    save: (req, res) => {

        let params = req.body;

        //Creo una coleccion de datos

        let teamModel = new Team();

        //Recogo los datos

        teamModel.team = params.team;
        teamModel.dt = params.dt;
        teamModel.stadium = params.stadium;
        teamModel.players.gk.push(params.gk);
        teamModel.players.def.push(params.def);
        teamModel.players.med.push(params.med);
        teamModel.players.del.push(params.del);

        //Guardado 

        teamModel.save(() => {
            res.status(200).send({
                message: 'Los datos han sido guardados con exito'
            })
        })
    }
}

module.exports = controller;