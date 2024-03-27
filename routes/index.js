var express = require('express');
var router = express.Router();
const path = require('path')
const sql = require('./sql-handler');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/checkLogin',async function(req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);
  let reso = await sql.checkUserAndPass(obj)
  console.log("respon form sql",{reso});

  res.send({reso})
  // if(reso ==  "done"){
  //  res.redirect('/dashboard')
  //  return 
    
  // }else{
  //   res.send({reso})
  // }

  // res.render('login');
});


router.get('/dashboard',async function(req, res, next) {
  console.log("got to dashboard route");

  res.render('dashboard');
});


router.get('/dynemicTable',async function(req, res, next) {
  console.log(__dirname);
  res.sendFile('/home/kaushal-talpara/1.eSparkBiz/4. Node/day-46/TaskLister/public/Task/t1dynemicTabel/index.html');
  // res.sendFile('../Task/t1dynemicTable/index.html')
});


module.exports = router;
