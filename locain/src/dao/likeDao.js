const mysql = require('../library/mysql');

async function selectLikeByUserIdxAndSpaceIdx(userIdx, spaceIdx) {
    const selectSql = `SELECT * FROM userLike WHERE userIdx = ? AND spaceIdx = ?`
    return await mysql.query(selectSql, [userIdx, spaceIdx]);
}

async function updateLikeOffByUserIdxAndSpaceIdx(userIdx, spaceIdx) {
    const selectSql = `UPDATE userLike SET userLikeOn = 0 WHERE userIdx = ? AND spaceIdx = ?`
    return await mysql.query(selectSql, [userIdx, spaceIdx]);
}

async function updateLikeOnByUserIdxAndSpaceIdx(userIdx, spaceIdx) {
    const selectSql = `UPDATE userLike SET userLikeOn = 1 WHERE userIdx = ? AND spaceIdx = ?`
    return await mysql.query(selectSql, [userIdx, spaceIdx]);
}

async function insertLikeByUserIdxAndSpaceIdx(userIdx, spaceIdx) {
    const selectSql = `INSERT INTO userLike(userIdx, userLikeOn, spaceIdx) VALUES (?, 1, ?)`
    return await mysql.query(selectSql, [userIdx, spaceIdx]);
}

module.exports = {
    selectLikeByUserIdxAndSpaceIdx,
    updateLikeOffByUserIdxAndSpaceIdx,
    updateLikeOnByUserIdxAndSpaceIdx,
    insertLikeByUserIdxAndSpaceIdx
}