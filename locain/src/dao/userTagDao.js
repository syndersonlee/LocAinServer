const mysql = require('../library/mysql');

async function selectUserTagByUserIdx(userIdx) {
    const selectSql = `SELECT * FROM userTag WHERE userIdx = ?`
    return await mysql.query(selectSql, [userIdx]);
}

module.exports = {
    selectUserTagByUserIdx
}