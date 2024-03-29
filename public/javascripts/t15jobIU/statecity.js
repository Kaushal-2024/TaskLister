(function(){
    const getStateData = new XMLHttpRequest();
    
    getStateData.onload = function() {
     
        let stateData =JSON.parse(this.responseText)
        let stateSelect = document.getElementById("state")      


        let op = document.createElement('option')
        op.value = "";
        op.innerText = "-- Select State --";
        op.hidden = true;
        op.selected = true;
        op.disabled = true;
        stateSelect.appendChild(op)


        stateData.forEach(element => {
            let op = document.createElement('option')
            op.value = element.id;
            op.innerText = element.name;
            stateSelect.appendChild(op)
        }); 
    }
    
    getStateData.open("GET", "/getStateData", true);
    getStateData.send();    
   
    
})()

let stateSelect = document.getElementById('state')
let citySelect = document.getElementById('city')

let op = document.createElement('option')
        op.value = "";
        op.innerText = "-- Pela State Select karo --";
        op.hidden = true;
        op.selected = true;
        op.disabled = true;
        citySelect.appendChild(op)


stateSelect.addEventListener('change',fillCityByState);

function fillCityByState(){
    
   
    
    let selectedStateId =stateSelect.options[stateSelect.selectedIndex].value;
    
    const getCityData = new XMLHttpRequest();
    
    getCityData.onload = function() {
     
        let cityData =JSON.parse(this.responseText)
        // console.log(cityData);     
        
        
        citySelect.innerHTML =''      

        let op = document.createElement('option')
        op.value = "";
        op.innerText = "-- Select City --";
        op.hidden = true;
        op.selected = true;
        op.disabled = true;
        citySelect.appendChild(op)


        cityData.forEach(element => {
            let op = document.createElement('option')
            op.value = element.id;
            op.innerText = element.city;
            citySelect.appendChild(op)
        }); 
    }

    getCityData.open("GET", `/getCityData/${selectedStateId}`, false);
    getCityData.send();


    console.log(selectedStateId);
}