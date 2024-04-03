var dbConn = require('../../connection')

async function insertAllData(reqObj) {
    
    basicDetailsObj = [ reqObj.fname,
                        reqObj.lname,
                        reqObj.designation,
                        reqObj.dob,
                        reqObj.gender,
                        reqObj.mobileNumber,
                        reqObj.email,
                        reqObj.add1,
                        reqObj.add2,
                        reqObj.state,
                        reqObj.city,                        
                        reqObj.zipcode,
                        reqObj.rstatus
                     ];

    await insertedBasicData(basicDetailsObj)
        .then(async (bId) => {

            console.log("bid :", bId)

            let eduDetailsObj = {
                bId,
                cName: reqObj.CourseName,
                pYear: reqObj.PassYear,
                per: reqObj.Percentage
            }
            let eduFlag = insertedEduData(eduDetailsObj)

            let expDetailsObj = {
                bId,
                comName: reqObj.comName,
                preDesignation: reqObj.preDesignation,
                fromDate: reqObj.fromDate,
                toDate: reqObj.toDate,
            }
            let expFlag = insertedExpData(expDetailsObj)

            let langDetailsObj = {
                bId,
                langName: reqObj.lang,
                read: reqObj.read,
                write: reqObj.write,
                speak: reqObj.speak,
            }
            let langFlag = insertedLangData(langDetailsObj)

            let techDetailsObj = {
                bId,
                techName: reqObj.tech,
                techLevelArray: JSON.parse(reqObj.techLevelArray),
            }
            let techFlag = insertedTechData(techDetailsObj)

            let refDetailsObj = {
                bId,
                refName: reqObj.refName,
                refConNum: reqObj.refConNum,
                refRelation: reqObj.refRelation,
            }
            let refFlag = insertedRefData(refDetailsObj)

            let prefDetailsObj = [bId,
                reqObj.ploca + "",
                reqObj.dept,
                reqObj.notPer,
                reqObj.exCTC,
                reqObj.cuCTC
            ]
            let prefFlag = insertedPrefData(prefDetailsObj)
        })

}



let insertedBasicData = async (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_basictDetails` (`fname`, `lname`, `designation`, `dob`, `gender`, `phoneno`, `email`, `address1`, `address2`, `s_id`, `c_id`, `zcode`, `relationship_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

    insertedObj[3] = insertedObj[3].split("/").reverse().join("-");

    return await new Promise((resolve, reject) => {
        dbConn.query(sqlInserted, insertedObj, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                resolve(result.insertId)
            }

        });
    });
}

let insertedEduData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_edu` (`b_id`, `courceName`, `pass_year`, `percentage`) VALUES (?, ?, ?, ?)';


    console.log("edu detials ", insertedObj)

    let structData = insertedObj.cName.map((cName, index) => {
        return [
            insertedObj.bId,
            cName,
            insertedObj.pYear[index],
            insertedObj.per[index],
        ]
    })

    console.log(structData)

    structData.forEach((element) => {

        dbConn.query(sqlInserted, element, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                console.log("edu inserted :", result.insertId)
            }
        });

    });

}


let insertedExpData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_workExp` (`b_id`, `comName`, `designation`, `fromDate`, `toDate`) VALUES ( ?, ?, ?, ?, ?)';


    console.log("exp detials ", insertedObj)

    let structData = insertedObj.comName.map((comName, index) => {
        return [
            insertedObj.bId,
            comName,
            insertedObj.preDesignation[index],
            insertedObj.fromDate[index].split("/").reverse().join("-"),
            insertedObj.toDate[index].split("/").reverse().join("-"),
        ]
    });


    console.log(structData)
    structData.forEach(element => {
        
        dbConn.query(sqlInserted, element, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                console.log("exp inserted :", result.insertId)
            }
        });
    });


}


let insertedLangData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_langDetails` (`b_id`, `l_name`, `isRead`, `isWrite`, `isSpeak`) VALUES      (?, ?, ?, ?, ?)';


    console.log("lang detials ", insertedObj)

    let structData = insertedObj.langName.map((langName, index) => {
        return [
            insertedObj.bId,
            langName,
            insertedObj.read[index],
            insertedObj.write[index],
            insertedObj.speak[index],
        ]
    })

 
    console.log(structData)
    structData.forEach(element => {

        dbConn.query(sqlInserted, element, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                console.log("lang inserted :", result.insertId)
            }
        });
    });


}


let insertedTechData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_techDetails` (`b_id`, `t_name`, `t_knowlevel`) VALUES (?, ?, ?)';


    console.log("edu detials ", insertedObj)

    let structData = insertedObj.techName.map((techName, index) => {
        return [
            insertedObj.bId,
            techName,
            insertedObj.techLevelArray[index]
        ]
    })

    console.log(structData)

    structData.forEach(element => {

        dbConn.query(sqlInserted, element, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                console.log("tech inserted :", result.insertId)
            }
        });

    });

}


let insertedRefData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO `tbl_refDetails` (`b_id`, `r_name`, `con_number`, `relation`) VALUES (?,?,?,?)';



    console.log("ref detials ", insertedObj)

    let structData = insertedObj.refName.map((refName, index) => {
        return [
            insertedObj.bId,
            refName,
            insertedObj.refConNum[index],
            insertedObj.refRelation[index],
        ]
    })

    console.log(structData)

    structData.forEach(element => {

        dbConn.query(sqlInserted, element, (error, result) => {
            if (error) {
                console.log("Error :", error)
            } else {
                console.log("ref inserted :", result.insertId)
            }
        });

    });

}

let insertedPrefData = (insertedObj) => {

    let sqlInserted = 'INSERT INTO tbl_prefDetails (`b_id`, `preferdLoc`, `deparment`, `noticePreiod`, `expactedCTC`, `currentCTC`) VALUES (?,?,?,?,?,?)';


    dbConn.query(sqlInserted, insertedObj, (error, result) => {
        if (error) {
            console.log("Error :", error)
        } else {
            console.log("pref inserted :", result.insertId)
        }

    });

}


module.exports = {
    insertAllData
}