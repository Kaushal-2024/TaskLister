const dbConn = require("../../connection");
const sqlFun = require("./sqlFunction");

const getAllStudentAttendance =  (req, res, next) => {
  
  let limit = process.env.NO_OF_RECORD_PER_PAGE;
  let pageNumber = parseInt(req.query.pageNumber) || 1;
  let offSet = (pageNumber - 1) * limit;
  let orderByFiled = req.query.orderByFiled || "StudentId";
  let orderType = req.query.orderType || "asc";
  let month = req.query.month || 12;
  let year = req.query.year || 2023;

  dbConn.query(
    "SELECT count(stud_id) as counter FROM  tbl_studentMaster ",
    (error, results1) => {
      if (error) res.redirect("/error", { error });

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
    
        const Result = {
          q1: results1,
          fields: fields,
          results: results2,
          pageCounter: pageNumber,
        };

        res.render("t10attenc/allStudentAttendanceList", Result);
      });
    }
  );
}

const getAllStudentResult =  (req, res, next) => {
  let limit = process.env.NO_OF_RECORD_PER_PAGE;
  let pageNumber = parseInt(req.query.pageNumber) || 1;
  let offSet = (pageNumber - 1) * limit;

  dbConn.query(
    "SELECT count(stud_id) as counter FROM  tbl_studentMaster ",
    (error, results1) => {
      if (error) res.redirect("/error", { error });

      let sqlSelect = sqlFun.getAllStudentAllSubjectTotalMarksSubject(
        offSet,
        limit
      );

      dbConn.query(sqlSelect, (error, results2, fields) => {
       
        const ResultData = {
          q1: results1,
          fields: fields,
          results: results2,
          pageCounter: pageNumber,
        };

        res.render("t10attenc/allStudentResult", ResultData);
      });
    }
  );
}

const viewStudentResultById =  (req, res, next) => {
  let stud_id = req.params.stud_id;

  let sqlSelect = sqlFun.getStudentResultDataSubjectWise(stud_id);

  let sqlSelect2 = sqlFun.getStudentAllSubjectTotalMarksSubject(stud_id);

  dbConn.query(sqlSelect, (error, results1, fields) => {
    dbConn.query(sqlSelect2, (error, results2) => {
      let results3 = ((parseInt(results2[0].TotalMark) * 100) / 1200).toFixed(
        2
      );
     
      const ResultData = {
        fields: fields,
        results: results1,
        totalResult: results2,
        parentage: results3,
      };
      res.render("t10attenc/studentResultPage", ResultData);
    });
  });
}

module.exports = {
  getAllStudentAttendance,getAllStudentResult,viewStudentResultById
}
