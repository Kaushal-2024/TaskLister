const sql = require('./sql-helper-insert')
const sqlUpdate = require('./sql-helper-update')
var dbConn = require('../../connection')
const {logger} = require('./../../logger')


const getAllJobApplicanteData = function(req,res,next){ 
    
   dbConn.query("SELECT * FROM db_jobApp_15march.tbl_basictDetails",(err,result)=>{

    if(err){
      logger.info(`Error :${err}`)
    }else{ 

      res.render("./t15jobIU/allUserList", { result })
    }
   });    
  
 
}

const jobRegistrationGet = function(req, res, next) {
  res.render('./t15jobIU/jobAppForm');
}

const jobRegistrationPost =  async function(req, res, next) {
  logger.info(req.body)

  let reqObj = req.body;
  logger.info(`fetch mathi madel data : ${reqObj}`);

  await sql.insertAllData(reqObj)
  logger.info("insert  all data done")

  res.render('./t15jobIU/jobAppForm');
}


const jobUpdateGet = async function(req, res, next) {
  res.render('./t15jobIU/jobAppForm');
}


const jobUpdatePost = async function(req, res, next) {
  let reqObj = req.body;
  logger.info(`update valo obj ${reqObj}`)
  
  let msg = await sqlUpdate.updateAllData(reqObj)
  logger.info(msg)

  return res.render('./t15jobIU/jobAppForm');
  // res.redirect('/allJobApplicantList')
}



const fetchUserData = async function(req, res, next) {

  let bid=req.params.id 

  let obj =await sqlUpdate.getDataById(bid)
  
  res.send(obj);
}



const getStateData = function(req, res, next) {

  getStateSQl = 'SELECT * FROM tbl_states';
  
      dbConn.query(getStateSQl,(err,result)=>{          
          if (err) {
            logger.info(`Error :${err}`)
          } else {             
              res.send(JSON.parse(JSON.stringify(result)));
          }
      });  
}

const getCityData = function(req, res, next) {
  
  getCitySQl = 'SELECT * FROM tbl_cities where state_id = ?';
  
      dbConn.query(getCitySQl,[req.params.sid],(err,result)=>{          
          if (err) {
            logger.info(`Error :${err}`)
          } else {     
              // logger.info(result);        
              res.send(JSON.parse(JSON.stringify(result)));
          }
      });  
}




// // default handler
// router.get('*', function(req, res, next) {
//   res.render('./t15jobIU/totleRegisteredRouts',{routes:router.stack});
// });



module.exports = {
  getAllJobApplicanteData,jobRegistrationGet,jobRegistrationPost,jobUpdateGet,jobUpdatePost,fetchUserData,getStateData,getCityData
}
