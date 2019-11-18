var express = require('express');
var router = express.Router();

var likeController = require('../controller/likeController');

router.post('/:spaceIdx', likeController.postLike);

module.exports = router;