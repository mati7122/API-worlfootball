const fs = require('fs');
const path = require('path');
const { send } = require('process');

const Team = require('./model/clubData');
const MatchData = require('./model/matchData');
const New = require('./model/newData');

const teamModel = new Team();
const newModel = new New();

const controller = {

    //Pruebas

    test: (req, res) => {
        res.status(200).send({
            message: 'Ruta de prueba'
        })
    },

    //CLUBDATA

    save: (req, res) => {

        let params = req.body;

        //Recojo los datos

        teamModel.team = params.team;
        teamModel.dt = params.dt;
        // teamModel.stadium.nameStadium = params.nameStadium;
        // teamModel.stadium.capacity = params.capacity;
        // teamModel.stadium.ubication = params.ubication;
        teamModel.players.gk.push(params.gk);
        teamModel.players.def.push(params.def);
        teamModel.players.med.push(params.med);
        teamModel.players.del.push(params.del);

        //Guardado 

        teamModel.save(() => {
            res.status(200).send({
                message: 'Los datos han sido guardados con éxito'
            })
        })
    },

    saveStadiumData: (req, res) => {

        let id = req.params.id;

        let newNameStadium = req.body.nameStadium;
        let newCapacity = req.body.capacity;
        let newUbication = req.body.ubication;

        Team.findOneAndUpdate({ _id: id }, { 
            $push: {
                'stadium': {
                    nameStadium: newNameStadium,
                    capacity: newCapacity,
                    ubication: newUbication
                }
            }
         }, (err) => {
             if(err){
                 return res.status(500).send({
                     status: 'error',
                     message: 'Los datos han sido guardads con éxito'
                 });
             }
             else {
                 return res.status(200).send({
                     status: 'succes',
                     message: 'Los datos han sido guardados con éxito'
                 })
             }
         })

    },

    getOne: (req, res) => {
        let articleId = req.params.id;

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay datos para mostrar'
            });
        }

        Team.findById(articleId, (err, article) => {
            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            return res.status(200).send({
                status: 'succes',
                article
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

    },

    uploadImage: (req, res) => {

        //escudo
        let file_path_shield = req.files.team.path;
        let file_separate_shield = file_path_shield.split('\\');
        let file_nameAndExtension_shield = file_separate_shield[1];
        let file_split_shield = file_nameAndExtension_shield.split('.');
        let file_ext_shield = file_split_shield[1];

        //estadio
        let file_path_stadium = req.files.stadium.path;
        let file_separate_stadium = file_path_stadium.split('\\');
        let file_nameAndExtension_stadium = file_separate_stadium[1];
        let file_split_stadium = file_nameAndExtension_stadium.split('.');
        let file_ext_stadium = file_split_stadium[1]


        if ((file_ext_shield != 'png' && file_ext_shield != 'jpg' && file_ext_shield != 'jpeg') || (file_ext_stadium != 'png' && file_ext_stadium != 'jpg' && file_ext_stadium != 'jpeg')) {

            let files = [
                file_nameAndExtension_shield,
                file_nameAndExtension_stadium
            ]

            // fs.unlink(files.map(file => ), (err) => {
            //     return res.status(500).send({
            //         status: 'error',
            //         message: 'La extension del archivo no es valida'
            //     });
            // });

            Promise.all(files.map(file => fs.unlink(file)))
                .catch(err => {
                    return res.status(500).send({
                        status: 'error',
                        message: 'La extension del archivo no es valida'
                    })
                })

            // fs.unlink(file_nameAndExtension_stadium, (err) => {
            //     return res.status(500).send({
            //         status: 'error',
            //         message: 'La'
            //     })
            // })
        }

        // if(file_ext_stadium != 'png' && file_ext_stadium != 'jpg' && file_ext_stadium != 'jpeg'){
        //     fs.unlink(file_nameAndExtension_stadium, (err) => {
        //         return res.status(500).send({
        //             status: 'error',
        //             message: 'La extension del archivo no es valida'
        //         })
        //     })
        // }

        // else{ 
        //     var articleId = req.params.id;

        //     Team.findOneAndUpdate({_id: articleId}, {teamImg: file_nameAndExtension_shield, stadium : { img: file_nameAndExtension_stadium }}, {new: true} , (err, articleUpdated) => {
        //         if(err || !articleUpdated){
        //             return res.status(500).send({
        //                 status: 'error',
        //                 message: 'Error al guardar la imagen'
        //             });
        //         }

        //         return res.status(200).send({
        //             status: 'succes',
        //             teamModel : articleUpdated
        //         });
        //     })
        // }
        else {
            let articleId = req.params.id;

            Team.updateOne({ _id: articleId }, { teamImg: file_nameAndExtension_shield ,$push: { 'stadium': { img: file_nameAndExtension_stadium } } }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la imagen'
                    });
                }
                return res.status(200).send({
                    status: 'succes',
                    teamModel: articleUpdated
                })
            })
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        console.log(file)
        var path_file = './uploadImages/' + file;
        console.log(path_file);

        if (fs.existsSync(path_file)) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            res.status(404).send({
                message: 'No se encuentra el archivo'
            });
        }

    },

    //MATCHDATA

    saveMatch: (req, res) => {
        let params = req.body;

        let matchModel = new MatchData();

        matchModel.gameTime = params.gameTime;
        matchModel.referee.name = params.name
        matchModel.referee.nationality = params.nationality;

        matchModel.save(() => {
            res.status(200).send({
                message: 'Los datos han sido guardados con éxito'
            })
        })
    },

    getOneMatch: (req, res) => {
        let id = req.params.id;

        if (!id || id == null) {
            res.status(404).send({
                message: 'No hay datos para mostrar'
            })
        }

        MatchData.findById(id, (error, data) => {
            if (error) {
                res.status(404).send({
                    message: 'Datos inexistentes'
                })
            }
            if (data) {
                res.status(200).send({
                    message: 'succes',
                    data
                })
            }
        })
    },

    getAllMatch: (req, res) => {

        MatchData.find({}).exec((err, resData) => {
            if (err) {
                res.status(404).send({
                    message: 'No hay datos para mostrar'
                })
            }
            if (resData) {
                res.status(200).send({
                    message: 'Succes',
                    resData
                })
            }
        })
    },

    //NEWDATA

    newSave: (req, res) => {
        let params = req.body;

        newModel.author = params.author;
        newModel.title = params.title;
        newModel.content = params.content;

        newModel.save(() => {
            res.status(200).send({
                message: 'Los datos han sido guardados con éxito'
            })
        })

    },

    newsGetAllData: (req, res) => {

        New.find({}).exec((err, data) => {
            if (err) {
                res.status(404).send({
                    message: 'No hay datos para mostrar'
                })
            }
            if (data) {
                res.status(404).send({
                    message: 'succes',
                    data
                })
            }
        })
    },

    newGetOneData: (req, res) => {
        let id = req.params.id;

        if (!id || id == null) {
            res.status(404).send({
                message: 'No hay datos para mostrar'
            })
        }

        New.findById(id, (err, data) => {
            if (err) {
                res.status(404).send({
                    message: 'Datos inexistentes'
                });
            }

            if (data) {
                res.status(200).send({
                    message: 'succes',
                    data
                })
            }
        })
    }
}

module.exports = controller;