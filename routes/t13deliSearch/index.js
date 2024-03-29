var express = require('express');
var router = express.Router();
const dbConn = require('../../connection')
const sqlHelper = require('./sql-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/delimitedSearch', function (req, res, next) {

  let fields, searchObj, totalRecord = undefined; 
  res.render('./t13deliSearch/delimitedSearch', { fields, searchObj, totalRecord })
    


});

router.post('/delimitedSearch', function (req, res, next) {

  let sqlQry = `SELECT
  stud_id,
  concat (fname, ' ', mname, ' ', lname) as FullName,
  DATE_FORMAT (tbl_studentMaster.dob, "%Y-%m-%d") as Dateofbirth,
  cno,
  email,
  city 
  FROM
  tbl_studentMaster`;   

  console.log('Post route :sqlQry ', sqlQry)
  
  
  getDATA(req, res, sqlQry);
  // res.render('delimitedSearch', getDATA(req, res, sqlQry))


});



function getDATA(req, res, sqlQry) { 

  let stateMaintainSqlQry = sqlQry;

  if (sqlQry.charAt(sqlQry.length - 1) == ';') {
    sqlQry = sqlQry.substring(0, sqlQry.length - 1)
  }


  // search
  sqlQry = sqlHelper.makeDelimiterSearchQuery(sqlQry, req.body)
 

  // dbConn.query(`select count(*) as totalRecord from(${sqlQry}) as totalRecord`, (error, totalRecord) => {

  //   if (totalRecord != undefined) {
  //     totalRecord = JSON.parse(JSON.stringify(totalRecord));
  //   }

    //pagination and orderby var declaration
    // let limit = process.env.NO_OF_RECORD_PER_PAGE || 5;
    // let pageCounter = req.query.pageNumber || 1;
    // let offset = (pageCounter - 1) * limit;
    // let orderby = req.query.orderBy || '1';
    // let orderByType = req.query.orderByType || 'asc';


    // sqlQry = sqlQry.concat(` order by ${orderby} ${orderByType}`)

    // Pagination var added in query
    // console.log('2.pageCounter', pageCounter)
    // console.log(`limit : ${limit} , offset : ${offset}`)
    // sqlQry = sqlQry.concat(` limit ${offset},${limit}`)


    dbConn.query(sqlQry, (error, results, fields) => {


      if (results != undefined && fields != undefined) {
        fields = JSON.parse(JSON.stringify(fields));
        results = JSON.parse(JSON.stringify(results));
      }

      console.log('4. result', results)


      let resObj = {
        fields,
        results,
        // totalRecord,
        // pageCounter,
        sql: stateMaintainSqlQry,
        searchObj: req.body
      }
      
      // return resObj;
      res.render('./t13deliSearch/delimitedSearch', resObj);

    });
  // });
}

module.exports = router;