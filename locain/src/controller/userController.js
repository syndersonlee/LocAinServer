const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');
const { sign, verify } = require('../library/jwt');

const userService = require('../service/userService');

async function postUserSignin(req, res) {
    try {
        const user = await userService.postUserSignin(req.body);
        if(!user){
            console.log('로그인 실패');
            errResponse(res, returnCode.UNAUTHORIZED, '로그인 실패');
        } else {
            console.log(user);
            response(res, returnCode.OK, '로그인 성공', {token : sign(user.userIdx)});
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function postUserSignup(req, res) {
    try {
        const user = await userService.postUserSignup(req.body);

        if(user == 0) {
            errResponse(res, returnCode.BAD_REQUEST, '아이디 중복');
        } else if(user == -1){
            errResponse(res, returnCode.BAD_REQUEST, '회원가입 정보 미기입');
        } else {
            console.log(user);
            response(res, returnCode.OK, '회원가입 성공', {token : sign(user.insertId)});
        }

    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function postUserAdditional(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            console.log('추가정보 성공');
            await userService.postUserAdditional(userIdx.idx,req.body);
            response(res, returnCode.OK, '추가정보 성공');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    postUserSignup,
    postUserSignin,
    postUserAdditional
}