const { response } = require("express")

if(window.location.href.split('/')[3] !== 'jobUpdate'){
    document.getElementById('submitBtn').addEventListener('click', submi)
}
async function submi() {
    
    // create lang details all array for mapping
    let all = document.querySelectorAll('.setDefVal')
    console.log(all)
    
    for(ele of all){

        if(ele.checked){
            
            ele.value = "1"
        }        
        console.log("elemetnt cehck ",ele)
        ele.checked = true
    }

    // create tech detial array    
    let techLevelArray = document.getElementById('techLevelArray')
    let radios = document.querySelectorAll('.radioCheckVal')
    console.log(radios)
    
    let levelarray = []

    for(let ele of radios){

        if(ele.checked){
            
            levelarray.push(ele.value)
        }         
    
    }

    techLevelArray.value = JSON.stringify(levelarray)
    
    console.log(levelarray);

    
    let obj =new URLSearchParams( new FormData(document.getElementById('jobAppForm')))
    
    console.log("ajex mate no obj",obj);

    if(validateJobForm(`prefDetails`)){
        let msg = await fetch('/jobRegistration', {
            method: "POST",        
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",          
            },        
            body: obj, 
        })

        document.getElementById("jobAppForm").reset(); 
        if(msg.ok){
            document.getElementById('stmsg').innerHTML = "<h3> Data Inserted</h3>"
        }
    }
}


