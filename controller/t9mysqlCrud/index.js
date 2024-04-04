
const dbConn = require('../../connection')
const {logger} = require('./../../logger')

const formGet = (req, res) => {
  logger.info("t9 form hit");
  res.render("./t9mysqlCrud/form")
}

const formPost = (req, res) => {
  logger.info("t9 post hit");
    logger.info(req.body)
    const { first, last, email, age, mobile, gender,  add } = req.body;
    const hobbies = req.body.hobbies.toString()
    const insertQry = 'INSERT INTO `tbl_use` (`fname`, `lname`, `email`, `age`, `mobile_no`, `gender`, `hobbies`, `address`) VALUES (?,?,?,?,?,?,?,?)' 

    dbConn.query( insertQry , [ first, last, email, age, mobile, gender, hobbies , add  ], (error, results) => {
        if (error) {           
            res.redirect('/error',{error})        

        } else {                    
            res.redirect('/t9getAllUser')
        }
    });

}

const getAllUser =  (req, res) => {
  dbConn.query('SELECT * FROM `tbl_use`', (error, results) => {
    if (error) {        
        res.redirect('/error',{error})        
    } else {
      
      res.render("./t9mysqlCrud/allUserList", { results })     
    }
  });  
}

const deleteUserById = (req, res) => {
  logger.info(req.params.userId)
  dbConn.query('delete from `tbl_use` where id = ?' ,[req.params.userId], (error,results) => {
    if (error) {                
        res.redirect('/error',{error})        
    } else {        
      res.redirect('/t9getAllUser')  
      // res.status(200).send('User deleted successfully');  
    }
  });  
}


const getOneUserDetailByID = (req, res) => {
  
  dbConn.query('SELECT * FROM `tbl_use` where id = (?)',[req.params.userId], (error, results) => {
    if (error) {        
        res.redirect('/error',{error})        
    } else {           
      res.render("./t9mysqlCrud/userDetails", { results })      
    }
  });    
}



module.exports = {
  formGet,formPost,getAllUser,deleteUserById,getOneUserDetailByID
}
