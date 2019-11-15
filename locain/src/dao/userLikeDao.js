const mysql = require('../library/mysql');

async function selectUserLikeByUserIdx(userIdx) {
    const selectSql = `SELECT * FROM userLike WHERE userIdx = ? AND userLikeOn = 1`;
    return await mysql.query(selectSql, [userIdx]);
}

async function selectUserLikeByUserIdxAndSpaceIdx(userIdx, spaceIdx) {
    const selectSql = `SELECT * FROM userLike WHERE userIdx = ? AND spaceIdx = ?`;
    return await mysql.query(selectSql, [userIdx, spaceIdx]); 
}

module.exports = {
    selectUserLikeByUserIdx,
    selectUserLikeByUserIdxAndSpaceIdx
}