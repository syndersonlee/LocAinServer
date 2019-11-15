var express = require('express');
var router = express.Router();

var mainController = require('../controller/mainController');

router.get('/', mainController.getMain);

module.exports = router;