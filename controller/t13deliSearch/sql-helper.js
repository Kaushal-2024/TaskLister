const {logger} = require('./../../logger')

function makeSearchQuery(sqlQry,bodyParams){

    let searchById = bodyParams.searchId || undefined ;
    
    logger.info(searchById)
    
    if(searchById == undefined){
        
        let searchByName = bodyParams.searchFname;
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

function makeDelimiterSearchQuery(sqlQry,bodyParams){

    let searchByD = bodyParams.searchId || '' ;   
    let mapperObj = makeMapperObj(searchByD)

    logger.info(`searchByd : ${searchByD}`)
    logger.info("mapperObj : "+ JSON.stringify(mapperObj,null,2))
    
    let whereCounter = 0;
    for([filed,value] of  Object.entries(mapperObj)){
      

        if(value.length != 0){
           
            let quVAl = value.map( val => `'${val}'` )
            let likeString = value.map( val => `${filed} like '${val}%'` )

            if(whereCounter == 0){                                            
                sqlQry = sqlQry.concat(` where (${filed} in  (${quVAl}) or ${likeString.join(' or ')} )`)
                whereCounter = 1;
            }else{                           
                sqlQry = sqlQry.concat(` and (${filed} in  (${quVAl}) or ${likeString.join(' or ')} )`)
            }        
        }
    }

    logger.info(`sqlQry in  fun makeDelimiterSearchQuery : ${sqlQry}`)
    return sqlQry;
}

function makeMapperObj(searchByD){
    
    let resObj = {
        "fname" : [],
        "lname" : [],
        "email" : [],
        "dob" : [],
        "cno" : [],
        "city" : []
    }    
    let deliObj = {
        '_':"fname",
        '^':"lname",
        '$':"email",
        '{':"dob",
        '}':"cno",
        ':':"city"
    } 

    // create array store index of delimiter in string 
    let indexArray = []    
    
   
    for(let i = 0; i< searchByD.length; i++){                
        if(Object.keys(deliObj).includes(searchByD[i])){
            indexArray.push(i)
        }
    }
    indexArray.push(searchByD.length)    
    logger.info(`indexArray : "${indexArray}`)
    
    
    // put data in resObj
    for(let i=0; i < indexArray.length-1; i++ ){        
        resObj[deliObj[searchByD[indexArray[i]]]].push(searchByD.slice(indexArray[i]+1,indexArray[i+1]).trim())
    }  
      
    
    return resObj;
}

module.exports = {makeSearchQuery,makeDelimiterSearchQuery}