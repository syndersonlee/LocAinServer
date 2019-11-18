const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');
const { sign, verify } = require('../library/jwt');

const searchService = require('../service/searchService');

async function getSearch(req, res) {
    try {
        const searchRank = await searchService.getSearch();
        console.log('검색창 성공');
        response(res, returnCode.OK, '검색창 성공', searchRank);
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function getSearchResult(req, res) {
    try {
        const userIdx = verify(req.headers.authorization);
        const searchResult = await searchService.getSearchResult(req.query);
        if(userIdx < 0){
            console.log('토큰 오류');
            errResponse(res, returnCode.UNAUTHORIZED, '토큰 오류');
        } else {
            console.log('검색리스트 성공');
            response(res, returnCode.OK, '검색리스트 성공', getSearchResult);
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    getSearch,
    getSearchResult
}