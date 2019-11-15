const mysql = require('../library/mysql');

async function selectUserLikeByUserIdx(userIdx) {
    const selectSql = `SELECT * FROM userLike WHERE userIdx = ? AND userLikeOn = 1`;
    return await mysql.query(selectSql, [userIdx]);
}

module.exports = {
    selectUserLikeByUserIdx
}