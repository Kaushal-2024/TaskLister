
async function validateJobForm() {
    
    let isValid = true;
  
    let removeVal = document.querySelectorAll(".tempValMes");
  
    // old validation msg remove
    for (ele of removeVal) {
        ele.remove();
    }

    let inputs = document.querySelectorAll(`input`);  

    isValid = await validateReqFields(inputs)   
   
    return isValid;
}

async function validateReqFields(reqInputs) {
    
    console.log("req", reqInputs);
    let checker = true

    await reqInputs.forEach( async(reqInput) => {

        if (reqInput.value == "") {
            console.log("empty : ", reqInput)
            valMessageGenrator(reqInput, " Required ")
            checker = false;
        }
    });

   
          
        if(reqInputs[2].name == 'email'){
           var emC = validateEmail(reqInputs[2]) 
           console.log("emial ma gyu");

            let allEmail = await (await fetch('/getAllEmailId')).json()
            console.log("late ty gyu");
            // allEmail = await allEmail.json()
            
            console.log("all Email ids",allEmail);

            allEmail.forEach(element => {
               console.log(reqInputs[2].value);
                if(element.email == reqInputs[2].value){
                   
                    console.log("math ty gy email ");
                    valMessageGenrator(reqInputs[2],"")
                    emC = false;                          
                }else{
                    emC = true
                }
            });

           
        }
        if(reqInputs[3].name == 'mobile'){
            console.log("mobile ma gyu");

            var moC = validateCno(reqInputs[3]) 

        }
        if(reqInputs[5].name == "conPass"){
            console.log("comparess password");
            var passC = confirmPass(reqInputs[5])
        }           
      

    console.log(emC,moC,passC);
        if(emC && moC && passC){
            console.log("badhu sacu cce");
            checker = true;
        }else{
            console.log("ky to kotu ce");
            checker = false;
        }
    console.log("checker",checker);
    return checker;
}

function valMessageGenrator(inputsVal, message) {

    let valMess = document.createElement("p");

    valMess.className = "tempValMes"

    if(inputsVal.name == "email" && message == ""){
        valMess.textContent = `email already registered`
    }else{
        valMess.textContent = `${inputsVal.name} must be ${message} (FE)`
    }
    valMess.style.fontSize = "15px";
    valMess.style.color = "red";

    let parentNode = inputsVal.parentNode;
    parentNode.appendChild(valMess);
}

document.getElementById('regBtn').addEventListener('click', regBtn)

document.getElementById('regBtn').addEventListener('keydown', function (e) {
    if (e.code === "Enter") {
        regBtn()
    }
});

async function regBtn() {

    let validate = await validateJobForm()

   
    if (validate) {
        console.log("Create link to verification");

        obj = new URLSearchParams(new FormData(document.getElementById('regForm')))
        let msg = await fetch('/regUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: obj
        })
        msg = await msg.json()


        let timeleft = 10;
        let downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("linkMsg").innerHTML = "Link is expire";
                document.getElementById("linkVal").innerHTML = "";
            } else {
                document.getElementById("linkMsg").innerHTML = "for confirmation click below link in " + timeleft + " sec";
            }
            timeleft -= 1;
        }, 1000);


        document.getElementById('stmsg').innerHTML = `            
        <p id="linkMsg"></p>
        <a id="linkVal" href="/confirmReg/${msg.activation_code}">http://localhost:3000/confirmReg/${msg.activation_code}</a>
        `

    } else {
        console.log("validate ny thatu");

    }
}

document.getElementById('resBtn').addEventListener('click', () => {
    let removeVal = document.querySelectorAll(".tempValMes");
    // old validation msg remove
    for (ele of removeVal) {
        ele.remove();
    }
    document.getElementById("regForm").reset();

})



function validateEmail(emailValue){

    
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;    
    if(!emailValue.value.match(validEmailRegex)){        
        valMessageGenrator(emailValue," valid form ")
        return false ;        
    }  
   
    return true;
}

function confirmPass(conPass){
    let mainPass = document.getElementById('password')

    if( mainPass.value != conPass.value){
        console.log("match ny thatu");
        valMessageGenrator(conPass," same as password")
        return false;
    }
    return true;
}

function validateCno(cnoValue){
    const validCnoRegex = /^[0-9]{10}$/g;

    if(!cnoValue.value.match(validCnoRegex)){        
        valMessageGenrator(cnoValue," valid form ")
        return false ;        
    }  
   
    return true;

}