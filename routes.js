const controller = require('./controller');

const express = require('express');

const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir : './uploadImages' });

//routes test
router.get('/test', controller.test);

//routes clubData
router.post('/save-data', controller.save); //CHECK
router.post('/stadium-data/:id', controller.saveStadiumData);
router.get('/one-data/:id', controller.getOne) //CHECK
router.get('/all-data', controller.getAll); //CHECK
router.post('/upload-image/:id', md_upload , controller.uploadImage); //CHECK
router.get('/get-image/:image', controller.getImage); //CHECK

//routes matchData
router.post('/save-match', controller.saveMatch); //CHECK
router.get('/one-match/:id', controller.getOneMatch); //CHECK
router.get('/all-match', controller.getAllMatch); //CHECK

//routes newData
router.post('/save-new', controller.newSave); //CHECK
router.get('/get-one-new/:id', controller.newGetOneData); //CHECK
router.get('/get-news', controller.newsGetAllData); //CHECK

module.exports = router;