const mysql = require('../library/mysql');

async function selectSpaceTagBySpaceIdx(spaceIdx) {
    const selectSql = `SELECT * FROM spaceTag WHERE spaceIdx = ?`
    return await mysql.query(selectSql, [spaceIdx]);
}

module.exports = {
    selectSpaceTagBySpaceIdx
}