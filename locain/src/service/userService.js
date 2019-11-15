const userDao = require('../dao/userDao');

async function postUserSignup(userData) {
    if (Object.keys(userData).length != 7) {
        console.log('항목 미기입');
        return -1;
    }
    const sameUser = await userDao.selectUserByEmail(userData.email);
    if (sameUser.length != 0) {
        console.log('아이디 중복');
        return 0;
    }
    userParsed = [];
    //데이터 삽입
    for (let [key, value] of Object.entries(userData)) {
        if (key == 'foreigner') {
            if (value == '내국인') {
                userParsed.push(0);
            }
            else {
                userParsed.push(1);
            }
        } else if (key == 'gender') {
            if (value == '남') {
                userParsed.push(0);
            }
            else {
                userParsed.push(1);
            }
        } else {
            userParsed.push(value);
        }
    }

    const insertUserResult = await userDao.insertUser(userParsed);
    return insertUserResult;
}

async function postUserSignin(userData) {
    //데이터 삽입
    userParsed = [];
    for (let [key, value] of Object.entries(userData)) {
        userParsed.push(value);
    }
    const loginData = await userDao.selectUserByEmailPassword(userParsed);
    if (loginData.length == 0) {
        return undefined;
    } else {
        return loginData[0];
    }

}

async function postUserAdditional(userIdx, body) {
    await userDao.deleteAllUserLocation(userIdx);
    await userDao.deleteAllUserTag(userIdx);
    Promise.all(body.favorLocation.map(async (data) => {
        await userDao.insertUserLocation(userIdx, data.location);
    }))
    Promise.all(body.favorTag.map(async (data) => {
        await userDao.insertUserTag(userIdx, data.tag);
    }))
}


module.exports = {
    postUserSignup,
    postUserSignin,
    postUserAdditional
}