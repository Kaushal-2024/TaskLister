const express = require('express');
const router = express.Router();
const dbConn = require('../../connection')


router.get("/t9form", (req, res) => {
  console.log("t9 form hit");
  res.render("./t9mysqlCrud/form")
});

router.post("/t9form", (req, res) => {
  console.log("t9 post hit");
    console.log(req.body)
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

});

router.get("/t9getAllUser", (req, res) => {
  dbConn.query('SELECT * FROM `tbl_use`', (error, results) => {
    if (error) {        
        res.redirect('/error',{error})        
    } else {
      
      res.render("./t9mysqlCrud/allUserList", { results })     
    }
  });  
});

router.get("/t9deleteUser/:userId", (req, res) => {
  console.log(req.params.userId)
  dbConn.query('delete from `tbl_use` where id = ?' ,[req.params.userId], (error,results) => {
    if (error) {                
        res.redirect('/error',{error})        
    } else {        
      res.redirect('/t9getAllUser')  
      // res.status(200).send('User deleted successfully');  
    }
  });  
});


router.get("/t9userDetails/:userId", (req, res) => {
  
  dbConn.query('SELECT * FROM `tbl_use` where id = (?)',[req.params.userId], (error, results) => {
    if (error) {        
        res.redirect('/error',{error})        
    } else {           
      res.render("./t9mysqlCrud/userDetails", { results })      
    }
  });    
})



module.exports = router;
