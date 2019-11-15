const mysql = require('../library/mysql');

async function insertUser(userData) {
    const insertSql = `INSERT INTO user (userName, userBirth, userForeigner, userGender, userPhone, userEmail, userPassword) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    return await mysql.query(insertSql, userData);
}
async function selectUserByEmail(userEmail) {
    const selectSql = `SELECT * FROM user WHERE userEmail = ?;`;
    return await mysql.query(selectSql, [userEmail]);
}
async function selectUserByEmailPassword(userData) {
    const selectSql = `SELECT * FROM user WHERE userEmail = ? AND userPassword = ?`;
    return await mysql.query(selectSql, userData);
}
async function deleteAllUserLocation(userIdx) {
    const deleteSql = `DELETE FROM userLocation WHERE userIdx = ?`
    return await mysql.query(deleteSql, [userIdx]);
}
async function deleteAllUserTag(userIdx) {
    const deleteSql = `DELETE FROM userTag WHERE userIdx = ?`
    return await mysql.query(deleteSql, [userIdx]);
}
async function insertUserLocation(userIdx, userLocation) {
    const insertSql = `INSERT INTO userLocation (userIdx, userLocationContent) VALUES (?, ?)`
    return await mysql.query(insertSql, [userIdx, userLocation]);
}
async function insertUserTag(userIdx, userTag) {
    const insertSql = `INSERT INTO userTag (userIdx, userTagContent) VALUES (?, ?)`
    return await mysql.query(insertSql, [userIdx, userTag]);
}
async function selectUserByIdx(userIdx) {
    const selectSql = `SELECT * FROM user WHERE userIdx = ?;`;
    return await mysql.query(selectSql, [userIdx]);
}

module.exports = {
    insertUser,
    selectUserByEmail,
    selectUserByEmailPassword,
    deleteAllUserLocation,
    deleteAllUserTag,
    insertUserLocation,
    insertUserTag,
    selectUserByIdx
}