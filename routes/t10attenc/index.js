var express = require('express');
var router = express.Router();
const dbConn = require('../../connection')
const sqlFun = require('./sqlFunction')
/* GET home page. */

router.get('/insert3MonthDataAttendence', function (req, res, next) {

  const startDate = new Date('2023-12-01');
  const endDate = new Date('2024-02-29');


  let date = new Date(startDate.getTime());

  while (date <= endDate) {

    let doa = new Date(date);


    let insertQry = 'INSERT INTO `db_stud_28Feb`.`tbl_attendence` (`stud_id`, `doa`, `states`) VALUES (?, ?, ?)';
    const attendArray = ["p", "a"];
    let random = 1;
    for (let i = 1; i < 201; i++) {


      random = Math.floor(Math.random() * attendArray.length);

      let states = attendArray[random];

      dbConn.query(insertQry, [i, doa, states], (error, results) => {
        if (error) {
          res.redirect('/error', { error })

        } else {
          res.write("Data Inserted .")
        }
      });
    }

    date.setDate(date.getDate() + 1);

  }
});

router.get('/insertStudentResultData', function (req, res, next) {



  let insertQry = 'INSERT INTO `db_stud_28Feb`.`tbl_examResult` (`stud_id`, `sub_id`, `exam_id`, `obtain_theory`, `total_theory`, `obtain_practical`, `total_practical`, `exam_date`, `attendence`) VALUES (?,?,?,?,?,?,?,?,?)';

  
  let attendance = 'p';
  let obt_thr = 0;
  let tot_thr = 0;
  let obt_pre = 0;
  let tot_pre = 0;

  let doE = '2016-12-03';


  for (let stud_id = 1; stud_id < 201; stud_id++) {


    for (let sub_id = 1; sub_id < 7; sub_id++) {


      for (let exam_id = 1; exam_id < 4; exam_id++) {


        if (exam_id == 3) {
          tot_thr = 70
          obt_thr = Math.floor(Math.random() * tot_thr)
          tot_pre = 30
          obt_pre = Math.floor(Math.random() * tot_pre)
        } else {
          tot_thr = 30
          obt_thr = Math.floor(Math.random() * tot_thr)
          tot_pre = 20
          obt_pre = Math.floor(Math.random() * tot_pre)
        }

        dbConn.query(insertQry, [stud_id, sub_id, exam_id, obt_thr, tot_thr, obt_pre, tot_pre, doE, attendance], (error, results) => {

          if (error) {
            res.redirect('/error', { error })

          } else {
            res.write("Data Inserted .")
          }

        });

      }
     
    }
  }


});

router.get('/getAllStudentAttendance', (req, res, next) => {


  let limit = process.env.NO_OF_RECORD_PER_PAGE;
  let pageNumber = parseInt(req.query.pageNumber) || 1;
  let offSet = (pageNumber - 1) * limit;
  let orderByFiled = req.query.orderByFiled || "StudentId";
  let orderType = req.query.orderType || "asc";
  let month = req.query.month || 12;
  let year = req.query.year || 2023;

  dbConn.query('SELECT count(stud_id) as counter FROM  tbl_studentMaster ', (error, results1) => {
    
    if (error)
      res.redirect('/error', { error })


    let sqlSelect = `select tbl_studentMaster.stud_id as StudentId,
                     tbl_studentMaster.fname as StudentName,
                     count(tbl_attendence.att_id)  as totalPresentDay,
                     concat(round((count(tbl_attendence.att_id)/0.3),2)," %")  as percentage
                     from tbl_studentMaster inner join tbl_attendence 
                     on tbl_studentMaster.stud_id = tbl_attendence.stud_id 
                     where tbl_attendence.states = 'p' 
                     and month(tbl_attendence.doa) = ${month}
                     and year(tbl_attendence.doa) = ${year} 
                     group by tbl_studentMaster.stud_id 
                     order by ${orderByFiled} ${orderType}
                     limit ${offSet},${limit}`;

    dbConn.query(sqlSelect, (error, results2, fields) => {

      console.log(results1)
      console.log(fields)
      console.log(results2)
      console.log(pageNumber)

      const Result = {
        q1: results1,
        fields: fields,
        results: results2,
        pageCounter: pageNumber
      }


      res.render('t10attenc/allStudentAttendanceList', Result)

    });
  });
});


router.get('/getAllStudentResult', (req, res, next) => {


  let limit = process.env.NO_OF_RECORD_PER_PAGE;
  let pageNumber = parseInt(req.query.pageNumber) || 1;
  let offSet = (pageNumber - 1) * limit;

  dbConn.query('SELECT count(stud_id) as counter FROM  tbl_studentMaster ', (error, results1) => {
    if (error)
      res.redirect('/error', { error })


    let sqlSelect = sqlFun.getAllStudentAllSubjectTotalMarksSubject(offSet,limit);

    dbConn.query(sqlSelect, (error, results2, fields) => {

      console.log(results1)
      console.log(fields)
      console.log(results2)
      console.log(pageNumber)
     
      const ResultData = {
        q1: results1,
        fields: fields,
        results: results2,
        pageCounter: pageNumber
      }

      res.render('t10attenc/allStudentResult', ResultData)

    });
  });
});

router.get('/viewStudentResult/:stud_id', (req, res, next) => {

 
  let stud_id = req.params.stud_id; 

   
    let sqlSelect = sqlFun.getStudentResultDataSubjectWise(stud_id);
   
    let sqlSelect2 = sqlFun.getStudentAllSubjectTotalMarksSubject(stud_id);

  
    
    dbConn.query(sqlSelect, (error, results1, fields) => {
      
      dbConn.query(sqlSelect2, (error, results2) => {

        let results3 = (parseInt(results2[0].TotalMark) * 100/1200).toFixed(2);
        
      
        console.log(fields)
console.log(results1)
      console.log(results2)
      console.log(results3)
      const ResultData = {        
        fields: fields,
        results: results1,   
        totalResult : results2,   
        parentage : results3
      }
      res.render('t10attenc/studentResultPage', ResultData)

    });
  });
 
});

module.exports = router;
