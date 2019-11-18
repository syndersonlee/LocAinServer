const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');
const { sign, verify } = require('../library/jwt');

const likeService = require('../service/likeService');

async function postLike(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const likeState = await likeService.postLike(userIdx.idx, req.params.spaceIdx);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            console.log('좋아요/취소 요청 성공');
            response(res, returnCode.OK, '좋아요/취소 요청 성공', likeState);
        
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}


module.exports = {
    postLike
}