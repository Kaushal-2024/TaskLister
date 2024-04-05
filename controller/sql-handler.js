let dbConn = require('../connection')
const crypto = require('crypto'); 
const md5 = require('md5');
const {logger} = require('./../logger')


async function isCodeActivated(a_code){

    let timeStamp =  await new Promise((resolve, reject) => {
        
        let selectSQL = 'select created_time from  tbl_users where activation_code  = ?';
        dbConn.query(selectSQL,a_code, (error, result) => {
            if (error) {
                logger.info(`Error :${error}`)
            } else {               
            //    logger.info(result);
                resolve(result[0].created_time)
            }

        });
    });

    
    let linkCreateTime = new Date(timeStamp)
    let currentTime = new Date()

    if(Math.round((currentTime-linkCreateTime)/1000) <= 10){
        return true;
    }

    return false;
    

}
async function insertUser(obj){

    delete obj.conPass;
    obj.pw_salt = (Math.random() + 1).toString(36).substring(7);   
    obj.password = md5(obj.password + obj.pw_salt)
    obj.activation_code = crypto.randomUUID();
  
    logger.info(obj);
    let sqlInserted = 'INSERT INTO `tbl_users` (`fname`, `lname`, `email`, `cno`, `password`, `pw_salt`, `activation_code`) VALUES (?, ?, ?, ?, ?, ?,? )';

    

    return await new Promise((resolve, reject) => {
        
        dbConn.query(sqlInserted, Object.values(obj), (error, result) => {
            if (error) {
                logger.info(`Error :${error}`)
            } else {                
                dbConn.query('select * from tbl_users where u_id = '+result.insertId, (error, result) => {
                    if (error) {
                        logger.info(`Error :${error}`)
                    } else {
                        logger.info(`from qry"${result}`);
                        resolve(result[0].activation_code)
                    }    
                });            

            }

        });
    });

}

async function updateStates(a_code){

    let sqlUpdate = `UPDATE tbl_users SET is_activated = '1' WHERE (activation_code = ?);`

    dbConn.query(sqlUpdate,a_code, (error, result) => {
        if (error) {
            logger.info(`Error :${error}`)
        } else {
            logger.info("user status updated");
        }    
    });  
    
}


async function getAllEmail(){
    
    return await new Promise((resolve, reject) => {
        dbConn.query('SELECT email FROM tbl_users;'  , (error, result) => {
            if (error) {
                logger.info(`Error :${error}`)
            } else {
                resolve(result)
            }    
        });
    });  
}


async function checkUserAndPass(user){
    
    return await new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM tbl_users where email  = ?;',user.email  , (error, result) => {
            if (error) {
                logger.info(`Error :${error}`)
            }
            
            
            logger.info(`result : ${JSON.stringify(result,null,2)}`);
            if(result.length !== 0 ) {
                result = JSON.parse(JSON.stringify(result[0]))
                logger.info(result.password);
                logger.info(md5(user.password + result.pw_salt));
               if(result.password == md5(user.password + result.pw_salt)){
                    resolve("done")
               }else{
                    resolve("notDone")
               }

            }else{
                resolve("not found")
            }    

        });
    });  
}

module.exports = {
    insertUser,isCodeActivated,updateStates,getAllEmail, checkUserAndPass
}
