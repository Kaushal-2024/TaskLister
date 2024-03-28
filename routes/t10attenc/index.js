var express = require('express');
var router = express.Router();
const dbConn = require('../../connection')
/* GET home page. */

router.get('/insert3MonthDataAttendence', function(req, res, next) {
  
  const startDate = new Date('2023-12-01');
  const endDate = new Date('2024-02-29');
    

  let date = new Date(startDate.getTime());

  while (date <= endDate) {
    
    let doa = new Date(date);
    
   
    let insertQry = 'INSERT INTO `db_stud_27Feb`.`tbl_attendence` (`stud_id`, `doa`, `states`) VALUES (?, ?, ?)';
    const attendArray = ["p","a"];
    let random = 1;
    for(let i =1; i<201; i++){
      

      random = Math.floor(Math.random() * attendArray.length);
      
      let states = attendArray[random] ;
  
      dbConn.query( insertQry , [ i,doa,states], (error, results) => {
          if (error) {           
              res.redirect('/error',{error})        

          } else {                    
              res.write("Data Inserted .")
          }
      });
    }

    date.setDate(date.getDate() + 1);

  }
});

router.get('/getAllStudentAttendance', (req, res, next) => {

  
  let limit = process.env.NO_OF_RECORD_PER_PAGE;
  let pageNumber = parseInt(req.query.pageNumber) || 1 ;
  let offSet = ( pageNumber - 1) * limit ;
  let orderByFiled = req.query.orderByFiled || "StudentId" ; 
  let orderType = req.query.orderType || "asc"; 
  let month = req.query.month || 12 ; 
  let year = req.query.year || 2023 ; 
 
  dbConn.query('SELECT count(stud_id) as counter FROM  tbl_studentMaster ', (error, results1) => {
    if (error)
      res.redirect('/error', { error })

     
    let sqlSelect = `select tbl_studentMaster.stud_id as StudentId,
                     tbl_studentMaster.fname as StudentName,
                     count(tbl_attendence.att_id)  as totalPresentDay,
                     round((count(tbl_attendence.att_id)/0.3),2)  as percentage
                     from tbl_studentMaster inner join tbl_attendence 
                     on tbl_studentMaster.stud_id = tbl_attendence.stud_id 
                     where tbl_attendence.states = 'p' 
                     and month(tbl_attendence.doa) = ${month}
                     and year(tbl_attendence.doa) = ${year} 
                     group by tbl_studentMaster.stud_id 
                     order by ${orderByFiled} ${orderType}
                     limit ${offSet},${limit}`; 

    dbConn.query(sqlSelect, (error, results2,fields) => {    
      
      console.log(results1)
      console.log(fields)
      console.log(results2)
      console.log(pageNumber)
      const Result = JSON.parse(JSON.stringify(
          { q1: results1,
            fields :fields,
            results: results2, 
            pageCounter: pageNumber 
          }
        ))
      
      res.render('./t10attenc/allStudentAttendanceList', Result)

    });
  });
});


module.exports = router;
