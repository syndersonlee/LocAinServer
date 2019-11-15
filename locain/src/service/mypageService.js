const moment = require('moment');

const reservationDao = require('../dao/reservationDao');
const spaceDao = require('../dao/spaceDao')
const userLikeDao = require('../dao/userLikeDao');
const spaceTagDao = require('../dao/spaceTagDao');
const userDao = require('../dao/userDao');

async function dDayCalculate(enrolledDate){
    var nowDate = moment().format('YYYY.MM.DD');
    let date1parsed = nowDate.split('.');
    date1parsed[1] = Number(date1parsed[1]) - 1;
    let date2parsed = enrolledDate.split('.');
    date2parsed[1] = Number(date2parsed[1]) - 1;
    const diffDate = moment(date2parsed).diff(moment(date1parsed),'days');
    return diffDate;
}

async function getMypage(userIdx) {

    const userReserveData = await reservationDao.selectReservationByUserIdx(userIdx);
    parsedData = [];
    if(userReserveData.length > 0){
        await Promise.all(userReserveData.map(async (data) => {
            const dday = await dDayCalculate(data.reservationDate);
            if(dday >= 0) {
                const spaceData = await spaceDao.selectSpaceByIdx(data.spaceIdx);
                const parsedObject = {
                    reservationIdx : data.reservationIdx,
                    spaceName : spaceData[0].spaceName,
                    dday : dday,
                    reservationDate : data.reservationDate
                }
                await parsedData.push(parsedObject);
            }
        }))
        return parsedData;
    } else {
        return [];
    }
}

async function getMyUserLike(userIdx) {
    const userLikeData = await userLikeDao.selectUserLikeByUserIdx(userIdx);
    let parsedData = [];
    if(userLikeData.length > 0){
        await Promise.all(userLikeData.map(async (userLikeRow) => {
            const spaceData = await spaceDao.selectSpaceByIdx(userLikeRow.spaceIdx);
            const spaceTagData = await spaceTagDao.selectSpaceTagBySpaceIdx(userLikeRow.spaceIdx)
            let userSpaceTag = [];
            if(spaceTagData.length > 0) {
                await Promise.all(spaceTagData.map(async (spaceTagRow) => {
                    userSpaceTag.push({tagContent : spaceTagRow.spaceTagContent})   
                }))
            }
            const parsedObject = {
                spaceIdx : spaceData[0].spaceIdx,
                spaceName : spaceData[0].spaceName,
                likeOn : true,
                spaceDetail : spaceData[0].spaceDetail,
                userSpaceTag : userSpaceTag,
                spaceImg : spaceData[0].spaceImg
            }
            parsedData.push(parsedObject);
        }))
    }
    return parsedData;
}

async function getMyReservation(reservationIdx){
    const reservationData = await reservationDao.selectReservationByIdx(reservationIdx);
    if(reservationData.length == 0 ){
        return [];
    } else {
        const userData = await userDao.selectUserByIdx(reservationData[0].userIdx);
        const spaceData = await spaceDao.selectSpaceByIdx(reservationData[0].spaceIdx);
        const parsedObject = {
            spaceName : spaceData[0].spaceName,
            date : reservationData[0].reservationDate,
            commercial : Boolean(spaceData[0].spaceCommercial),
            location : spaceData[0].spaceLocation,
            iModOn : Boolean(spaceData[0].spaceImod),
            reservationNum : spaceData[0].spaceContainMax,
            reservationCapital : userData[0].userName,
            reservationPhone : userData[0].userPhone,
            reservationEmail : userData[0].userEmail,
            payment : reservationData[0].reservationPayment,
            requirement : reservationData[0].requirement,
            registrationFee : reservationData[0].reservationPrice,
        }
        return parsedObject;
    }
}

async function getMyImod(reservationIdx) {
    const reservationData = await reservationDao.selectReservationByIdx(reservationIdx);
    if(reservationData.length == 0){
        return undefined;
    } else {
        const targetAddress = await spaceDao.selectSpaceByIdx(reservationData[0].spaceIdx);
        const parsedObject = {
            currentLocation : "인천 연수구 송도동",
            targetLocation : targetAddress[0].spaceLocationDetail
        }
        return parsedObject;
    }
}

async function postMyImod(reservationIdx) {
    const reservationData = await reservationDao.selectReservationByIdx(reservationIdx);
    if(reservationData.length == 0){
        return undefined;
    } else {
        const targetSpace = await spaceDao.selectSpaceByIdx(reservationData[0].spaceIdx);
        const targetSpaceName = targetSpace[0].spaceName;
        const dayformat = moment().format('YYYY년 MM월 DD일');
        const timeformat = moment().format('hh:mm a');
        const parsedArray = [`${targetSpaceName}로 이동합니다`,dayformat,  timeformat]
        return parsedArray;
    }
}


module.exports = {
    getMypage,
    getMyUserLike,
    getMyReservation,
    getMyImod,
    postMyImod
}