const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');
const { sign, verify } = require('../library/jwt');

const mainService = require('../service/mainService');

async function getMain(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const mainData = await mainService.getMain(userIdx.idx);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            console.log('메인페이지 성공');
            response(res, returnCode.OK, '메인페이지 성공', mainData);
        
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}


module.exports = {
    getMain
}