const moment = require('moment');

const userDao = require('../dao/userDao');
const reservationDao = require('../dao/reservationDao');
const spaceDao = require('../dao/spaceDao');
const userTagDao = require('../dao/userTagDao');
const spaceTagDao = require('../dao/spaceTagDao');
const userLikeDao = require('../dao/userLikeDao');

function dDayCalculate(enrolledDate) {
    var nowDate = moment().format('YYYY.MM.DD');
    let date1parsed = nowDate.split('.');
    date1parsed[1] = Number(date1parsed[1]) - 1;
    let date2parsed = enrolledDate.split('.');
    date2parsed[1] = Number(date2parsed[1]) - 1;
    const diffDate = moment(date2parsed).diff(moment(date1parsed), 'days');
    return diffDate;
}

async function getMain(userIdx) {
    const userData = await userDao.selectUserByIdx(userIdx);
    const reservationData = await reservationDao.selectReservationByUserIdx(userIdx);
    let upcomingData = {};
    await Promise.all(reservationData.map(async (data) => {
        const dday = dDayCalculate(data.reservationDate);
        if (dday >= 0 && dday <= 30) {
            if (upcomingData.dday == undefined || upcomingData.dday > dday) {
                const spaceData = await spaceDao.selectSpaceByIdx(data.spaceIdx);
                upcomingData = {
                    dday: dday,
                    spaceName: spaceData[0].spaceName,
                    reservationIdx: data.reservationIdx
                }
            }
        }
    }))
    const upcomingMessage = `D-${upcomingData.dday} ${upcomingData.spaceName}`

    const userTagData = await userTagDao.selectUserTagByUserIdx(userIdx);
    let userTagList = [];
    let userFitSpaceSet = new Set();

    if (userTagData.length > 0) {
        await Promise.all(userTagData.map(async (data) => {
            userTagList.push({
                tagContent: data.userTagContent
            })
            const spaceList = await spaceTagDao.selectSpaceIdxTagBySpaceTagContent(data.userTagContent);
            spaceList.map((spaceData) => {
                userFitSpaceSet.add(spaceData.spaceIdx)
            })
        }))
    }

    let userFitSpaceDataList = []

    for (let data of userFitSpaceSet) {
        const userFitSpaceData = await spaceDao.selectSpaceByIdx(data);
        const userFitSpaceTag = await spaceTagDao.selectSpaceTagBySpaceIdx(data);
        let userFitSpaceTagList = [];
        userFitSpaceTag.map((userFitTagData) => {
            userFitSpaceTagList.push({
                tagName: userFitTagData
            })
        })
        const userSpaceLike = await userLikeDao.selectUserLikeByUserIdxAndSpaceIdx(userIdx, data);
        let boolSpaceLike = false;
        if (userSpaceLike.length > 0 && userSpaceLike[0].userLikeOn) {
            boolSpaceLike = true;
        }
        const userFitSpaceObejct = {
            spaceIdx : userFitSpaceData[0].spaceIdx,
            spaceName: userFitSpaceData[0].spaceName,
            spaceImg: userFitSpaceData[0].spaceImg,
            spaceLike: boolSpaceLike,
            spaceDetail: userFitSpaceData[0].spaceDetail,
            spaceTag: userFitSpaceTagList
        }
        userFitSpaceDataList.push(userFitSpaceObejct);
    }

    
    let reservationTopSpaceList = [];
    const reservationTopSpaceIdx = await spaceDao.selectSpaceByTopReservation(); 
    await Promise.all(reservationTopSpaceIdx.map(async (data)=> {
        const userSpaceLike = await userLikeDao.selectUserLikeByUserIdxAndSpaceIdx(userIdx, data.spaceIdx);
        let boolSpaceLike = false;
        if (userSpaceLike.length > 0 && userSpaceLike[0].userLikeOn) {
            boolSpaceLike = true;
        }

        let reservationTopSpaceTagList = [];
        const reservationTopSpaceTag = await spaceTagDao.selectSpaceTagBySpaceIdx(data.spaceIdx);
        await Promise.all(reservationTopSpaceTag.map((spaceTagData) => {
            reservationTopSpaceTagList.push({
                tagName : spaceTagData.spaceTagContent
            })
        }))

        const reservationTopParsedObject = {
            spaceIdx:data.spaceIdx,
            spaceName:data.spaceName,
            spaceImg:data.spaceImg,
            spaceLike:boolSpaceLike,
            spaceDetail:data.spaceDetail,
            spaceTag : reservationTopSpaceTagList
        }
        reservationTopSpaceList.push(reservationTopParsedObject);
    }))

    let searchTopSpaceList = [];
    const searchTopSpaceIdx = await spaceDao.selectSpaceByTopSearch(); 
    await Promise.all(searchTopSpaceIdx.map(async (data)=> {
        const userSpaceLike = await userLikeDao.selectUserLikeByUserIdxAndSpaceIdx(userIdx, data.spaceIdx);
        let boolSpaceLike = false;
        if (userSpaceLike.length > 0 && userSpaceLike[0].userLikeOn) {
            boolSpaceLike = true;
        }

        let searchTopSpaceTagList = [];
        const searchTopSpaceTag = await spaceTagDao.selectSpaceTagBySpaceIdx(data.spaceIdx);
        await Promise.all(searchTopSpaceTag.map((spaceTagData) => {
            searchTopSpaceTagList.push({
                tagName : spaceTagData.spaceTagContent
            })
        }))

        const searchTopParsedObject = {
            spaceIdx:data.spaceIdx,
            spaceName:data.spaceName,
            spaceImg:data.spaceImg,
            spaceLike:boolSpaceLike,
            spaceDetail:data.spaceDetail,
            spaceTag : searchTopSpaceTagList
        }
        searchTopSpaceList.push(searchTopParsedObject);
    }))

    const parsedObject = {
        userName: userData[0].userName,
        userEmail: userData[0].userEmail,
        upcoming: {
            message: upcomingMessage,
            reservationIdx: upcomingData.reservationIdx
        },
        userTag: userTagList,
        userFitSpace : userFitSpaceDataList,
        reservationTopSpace : reservationTopSpaceList,
        searchTopSpace : searchTopSpaceList
    }
    return parsedObject;
}

module.exports = {
    getMain
}