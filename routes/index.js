var express = require('express');
const router  =  express.Router();
const uuid = require("uuid");
const path = require('path')
const sql = require('./sql-handler');

const sessions = {};


router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login',async function(req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body));
  console.log("from mathi madel obj",obj);
  let reso = await sql.checkUserAndPass(obj)
  console.log("respon form sql",{reso});

  
  if(reso == "done"){
    const sessionToken = uuid.v4();
    const expiresAt = new Date().setFullYear(new Date().getFullYear() + 1);
    sessions[sessionToken] = {
      expiresAt,
      userId: obj.email,
    };

    res.cookie("session_token", sessionToken, { maxAge: expiresAt });
  }
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
  
  const sessionToken = req.cookies["session_token"];

  if (!sessionToken) {
    return res.redirect('/login');
  }

  const currentUserSession = sessions[sessionToken];

  if (!currentUserSession) {
   return res.redirect('/login');
  }

  if (currentUserSession.expiresAt < new Date()) {
    return res.redirect('/login');
  }
  
  console.log("got to dashboard route");

  res.render('dashboard');
});



router.get('/regUser', function(req, res, next) {
  res.render('form');
});

router.post('/regUser',async function(req, res, next) {
  let obj = JSON.parse(JSON.stringify(req.body)) 

  let activation_code = await sql.insertUser(obj)    

  res.send({activation_code});
  
  
});


router.get('/confirmReg/:a_code',async function(req, res, next) {
  console.log("from confrim page" ,req.params.a_code);
  let checkeTime =await  sql.isCodeActivated(req.params.a_code)

  if(checkeTime){
    
     sql.updateStates(req.params.a_code)
     res.render('regConfirm');

  }else{

   res.redirect('/regUser')
  }
});



router.get('/getAllEmailId',async function(req, res, next) { 
  
  let allEmail = await sql.getAllEmail()    
  
  res.send(JSON.parse(JSON.stringify(allEmail)));
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
