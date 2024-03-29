function displayDate(){
    document.getElementById('onClickEvent').innerHTML =  Date()
    alert("onClick Event tirgger. with HTML attribute")
}

function focusOut(){
    alert("onBlur event trigger.")
}

function fireAlert(element){
    alert(element.id + " is trigger.")
    //alert("event trigger")
}

var ele = document.getElementById('onClickEvent');

ele.onclick = function(){
    alert("first event")
} 

ele.addEventListener('click',function(){
    alert("addeventListener method");
});

ele.onclick = function(){
    alert("DOM attruibutr")
} 

function dummy(){
    alert("dummy function");
}