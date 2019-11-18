const likeDao = require('../dao/likeDao')

async function postLike(userIdx, spaceIdx) {
    const likeState = await likeDao.selectLikeByUserIdxAndSpaceIdx(userIdx, spaceIdx);
    if(likeState.length > 0) {
        if(likeState[0].userLikeOn == 1){
            await likeDao.updateLikeOffByUserIdxAndSpaceIdx(userIdx, spaceIdx);
            return {likeOn : 0}
        } else {
            await likeDao.updateLikeOnByUserIdxAndSpaceIdx(userIdx, spaceIdx);
            return {likeOn : 1}
        }
    } else {
        await likeDao.insertLikeByUserIdxAndSpaceIdx(userIdx, spaceIdx);
        return {likeOn : 1}
    }
}

module.exports = {
    postLike
}