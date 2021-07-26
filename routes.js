const controller = require('./controller');

const express = require('express');

const router = express.Router();

//routes test
router.get('/test', controller.test);
router.get('/test2', controller.test2);
router.post('/test3', controller.test3);

//routes 
router.post('/save-data', controller.save);
router.get('/all-data', controller.getAll);

module.exports = router;