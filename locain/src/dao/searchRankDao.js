const mysql = require('../library/mysql');

async function selectSearchRank() {
    const selectSql = `SELECT searchContent FROM searchRank ORDER BY searchIndex DESC LIMIT 5`
    return await mysql.query(selectSql, []);
}

module.exports = {
    selectSearchRank
}