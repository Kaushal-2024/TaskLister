const validator  = require('./formValidationBE')
const dbConn = require('../../connection')
const {logger} = require('./../../logger')

const insertFormGet =  function(req, res, next) {
  let message,result=undefined
  res.render('./t14studentIU/form',{ message ,result});
}

const insertFormPost = function(req, res, next) {
 
  let result=undefined
  let reqObj = req.body;
  let message = validator.validateFormObj(reqObj)  

  if(message.length == 0){
    logger.info("insert data")
    message = insertedData(req.body)    
  }
  
  res.render('./t14studentIU/form', { message,result });
}


const updateFromGet = async function(req, res, next) {
  
  let message=undefined
  let upId= req.params.sid


  await new Promise((resolve, reject) => {
    dbConn.query('SELECT * FROM tbl_studentMaster where stud_id = (?)', [upId] ,(error, result) => {
        if (error) {
            logger.info("Error :", error)
        } else {
          resolve(result[0])
        }
        
      })
    }).then((result) => {
      
      logger.info("data for updated",result)
      res.render('./t14studentIU/form',{ message ,result});
  })  
}

const updateFromPost = async function(req, res, next) { 
  
  let result =  true
  
  let reqObj = req.body;
  let message = validator.validateFormObj(reqObj)  

  if(message.length == 0){    
    message = await updateData(req.body).then(()=>{
      return "true";
    })
      
  }
  
  res.render('./t14studentIU/form', { message,result });
}


let insertedData = (insertedObj,res) => {
  
  let sqlInserted = 'INSERT INTO `tbl_studentMaster` (`fname`, `mname`, `lname`, `dob`, `cno`, `email`, `address`, `city`, `state`, `country`, `zipcode`, `bgroup`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'

  insertedObj.dob = insertedObj.dob.split("/").reverse().join("-");
  dbConn.query(sqlInserted,Object.values(insertedObj),(error,result)=>{
    if (error) {           
     logger.info(error)
    }  

  });
  return "true";

}

let updateData = async (updatedObj) => {
  logger.info("updated obj",updatedObj)
  let sqlUpdate = 'UPDATE `tbl_studentMaster` SET `fname` = ?, `mname` = ?, `lname` = ?, `dob` = ?, `cno` = ?, `email` = ?, `address` = ?, `city` = ?, `state` = ?, `country` = ?, `zipcode` = ?, `bgroup` = ? WHERE (`stud_id` = ?)';

  updatedObj.dob = updatedObj.dob.split("/").reverse().join("-"); 
  delete updatedObj.submitBtn

  return await new Promise((resolve, reject)=>{

    dbConn.query(sqlUpdate,Object.values(updatedObj),(error,result)=>{
      if (error) {           
        res.redirect('/error',{error})        
      }else{
        resolve()
      }      
    });

  })
}



module.exports = {
  insertFormGet,insertFormPost,updateFromGet,updateFromPost
}
