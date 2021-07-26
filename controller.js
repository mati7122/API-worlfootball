
const Team = require('./Modelo/model');

const controller = {

    //Pruebas

    test: (req, res) => {
        res.status(200).send({
            message: 'Ruta de prueba Nº1'
        })
    },

    test2: (req, res) => {
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

        //Recojo los datos

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
    },

    getAll: (req, res) => {

        Team.find({}).exec((err, data) => {
            if (err) {
                res.status(200).send({
                    status: 'error',
                    message: 'no se ah podido realizar la peticion'
                });
            }

            if (data) return res.status(200).send({
                status: 'succes',
                data
            })
        });

    }
}

module.exports = controller;