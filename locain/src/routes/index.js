var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/main', require('./main'));
// router.use('/space', require('./space'));
router.use('/search', require('./search'));
router.use('/like', require('./like'));
router.use('/mypage', require('./mypage'));


module.exports = router;
