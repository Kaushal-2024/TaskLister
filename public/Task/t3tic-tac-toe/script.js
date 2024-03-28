var gTable = document.querySelectorAll('#gTable td') 
var user1 = document.getElementById('u1')
var user2 = document.getElementById('u2')
var result = document.getElementById('result')

var val =  ""

// user1= O and user2 = X 

user1.addEventListener('click',() => {
    clearbord();
    user1.style.border = "3px solid blue";
    val = "O" ;         
});

function clearbord(){
    for(var  i=0; i < gTable.length; i++ )
    {   
        gTable[i].textContent = " ";
    }
    user1.style.border="0px";
    user2.style.border="0px";
}  

document.getElementById('gTable').addEventListener('click',function(e){
 
    var ele = document.getElementById(e.target.id);
    if (ele.textContent == " "){
        ele.textContent =  val;
        checkWin();
        changeUser();
    }    
   
});

function changeUser(){
    if (val == "X"){
        user1.style.border= "3px solid blue";
        user2.style.border= "0px";
        val = "O";
    }
    else if(val == "O"){
        user2.style.border= "3px solid blue";
        user1.style.border= "0px";
        val = "X";
    }
}


winArray = [
    [0,1,2],
    [0,3,6],
    [6,7,8],
    [0,4,8],
    [2,5,8],
    [1,4,7],
    [2,4,6],
    [3,4,5]
];

function checkWin() {
    
    
    // console.log(records)

    // for(let i=0; i<records.length; i++){
    //     console.log(records[i].textContent)
    // } 

    for(let i=0; i<8; i++){       
            if(gTable[winArray[i][0]].textContent  == val &&
                gTable[winArray[i][1]].textContent  == val &&
                gTable[winArray[i][2]].textContent  == val  )
            {
                result.innerHTML= "<h2>"+val+" is Winner </h2>"
                clearbord();
            }
                
    }
     cehckWidRaw();

}

function cehckWidRaw(){

    let count =0;
    for(let i=0 ; i < 9; i++){
        if(gTable[i].textContent != " ")
        {
            count +=1;
        }
    }

    if(count == 9)
    {
        result.innerHTML= "<h2> Match draw </h2>"
        clearbord();
    }
}
