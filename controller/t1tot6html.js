const path = require('path')


const dynemicTabel = function (req,res) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t1dynemicTabel/index.html'));   
}
 
const cucuCube = function (req,res) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t2cucuCube/index.html')); 
  }
  
const ticTacToa = function (req,res,next) {  
   res.sendFile(path.join(__dirname+'/../public/Task/t3tic-tac-toe/index.html'));
 
}

const eyesClone = function (req,res,next) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t4eyesClone/index.html'));
  
}

const awanHoster = function (req,res,next) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t5awanHoster/index.html'));
 
}

const hireX = function (req,res,next) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t6hireX/index.html'));
 
}

const domeBord = function (req,res,next) {  
    res.sendFile(path.join(__dirname+'/../public/Task/t7dombord/index.html'));
 
}


module.exports = {
  dynemicTabel,cucuCube,ticTacToa,eyesClone,awanHoster,hireX,domeBord
}  