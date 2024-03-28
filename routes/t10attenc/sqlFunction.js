

function  getAllStudentAllSubjectTotalMarksSubject(offSet,limit) {
    return  `SELECT
    studentId,
    StudentName,TheroyMarkTermial,PracticalMarkTermial,TheroyMarkPre,PracticalMarkPre,TheroyMarkFinal,PracticalMarkFinal,TotalTheroyMark,TotalPracticalMark,
    (TotalTheroyMark + TotalPracticalMark ) as TotalMark
    from(
      SELECT 
      studentId,
      StudentName,TheroyMarkTermial,PracticalMarkTermial,TheroyMarkPre,PracticalMarkPre,TheroyMarkFinal,PracticalMarkFinal,
      (TheroyMarkTermial + TheroyMarkPre + TheroyMarkFinal) as TotalTheroyMark,
      (PracticalMarkTermial + PracticalMarkPre + PracticalMarkFinal) as TotalPracticalMark
      from(
          SELECT 
          tbl_studentMaster.stud_id as studentId,
          tbl_studentMaster.fname as StudentName,
          sum(case when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_theory end ) as TheroyMarkTermial ,
          sum(case when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_practical end) as PracticalMarkTermial,
          sum(case when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_theory end ) as TheroyMarkPre ,
          sum(case when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_practical end) as PracticalMarkPre,
          sum(case when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_theory end ) as TheroyMarkFinal ,
          sum(case when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_practical end) as PracticalMarkFinal
          FROM db_stud_28Feb.tbl_examResult join tbl_studentMaster 
          on tbl_examResult.stud_id = tbl_studentMaster.stud_id 
          group by tbl_examResult.stud_id 
          limit ${offSet},${limit}
      ) as ResultView
      ) as finalResultView`;
}


function  getStudentAllSubjectTotalMarksSubject(stud_id) {
    return  `SELECT
    studentId,
    StudentName,TheroyMarkTermial,PracticalMarkTermial,TheroyMarkPre,PracticalMarkPre,TheroyMarkFinal,PracticalMarkFinal,TotalTheroyMark,TotalPracticalMark,
    (TotalTheroyMark + TotalPracticalMark ) as TotalMark
    from(
      SELECT 
      studentId,
      StudentName,TheroyMarkTermial,PracticalMarkTermial,TheroyMarkPre,PracticalMarkPre,TheroyMarkFinal,PracticalMarkFinal,
      (TheroyMarkTermial + TheroyMarkPre + TheroyMarkFinal) as TotalTheroyMark,
      (PracticalMarkTermial + PracticalMarkPre + PracticalMarkFinal) as TotalPracticalMark
      from(
          SELECT 
          tbl_studentMaster.stud_id as studentId,
          tbl_studentMaster.fname as StudentName,
          sum(case when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_theory end ) as TheroyMarkTermial ,
          sum(case when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_practical end) as PracticalMarkTermial,
          sum(case when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_theory end ) as TheroyMarkPre ,
          sum(case when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_practical end) as PracticalMarkPre,
          sum(case when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_theory end ) as TheroyMarkFinal ,
          sum(case when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_practical end) as PracticalMarkFinal
          FROM db_stud_28Feb.tbl_examResult join tbl_studentMaster 
          on tbl_examResult.stud_id = tbl_studentMaster.stud_id 
          where tbl_studentMaster.stud_id = ${stud_id}
          group by tbl_examResult.stud_id           
      ) as ResultView
      ) as finalResultView`;
}

function getStudentResultDataSubjectWise(stud_id){
    return `
    SELECT
    studentId,
    StudentName,
    SubjectName,
    TheroyMarkTermial,
    PracticalMarkTermial,
    TheroyMarkPre,
    PracticalMarkPre,
    TheroyMarkFinal,
    PracticalMarkFinal,
    TotalTheroyMark,
    TotalPracticalMark,
    (TotalTheroyMark + TotalPracticalMark) as TotalMark
  from
    (
      SELECT
        studentId,      
        StudentName,
        SubjectName,
        TheroyMarkTermial,
        PracticalMarkTermial,
        TheroyMarkPre,
        PracticalMarkPre,
        TheroyMarkFinal,
        PracticalMarkFinal,
        (
          TheroyMarkTermial + TheroyMarkPre + TheroyMarkFinal
        ) as TotalTheroyMark,
        (
          PracticalMarkTermial + PracticalMarkPre + PracticalMarkFinal
        ) as TotalPracticalMark
      from
        (
          SELECT
            tbl_studentMaster.stud_id as studentId,
            tbl_studentMaster.fname as StudentName,
            tbl_subMaster.sub_name as SubjectName,
            sum(
              case
                when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_theory
              end
            ) as TheroyMarkTermial,
            sum(
              case
                when tbl_examResult.exam_id = 1 then tbl_examResult.obtain_practical
              end
            ) as PracticalMarkTermial,
            sum(
              case
                when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_theory
              end
            ) as TheroyMarkPre,
            sum(
              case
                when tbl_examResult.exam_id = 2 then tbl_examResult.obtain_practical
              end
            ) as PracticalMarkPre,
            sum(
              case
                when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_theory
              end
            ) as TheroyMarkFinal,
            sum(
              case
                when tbl_examResult.exam_id = 3 then tbl_examResult.obtain_practical
              end
            ) as PracticalMarkFinal
          FROM
            db_stud_28Feb.tbl_examResult
            join tbl_studentMaster on tbl_examResult.stud_id = tbl_studentMaster.stud_id
            join tbl_subMaster on tbl_examResult.sub_id = tbl_subMaster.sub_id
          where
            tbl_studentMaster.stud_id = ${stud_id}
          group by
            tbl_examResult.sub_id
        ) as ResultView
    ) as finalResultView`;
}

module.exports = {getAllStudentAllSubjectTotalMarksSubject,
                  getStudentAllSubjectTotalMarksSubject,
                  getStudentResultDataSubjectWise,
}