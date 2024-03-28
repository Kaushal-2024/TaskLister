let express = require('express');
let router = express.Router();
let dbConn = require('../../connection')

/* GET home page. */
router.get('/t11showTabel', function(req, res, next) {  
    let fields,sql = undefined;
    
    let sqlQry = req.query.inputQRY

    console.log("sql Qry :",sqlQry)
    if( sqlQry == undefined){
      res.render('./t11dynegrid/dynamicGrid',{fields,sql})     
    }else{
      getDATA(req,res,sqlQry) 
    }    
    
});

router.post('/t11showTabel', function(req, res, next) {  
  

  console.log("before split",req.originalUrl)
  req.originalUrl  = req.originalUrl.split('?')[0];
  console.log("before split",req.originalUrl)
  console.log("post route ni qry",req.body.inputQRY);
  let sqlQry = req.body.inputQRY; 
  getDATA(req,res,sqlQry)  
});


function getDATA(req,res,sqlQry){
  
   
  console.log('1.sqlQry ',sqlQry) 
  
  let stateMaintainSqlQry = sqlQry;
  
  if( sqlQry.charAt(sqlQry.length - 1)  == ';')
  {
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
    console.log('2.pageCounter',pageCounter) 
   
    console.log(`limit : ${limit} , offset : ${offset}`)
    
    sqlQry = sqlQry.concat(` order by ${orderby} ${orderByType}`)    
    sqlQry = sqlQry.concat(` limit ${offset},${limit}`)    
    console.log('3. sqlQry concat',sqlQry) 

    dbConn.query(sqlQry,(error,results,fields)=>{ 
     
            
      if (results != undefined && fields != undefined){      
      fields =  JSON.parse(JSON.stringify(fields));
      results = JSON.parse(JSON.stringify(results));    
      }
      
      console.log('4. result',results) 
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

module.exports = router;
