const dbConn = require('../connection')
const crypto = require('crypto'); 
const md5 = require('md5');




async function checkUserAndPass(user){
    
    return await new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM tbl_users where email  = ?;',user.email  , (error, result) => {
            if (error) {
                console.log("Error :", error)
            }
            
            
            console.log("result :",result);
            if(result.length !== 0 ) {
                result = JSON.parse(JSON.stringify(result[0]))
                console.log(result.password);
                console.log(md5(user.password + result.pw_salt));
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
    checkUserAndPass
}