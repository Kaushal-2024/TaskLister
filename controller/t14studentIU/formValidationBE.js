function validateFormObj(reqObj) {
    
   
    console.log("form validet ob:",reqObj)   
    let msgString =``;
    
    msgString =  msgString.concat(validateReqFields(reqObj))
    console.log("stirng recive form fucntion",msgString)
    if (msgString.length != 0){
        return msgString;
    }    

    msgString =  msgString.concat(validateEmail(reqObj.email))
    msgString =  msgString.concat(validateDate(reqObj.dob))
    msgString =  msgString.concat(validateCno(reqObj.mobileNumber))    
    msgString =  msgString.concat(validateZipcode(reqObj.zipcode))    
    
    return msgString;    
    
} 

function validateReqFields(reqInputs){
    
    let msgString = ``    

    for ([filed,value] of Object.entries(reqInputs)){       
        
        if (value == "") {
           msgString =  msgString.concat(`<p>${filed} Name must be filled out (BE)</p>`);           
        }
    }

    return msgString;
}

function validateEmail(emailValue){
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if(!emailValue.match(validEmailRegex)){
        return `<p> Enter Right validate email form (BE)</p>`
    }  
   
    return ``;
}

function validateDate(DateValue){
    const validDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;

    if(!DateValue.match(validDateRegex)){
        return `<p> Enter Right valid date of birth (BE) </p>`
    }   
   
    return ``;

}

function validateCno(cnoValue){
    const validCnoRegex = /^[0-9]{10}$/g;

    if(!cnoValue.match(validCnoRegex)){
        return `<p> Enter Right validate Connect Number form (BE)</p>`
    }  
   
    return ``;

}
function validateZipcode(zipcodeValue){
    const validZipRegex = /^[0-9]{6}$/g;

    if(!zipcodeValue.match(validZipRegex)){
        return `<p> Enter Right validate Zip code form (BE)</p>`
    }    
    return ``;

}

module.exports= {
    validateFormObj
}