const {logger} = require('./../../logger')

function makeSearchQuery(sqlQry,bodyParams){

    let searchById = bodyParams.searchId || '' ;
    // searchById = searchById.split(',')    
    logger.info(searchById)


    let searchByName = bodyParams.searchFname;
    
    
    if(searchById == ''){
        sqlQry = sqlQry.concat(` where fname like  '${searchByName}%'`)   
        let searchByDOB  = bodyParams.searchDOB;
        sqlQry = sqlQry.concat(`  or dob like  '${searchByDOB}'`)
    
        let searchByCountry  = bodyParams.searchCountry;
        sqlQry = sqlQry.concat(`  or country like  '${searchByCountry}'`)
    
        let searchByCno  = bodyParams.searchCno;
        sqlQry = sqlQry.concat(`  or cno like  '${searchByCno}'`)
     
    }else{
        sqlQry = sqlQry.concat(` where stud_id in  (${searchById})`)
    }
   

    return sqlQry;
}

module.exports = {makeSearchQuery}