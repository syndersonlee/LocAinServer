const mysql = require('../library/mysql');

async function selectSpaceByIdx(spaceIdx) {
    const selectSql = `SELECT * FROM space WHERE spaceIdx = ?`
    return await mysql.query(selectSql, [spaceIdx]);
}

async function selectSpaceByTopReservation() {
    const selectSql = `SELECT * FROM space ORDER BY spaceReserveNum DESC LIMIT 3`
    return await mysql.query(selectSql, []);
}


async function selectSpaceByTopSearch() {
    const selectSql = `SELECT * FROM space ORDER BY spaceIndex DESC LIMIT 3`
    return await mysql.query(selectSql, []);
}

async function selectAllSpace() {
    const selectSql = `SELECT * FROM space`
    return await mysql.query(selectSql, []);
}
module.exports = {
    selectSpaceByIdx,
    selectSpaceByTopReservation,
    selectSpaceByTopSearch,
    selectAllSpace
}