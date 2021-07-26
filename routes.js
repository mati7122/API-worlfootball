const controller = require('./controller');

const express = require('express');

const router = express.Router();

//routes
router.get('/test', controller.test);
router.get('/test2', controller.test2);
router.post('/test3', controller.test3);
router.post('/save-data', controller.save);

module.exports = router;