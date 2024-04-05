const dbConn = require('../../connection')
const {logger} = require('./../../logger')

async function getDataById(bid) {


    getUserSQl = 'SELECT * FROM tbl_basictDetails where b_id = ?';

    let mainObj

    mainObj = await getDataFromTable(`tbl_basictDetails`, bid)

    mainObj.push(await getDataFromTable(`tbl_edu`, bid));

    mainObj.push(await getDataFromTable(`tbl_workExp`, bid));

    mainObj.push(await getDataFromTable(`tbl_langDetails`, bid));

    mainObj.push(await getDataFromTable(`tbl_techDetails`, bid));

    mainObj.push(await getDataFromTable(`tbl_refDetails`, bid));

    mainObj.push(await getDataFromTable(`tbl_prefDetails`, bid));

    logger.info(`mian with edu objctet for all data : ${mainObj}`);
    
    return mainObj;


}

async function getDataFromTable(table_name, b_id) {

    return await new Promise((res, rej) => {
        dbConn.query(`SELECT * FROM ${table_name} where b_id = ?`, [b_id], (err, result) => {
            if (err) {
                logger.info(`Error :${error}`)
            } else {
                // logger.info("result from sleect qry",result);
                res(JSON.parse(JSON.stringify(result)));
            }
        });
    })
}

async function updateAllData(upObject) {



    upArray = [upObject.fname,
    upObject.lname,
    upObject.designation,
    upObject.dob.split('/').reverse().join('-'),
    upObject.gender,
    upObject.mobileNumber,
    upObject.email,
    upObject.add1,
    upObject.add2,
    upObject.state,
    upObject.city,
    upObject.zipcode,
    upObject.rstatus,
    upObject.b_id
    ];


    await updateBasicData(upArray)    

    upEduArray = {
        CourseName: upObject.CourseName,
        PassYear: upObject.PassYear,
        Percentage: upObject.Percentage,
        eduID: upObject.eduID,
    };
    await updateEduData(upEduArray)

    upExpArray = {
        comName: upObject.comName,
        preDesignation: upObject.preDesignation,
        fromDate: upObject.fromDate,
        toDate: upObject.toDate,
        expID: upObject.expID,
    };
    await updateExpData(upExpArray)

   
    let langDetailsObj = {        
        langName: upObject.lang,
        read: upObject.read,
        write: upObject.write,
        speak: upObject.speak,
        langIdArray : upObject.langIdArray,
    }   
    await updateLangData(langDetailsObj)


    let techDetailsObj = {        
        techName: upObject.tech,
        techLevelArray: JSON.parse(upObject.techLevelArray),
        techIdArray : upObject.techIdArray,
    }
    await updateTechData(techDetailsObj)

    let refDetailsObj = {       
        refName: upObject.refName,
        refConNum: upObject.refConNum,
        refRelation: upObject.refRelation,
        refArray: upObject.refArray,
    }

    await updateRefData(refDetailsObj)

    let prefDetailsObj = [
        upObject.ploca + "",
        upObject.dept,
        upObject.notPer,
        upObject.exCTC,
        upObject.cuCTC,
        upObject.prefArray
    ]
    await updatePrefData(prefDetailsObj)


    return "All Data Updated";

}

async function updateBasicData( upArray) {

    let updateSql = 'UPDATE `tbl_basictDetails` SET `fname` = ?, `lname` = ?, `designation` = ?, `dob` = ?, `gender` = ?, `phoneno` = ?, `email` = ?, `address1` = ?, `address2` = ?, `s_id` = ?,  `c_id` = ?,`zcode` = ?, `relationship_status` = ? WHERE (`b_id` = ?);'
    await new Promise((res, rej) => {
        dbConn.query(updateSql, upArray, (err, result) => {
            if (err) {
                logger.info(`Error :${error}`)
            } else {
                // res(logger.info(result));
                res(logger.info("update basic data"));
            }
        });
    });
}

async function updateEduData(upArray) {
    
    let upEduSql = `UPDATE tbl_edu SET courceName = ?, pass_year = ?, percentage = ? WHERE (e_id = ?)`;

    let structData = upArray.CourseName.map((CourseName, index) => {
        return [
            CourseName,
            upArray.PassYear[index],
            upArray.Percentage[index],
            upArray.eduID[index],
        ]
    })    
    
    
    structData.forEach(async (element) => {
        
        await new Promise((res,rej)=>{
            dbConn.query(upEduSql, element, (error, result) => {
                if (error) {
                    logger.info(`Error :${error}`)
                } else {
                    res(logger.info("update edu record"));
                    // res(logger.info("All edu data updated"));
                }
            });
        });        
    });
}


async function updateExpData(upArray) {
    
    let upExpSql = `UPDATE tbl_workExp SET comName = ?, designation = ?, fromDate = ?, toDate = ? WHERE (w_id = ?)`;
    
    logger.info(upArray);

    let structData = upArray.comName.map((comName, index) => {
        return [            
            comName,
            upArray.preDesignation[index],
            upArray.fromDate[index].split("/").reverse().join("-"),
            upArray.toDate[index].split("/").reverse().join("-"),
            upArray.expID[index],
        ]
    })    
    logger.info(structData);
    
    structData.forEach(async(element) => {
        
        await new Promise((res,rej)=>{
            dbConn.query(upExpSql, element, (error, result) => {
                if (error) {
                    logger.info(`Error :${error}`)
                } else {
                    res(logger.info("update exp record"))
                }
            });
        });
    });
}


async function updateLangData(upArray) {
    
    let upLangSql = `UPDATE tbl_langDetails SET l_name = ?, isRead = ?, isWrite= ?, isSpeak = ? WHERE (l_id = ? )`;
    
    
    logger.info(upArray);

    let structData = upArray.langName.map((langName, index) => {
        return [            
            langName,
            upArray.read[index],
            upArray.write[index],           
            upArray.speak[index],
            upArray.langIdArray[index],
        ]
    })    
    logger.info(structData);
    
    structData.forEach(async(element) => {
        
        await new Promise((res,rej)=>{
            dbConn.query(upLangSql, element, (error, result) => {
                if (error) {
                    logger.info(`Error :${error}`)
                } else {
                    res(logger.info("update lang record"))
                }
            });
        });
    });
}


async function updateTechData(upArray) {
    
    let upTechSql = `UPDATE tbl_techDetails SET t_name = ?, t_knowlevel = ? WHERE (t_id = ?)    `;
    
    
    logger.info(upArray);

    let structData = upArray.techName.map((techName, index) => {
        return [            
            techName,
            upArray.techLevelArray[index],            
            upArray.techIdArray[index],
        ]
    })    
    logger.info(structData);
    
    structData.forEach(async(element) => {
        
        await new Promise((res,rej)=>{
            dbConn.query(upTechSql, element, (error, result) => {
                if (error) {
                    logger.info(`Error :${error}`)
                } else {
                    res(logger.info("update tech record"))
                }
            });
        });
    });
}

async function updateRefData(upArray) {
    
    let upRefSql = `UPDATE tbl_refDetails SET r_name = ?, con_number = ?, relation = ? WHERE (r_id = ?)`;
    
    
    logger.info(upArray);

    let structData = upArray.refName.map((refName, index) => {
        return [            
            refName,
            upArray.refConNum[index],
            upArray.refRelation[index],
            upArray.refArray[index],
        
        ]
    })    
    logger.info(structData);
    
    structData.forEach(async(element) => {
        
        await new Promise((res,rej)=>{
            dbConn.query(upRefSql, element, (error, result) => {
                if (error) {
                    logger.info(`Error :${error}`)
                } else {
                    res(logger.info("update Ref record"))
                }
            });
        });
    });
}


async function updatePrefData(upArray) {

    let updateSql = `UPDATE tbl_prefDetails SET preferdLoc = ?, deparment = ?, noticePreiod = ?, expactedCTC = ?, currentCTC = ? WHERE (p_id = ?)`;

    await new Promise((res, rej) => {
        dbConn.query(updateSql, upArray, (err, result) => {
            if (err) {
                logger.info(`Error :${err}`)
            } else {
                // res(logger.info(result));
                res(logger.info("update Pref data"));
            }
        });
    });
}
module.exports = {
    getDataById,
    updateAllData
}