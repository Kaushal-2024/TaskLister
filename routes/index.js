var express = require('express');
const router  =  express.Router();



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
  
  res.sendFile(path.join(__dirname+'/../public/Task/t1dynemicTabel/index.html'));
 
});

router.get('/cucuCube',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t2cucuCube/index.html'));
 
});


router.get('/ticTacToa',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t3tic-tac-toe/index.html'));
 
});

router.get('/eyesClone',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t4eyesClone/index.html'));
 
});

router.get('/awanHoster',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t5awanHoster/index.html'));
 
});


router.get('/hireX',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t6hireX/index.html'));
 
});

router.get('/domeBord',async function(req, res, next) {
  
  res.sendFile(path.join(__dirname+'/../public/Task/t7dombord/index.html'));
 
});


module.exports = router;
