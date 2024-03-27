function validateJobForm() {
    let isValid = true;

    let removeVal = document.querySelectorAll(".tempValMes");
    // old validation msg remove
    for (ele of removeVal) {
        ele.remove();
    }

    let inputs = document.querySelectorAll(`input`);
    console.log("ane break akrvan oice", inputs);

    isValid = validateReqFields(inputs)

    return isValid;
}

function validateReqFields(reqInputs) {
    console.log("req", reqInputs);
    let checker = true

    for (let reqInput of reqInputs) {
        if (reqInput.value == "") {
            console.log("empty : ", reqInput)
            valMessageGenrator(reqInput, " Required ")
            checker = false;
        }else{
             if(reqInput.name == 'email'){
                var emC = validateEmail(reqInput) 
             }
 
             if(emC){
                 checker = true;
             }else{
                 checker = false;
             }         
        }
    }

    return checker;
}

function valMessageGenrator(inputsVal, message) {

    let valMess = document.createElement("p");

    valMess.className = "tempValMes"
    valMess.textContent = `${inputsVal.name} must be ${message} (FE)`
    valMess.style.fontSize = "15px";
    valMess.style.color = "red";

    let parentNode = inputsVal.parentNode;
    parentNode.appendChild(valMess);
}

document.getElementById('loginBtn').addEventListener('click', regBtn)

document.getElementById('loginBtn').addEventListener('keydown', function (e) {
    if (e.code === "Enter") {
        regBtn()
    }
});

async function regBtn() {

    if (validateJobForm()) {      

        obj = new URLSearchParams(new FormData(document.getElementById('loginForm')))
        let msg = await fetch('/checkLogin', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: obj
        })
        msg = await msg.json()

        if(msg.reso == "done"){
           // console.log("dashbord jav");    
            window.location.href = "/dashboard"
        }else{
            document.getElementById('fgBtn').innerText= " Invalid username and password"
        }

        
        console.log("rout mathi avle res",msg);

        
    } else {
        console.log("validate ny thatu");

    }
}




function validateEmail(emailValue){

    
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;    
    if(!emailValue.value.match(validEmailRegex)){        
        valMessageGenrator(emailValue," valid form ")
        return false ;        
    }  
   
    return true;
}

