
console.log("validation file linked")

function validateForm() {
    let message = document.getElementById('message');
    let inputs = document.forms["studentRegistrationForm"];
    
    // let reqInputs = inputs.getElementsByClassName('req')
    let msgString =``;
    
    msgString =  msgString.concat(validateReqFields(inputs.getElementsByClassName('req')))

    if (msgString.length != 0){
        message.innerHTML = msgString;
        return false
    }    

    msgString =  msgString.concat(validateEmail(inputs['email']))
    msgString =  msgString.concat(validateDate(inputs['dob']))
    msgString =  msgString.concat(validateCno(inputs['mobileNumber']))    
    msgString =  msgString.concat(validateZipcode(inputs['zipcode']))    

    
    if (msgString.length == 0){
        return true
    }    
    
    message.innerHTML = msgString;  
    return false;
    
    
} 

function validateReqFields(reqInputs){
    
    let msgString = ``
    

    for (let reqInput of reqInputs){        
        console.log(reqInput)
        if (reqInput.value == "") {
           msgString =  msgString.concat(`<p>${reqInput.name} Name must be filled out (FE)</p>`);           
        }
    }

    return msgString;
}

function validateEmail(emailValue){
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if(!emailValue.value.match(validEmailRegex)){
        return `<p> Enter Right validate email form (FE)</p>`
    }  
   
    return ``;
}

function validateDate(DateValue){
    const validDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;

    if(!DateValue.value.match(validDateRegex)){
        return `<p> Enter Right valid date of birth (FE) </p>`
    }   
   
    return ``;

}

function validateCno(cnoValue){
    const validCnoRegex = /^[0-9]{10}$/g;

    if(!cnoValue.value.match(validCnoRegex)){
        return `<p> Enter Right validate Connect Number form (FE)</p>`
    }  
   
    return ``;

}
function validateZipcode(zipcodeValue){
    const validZipRegex = /^[0-9]{6}$/g;

    if(!zipcodeValue.value.match(validZipRegex)){
        return `<p> Enter Right validate Zip code form (FE)</p>`
    }    
    return ``;

}