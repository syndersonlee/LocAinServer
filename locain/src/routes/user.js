var express = require('express');
var router = express.Router();

const userController = require('../controller/userController');
//회원가입
router.post('/signup', userController.postUserSignup);
//로그인
router.post('/signin', userController.postUserSignin);
//추가정보기입
router.post('/additional', userController.postUserAdditional);
module.exports = router;