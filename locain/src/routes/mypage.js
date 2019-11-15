var express = require('express');
var router = express.Router();

const mypageController = require('../controller/mypageController');

router.post('/reservation/:reservationIdx/imod', mypageController.postMyImod);
router.get('/reservation/:reservationIdx/imod', mypageController.getMyImod);
router.get('/reservation/:reservationIdx', mypageController.getMyReservation);
router.get('/userLike', mypageController.getMyUserLike);
router.get('/', mypageController.getMypage);


module.exports = router;