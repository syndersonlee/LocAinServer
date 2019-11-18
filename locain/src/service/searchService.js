const userDao = require('../dao/userDao');
const reservationDao = require('../dao/reservationDao');
const spaceDao = require('../dao/spaceDao');
const userTagDao = require('../dao/userTagDao');
const spaceTagDao = require('../dao/spaceTagDao');
const userLikeDao = require('../dao/userLikeDao');
const searchRankDao = require('../dao/searchRankDao')

async function getSearch() {
    const searchList = await searchRankDao.selectSearchRank();
    let searchParsedList = [];
    await Promise.all(searchList.map((data) => {
        searchParsedList.push({keyword : data.searchContent});
    }))
    return searchParsedList;
}

async function getSearchResult(queryData) {
    const spaceAllList = await spaceDao.selectAllSpace();
    let spaceShowList = []
    await Promise.all(spaceAllList.map((data) => {
        let fitQuery = true;
        if(queryData.keyword != undefined){
            if(data.spaceName.search(queryData.keyword) == -1){
                fitQuery = false;
            }
        }
        if(queryData.minprice > data.spacePrice){
            fitQuery = false;
        }
        if(queryData.maxprice > data.spacePrice){
            fitQuery = false;
        }
        if(queryData.num < data.spaceContainMin){
            fitQuery = false;
        }
        if(queryData.num > data.spaceContainMax){
            fitQuery = false;
        }
        if(fitQuery){
            spaceShowList.push(data);
        }
    }))
    return spaceShowList;
}

module.exports = {
    getSearch,
    getSearchResult
}