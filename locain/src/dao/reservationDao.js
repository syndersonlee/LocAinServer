const mysql = require('../library/mysql');

async function selectReservationByUserIdx(userIdx) {
    const selectSql = `SELECT * FROM reservation WHERE userIdx = ?`
    return await mysql.query(selectSql, [userIdx]);
}

async function selectReservationByIdx(reservationIdx) {
    const selectSql = `SELECT * FROM reservation WHERE reservationIdx = ?`
    return await mysql.query(selectSql, [reservationIdx]);
}


module.exports = {
    selectReservationByUserIdx,
    selectReservationByIdx
}