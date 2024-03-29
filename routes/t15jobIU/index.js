var express = require('express');
var router = express.Router();
const sql = require('./sql-helper-insert')
const sqlUpdate = require('./sql-helper-update')
var dbConn = require('../../connection')



/* GET job application */

router.get('/allJobApplicantList',function(req,res,next){ 
    
   dbConn.query("SELECT * FROM db_jobApp_15march.tbl_basictDetails",(err,result)=>{

    if(err){
      console.log("Error :", err)
    }else{ 

      res.render("./t15jobIU/allUserList", { result })
    }
   }); 
    
  
 
});

router.get('/jobRegistration', function(req, res, next) {
  res.render('./t15jobIU/jobAppForm');
});

router.post('/jobRegistration',async function(req, res, next) {
  console.log(req.body)

  let reqObj = req.body;
  console.log("fetch mathi madel data",reqObj);

  await sql.insertAllData(reqObj)
  console.log("insert  all data done")

  res.render('./t15jobIU/jobAppForm');
});



/* GET job application */
router.get('/jobUpdate/:id',async function(req, res, next) {
  res.render('./t15jobIU/jobAppForm');
});


router.post('/jobUpdate/:id',async function(req, res, next) {
  let reqObj = req.body;
  console.log("update valo obj",reqObj)
  
  let msg = await sqlUpdate.updateAllData(reqObj)
  console.log(msg)

  return res.render('./t15jobIU/jobAppForm');
  // res.redirect('/allJobApplicantList')
});



router.get('/fetchUserData/:id',async function(req, res, next) {

  let bid=req.params.id 

  let obj =await sqlUpdate.getDataById(bid)
  
  res.send(obj);
});



router.get('/getStateData',function(req, res, next) {

  getStateSQl = 'SELECT * FROM tbl_states';
  
      dbConn.query(getStateSQl,(err,result)=>{          
          if (err) {
              console.log("Error :", err)
          } else {             
              res.send(JSON.parse(JSON.stringify(result)));
          }
      });  
});


router.get('/getCityData/:sid',function(req, res, next) {
  
  getCitySQl = 'SELECT * FROM tbl_cities where state_id = ?';
  
      dbConn.query(getCitySQl,[req.params.sid],(err,result)=>{          
          if (err) {
              console.log("Error :", err)
          } else {     
              // console.log(result);        
              res.send(JSON.parse(JSON.stringify(result)));
          }
      });  
});




// default handler
router.get('*', function(req, res, next) {
  res.render('./t15jobIU/totleRegisteredRouts',{routes:router.stack});
});



module.exports = router;
