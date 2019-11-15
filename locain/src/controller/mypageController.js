const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');
const { sign, verify } = require('../library/jwt');

const mypageService = require('../service/mypageService');

async function getMypage(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            console.log('마이페이지 성공');
            const getMypage = await mypageService.getMypage(userIdx.idx);
            response(res, returnCode.OK, '마이페이지 성공', getMypage);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function getMyUserLike(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            const getMyUserLike = await mypageService.getMyUserLike(userIdx.idx);
            response(res, returnCode.OK, '찜한공간 성공', getMyUserLike);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function getMyReservation(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const getMyReservation = await mypageService.getMyReservation(req.params.reservationIdx); 
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else if(getMyReservation.length == 0){
            console.log('예약현황 오류');
            errResponse(res, returnCode.BAD_REQUEST, '예약현황 오류');
        } 
        else {
            console.log('예약현황 성공');
            response(res, returnCode.OK, '예약현황 성공', getMyReservation);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function getMyImod(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const getMyImod = await mypageService.getMyImod(req.params.reservationIdx); 
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else if(getMyImod == undefined){
            console.log('예약현황 오류');
            errResponse(res, returnCode.BAD_REQUEST, '예약현황 오류');
        } 
        else {
            console.log('imod 예약 페이지 성공');
            response(res, returnCode.OK, 'imod 예약 페이지 성공', getMyImod);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function postMyImod(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const postMyImod = await mypageService.postMyImod(req.params.reservationIdx); 
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else if(postMyImod == undefined){
            console.log('예약현황 오류');
            errResponse(res, returnCode.BAD_REQUEST, '예약현황 오류');
        } 
        else {
            console.log('imod 호출 성공');
            response(res, returnCode.OK, 'imod 호출 성공', postMyImod);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    getMypage,
    getMyUserLike,
    getMyReservation,
    getMyImod,
    postMyImod
}