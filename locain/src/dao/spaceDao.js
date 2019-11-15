const mysql = require('../library/mysql');

async function selectSpaceByIdx(spaceIdx) {
    const selectSql = `SELECT * FROM space WHERE spaceIdx = ?`
    return await mysql.query(selectSql, [spaceIdx]);
}

module.exports = {
    selectSpaceByIdx
}