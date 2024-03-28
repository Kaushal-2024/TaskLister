var tGame = document.getElementById('tGame');
//var target = document.getElementById('target');

var score = 0;
var scrPrint = document.getElementById('scoreCount');


var timeLeft = 45;
var elem = document.getElementById('Timer');
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    
    elem.innerHTML = " Timeout";    
    clearTimeout(timerId);
    document.getElementById("bord").style.pointerEvents = "none";
    
  } else {
    elem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}


// target.addEventListener('click',function(){
//     //add row and colum with change color and set target
    
//     target.removeAttribute("id");
//     addRowColum();
    
// });

document.addEventListener("click", function(e){
    const target = e.target.closest("#target"); // Or any other selector.
  
    if(target){
        score += 1;
        scrPrint.innerHTML="Score : "+ score +"";
        target.removeAttribute("id");
        addRowColum();
        
    }
    // var ar_coins = document.querySelectorAll("td:not(#target)"); 
    // for(var xx=0;xx < ar_coins.length;xx++)
    // {
    //     ar_coins.item(xx).addEventListener('click',function(){
    //         alert("You are colorBlind Just Like me");
   
    //     });
    // }
});




function addRowColum(){

    // row add

    var rowCount = tGame.rows.length;
    var columesCount = tGame.rows[0].cells.length;

    var tr = tGame.insertRow(rowCount);
   
    for (var cellMaker = 0; cellMaker < columesCount; cellMaker++) {
        
        var td = document.createElement("td");        
        td = tr.insertCell(cellMaker); 
        
    }


    // colum add
    var trs = document.querySelectorAll('#tGame tr');    
    for (var tr of trs) { 
        var td = document.createElement('td');       
        tr.appendChild(td);
    }

    // change table color
    changeTBcolor();
   
}

function changeTBcolor(){  

    var color = getRandomColor();
    var x = document.getElementById("tGame").getElementsByTagName("td");       
   
    for (var i=0; i<x.length; i++){
        x[i].style.backgroundColor = color;
        x[i].style.opacity= 1.0;           
    }

    // tGame.setAttribute('bgcolor',getRandomColor());      
    // tGame.style.backgroundColor = getRandomColor();

    
    var randomNum = Math.floor(Math.random() * (parseInt(x.length) ));
    x[parseInt(randomNum)].style.opacity -= 0.3;

    x[parseInt(randomNum)].setAttribute('id','target');
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
