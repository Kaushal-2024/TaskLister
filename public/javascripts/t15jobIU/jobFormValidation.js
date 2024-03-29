function validateJobForm(id) {
    let isValid = true ;   
    console.log("validation ma gyu");

    let removeVal = document.querySelectorAll(".tempValMes");   
    // old validation msg remove
    for(ele of removeVal){       
        ele.remove();
    }

    let inputs = document.querySelectorAll(`#${id} input, #${id} select, #${id} textarea`);  
    console.log("ane break akrvan oice",inputs);  
  
    isValid = validateReqFields(inputs) 
   
    if(isValid == true && id == 'basicDetails'){
        let mail = validateEmail(inputs[7]  ) 
        let date = validateDate(inputs[3]) 
        let cno = validateCno(inputs[6]) 
        let zip = validateZipcode(inputs[12])
        
        if (mail && date && cno && zip){    
            isValid = true
        }else{
            isValid = false 
        }   
    }    
   
    return isValid;    
    
} 


function validateReqFields(reqInputs){
    console.log("req",reqInputs);
    let checker = true   

    for (let reqInput of reqInputs){        
     //  console.log(reqInput)
        if (reqInput.value == ""  &&  reqInput.type != "hidden" ) {
          console.log("empty : " ,reqInput)
            
          valMessageGenrator(reqInput ," Required ")
            
            checker = false;
        }

        
    }
    
    if(!document.querySelector('input[name = "gender"]:checked'))
    {
        let valMess = document.createElement("p");
        
        
        valMess.className = "tempValMes"            
        valMess.textContent = `${reqInputs['gender'].name} must be req (FE)`
        valMess.style.fontSize = "15px";
        valMess.style.color = "red";

        console.log("radio gender",valMess.textContent)
        //console.log(valMess)
        let parentNode = reqInputs['gender'].parentNode.parentNode; 
        parentNode.appendChild(valMess);
        checker = false;
    }


    return checker;
}


function validateEmail(emailValue){

    
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    console.log(emailValue.value)
    if(!emailValue.value.match(validEmailRegex)){        
        valMessageGenrator(emailValue," valid form ")
        return false ;        
    }  
   
    return true;
}


function validateDate(DateValue){
    const validDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;

    
    if(!DateValue.value.match(validDateRegex)){        
        valMessageGenrator(DateValue," valid form ")
        return false ;        
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
function validateZipcode(zipcodeValue){
    const validZipRegex = /^[0-9]{6}$/g;

    if(!zipcodeValue.value.match(validZipRegex)){        
        valMessageGenrator(zipcodeValue," valid form ")
        return false ;        
    }  
   
    return true;

}

function valMessageGenrator(inputsVal,message){
    
    let valMess = document.createElement("p");        
      
        valMess.className = "tempValMes"            
        valMess.textContent = `${inputsVal.name} must be ${message} (FE)`
        valMess.style.fontSize = "15px";
        valMess.style.color = "red";
   
        let parentNode = inputsVal.parentNode; 
        parentNode.appendChild(valMess);
}