const mysql = require('../library/mysql');

async function selectSpaceTagBySpaceIdx(spaceIdx) {
    const selectSql = `SELECT * FROM spaceTag WHERE spaceIdx = ?`
    return await mysql.query(selectSql, [spaceIdx]);
}

async function selectSpaceIdxTagBySpaceTagContent(spaceTagContent){
    const selectSql = `SELECT * FROM spaceTag WHERE spaceTagContent = ?`
    return await mysql.query(selectSql, [spaceTagContent]);
}

module.exports = {
    selectSpaceTagBySpaceIdx,
    selectSpaceIdxTagBySpaceTagContent
}