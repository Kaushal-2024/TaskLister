let citySel = document.getElementById('searchCity');
(async function(){

    console.log("dfjefe");
    let cityData = await fetch('/fetchCityData',{        
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(res => res)
   
    cityData.forEach(element => {
        
        let op = document.createElement('option')
        op.value = element.timezone
        op.innerText = element.city

        citySel.appendChild(op)
    });
})()

citySel.addEventListener('change',()=>{
    let selectedTimeZone = citySel.options
    [citySel.selectedIndex].value;  
     
    let localTime = new Date().toLocaleString('en-us',{timeZone: selectedTimeZone})

    document.getElementById('resultTime').innerText = localTime;
    
})



