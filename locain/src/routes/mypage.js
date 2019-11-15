var express = require('express');
var router = express.Router();

const mypageController = require('../controller/mypageController');

router.get('/reservation/:reservationIdx', mypageController.getMyReservation);
router.get('/userLike', mypageController.getMyUserLike);
router.get('/', mypageController.getMypage);


module.exports = router;