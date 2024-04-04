let dbConn = require('../../connection')
const {logger} = require('./../../logger')

const showTableGet =  (req, res, next) => {  
    
    let fields,sql = undefined;    
    let sqlQry = req.query.inputQRY

    logger.info("sql Qry :",sqlQry)
    if( sqlQry == undefined){
      res.render('./t11dynegrid/dynamicGrid',{fields,sql})     
    }else{
      getDATA(req,res,sqlQry) 
    }    
    
}


const showTablePost = (req, res, next) => {    

  logger.info("before split",req.originalUrl)
  req.originalUrl  = req.originalUrl.split('?')[0];
  logger.info("before split",req.originalUrl)
  logger.info("post route ni qry",req.body.inputQRY);
  let sqlQry = req.body.inputQRY; 
  getDATA(req,res,sqlQry)  

}


function getDATA(req,res,sqlQry){
  
   
  logger.info('1.sqlQry ',sqlQry) 
  
  let stateMaintainSqlQry = sqlQry;
  
  if( sqlQry.charAt(sqlQry.length - 1)  == ';'){
    sqlQry = sqlQry.substring(0, sqlQry.length - 1)
  }
  
  dbConn.query(`select count(*) as totalRecord from(${sqlQry}) as totalRecord`,(error,totalRecord)=>{
    
    if (totalRecord != undefined){      
     totalRecord =  JSON.parse(JSON.stringify(totalRecord));
    }    

    let limit = process.env.NO_OF_RECORD_PER_PAGE || 5;
    let pageCounter = req.query.pageNumber || 1;
    let offset = (pageCounter - 1) * limit;   
    let orderby = req.query.orderBy || '1';
    let orderByType = req.query.orderByType || 'asc';
    logger.info('2.pageCounter',pageCounter) 
   
    logger.info(`limit : ${limit} , offset : ${offset}`)
    
    sqlQry = sqlQry.concat(` order by ${orderby} ${orderByType}`)    
    sqlQry = sqlQry.concat(` limit ${offset},${limit}`)    
    logger.info('3. sqlQry concat',sqlQry) 

    dbConn.query(sqlQry,(error,results,fields)=>{ 
     
            
      if (results != undefined && fields != undefined){      
      fields =  JSON.parse(JSON.stringify(fields));
      results = JSON.parse(JSON.stringify(results));    
      }
      
      logger.info('4. result',results) 
      res.render('./t11dynegrid/dynamicGrid',{
        fields,
        results,
        totalRecord,
        pageCounter,
        sql: stateMaintainSqlQry,  
      })    
      
    });

  });
}

module.exports = {
  showTableGet,showTablePost
}
