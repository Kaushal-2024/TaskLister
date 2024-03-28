let firstPage = document.getElementById('firstPage')
let perviousPage = document.getElementById('perviousPage')
let currentPage = document.getElementById('currentPage')
let nextPage = document.getElementById('nextPage')
let lastPage = document.getElementById('lastPage')
let totalRecord = document.getElementById('totalRecord')



let orderByDropdown = document.querySelector('#orderByDropdown')
let currentOrderByItem = localStorage.getItem("currentOrderByItem") || "stud_id";

orderByDropdown.addEventListener('change',() =>{
    currentOrderByItem = orderByDropdown.options[orderByDropdown.selectedIndex].value;   
    localStorage.setItem("currentOrderByItem", currentOrderByItem);
    firstPage.click();

}); 


let orderByTypeDropdown = document.querySelector('#orderByTypeDropdown')
let currentOrderType = localStorage.getItem("currentOrderType") || "asc";

orderByTypeDropdown.addEventListener('change',() =>{
    currentOrderType = orderByTypeDropdown.options[orderByTypeDropdown.selectedIndex].value; 
    
    localStorage.setItem("currentOrderType", currentOrderType);
    firstPage.click(); 

});


let monthDD = document.querySelector('#monthDropdown')
let currentMonth =  localStorage.getItem("currentMonth") || 12

monthDD.addEventListener('change',() =>{
    currentMonth = monthDD.options[monthDD.selectedIndex].value;
    localStorage.setItem("currentMonth",currentMonth)
    firstPage.click();
});


let yearDD = document.querySelector('#yearDropdown')
let currentYear =  localStorage.getItem("currentYear") || 2023

yearDD.addEventListener('change',() =>{
    currentYear = yearDD.options[yearDD.selectedIndex].value;
    localStorage.setItem("currentYear",currentYear)
    firstPage.click();

});


orderByDropdown.value = currentOrderByItem;
orderByTypeDropdown.value = currentOrderType; 
monthDD.value = currentMonth;
yearDD.value =  currentYear;




nextPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) + 1 ; 

    nextPage.setAttribute('href',`/getAllStudentAttendance?pageNumber=${pageNumber}&orderByFiled=${currentOrderByItem}&orderType=${currentOrderType}&month=${currentMonth}&year=${currentYear}`)
});

perviousPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) - 1 ; 
    if(pageNumber <= 0 ){
        pageNumber =    1 
    }
    perviousPage.setAttribute('href',`/getAllStudentAttendance?pageNumber=${pageNumber}&orderByFiled=${currentOrderByItem}&orderType=${currentOrderType}&month=${currentMonth}&year=${currentYear}`)   

    
});

firstPage.addEventListener('click',()=>{    
    
    let FirstPageNumber = 1 ;    
    firstPage.setAttribute('href',`/getAllStudentAttendance?pageNumber=${FirstPageNumber}&orderByFiled=${currentOrderByItem}&orderType=${currentOrderType}&month=${currentMonth}&year=${currentYear}`)   
    orderByDropdown.setItem = currentOrderByItem;

});

lastPage.addEventListener('click',()=>{      

    let LastPageNumber = parseInt(totalRecord.innerText) / 10 ;     
    lastPage.setAttribute('href',`/getAllStudentAttendance?pageNumber=${LastPageNumber}&orderByFiled=${currentOrderByItem}&orderType=${currentOrderType}&month=${currentMonth}&year=${currentYear}`)
    
    
});

if ( currentPage.innerText ==  "1" ){
    firstPage.style.display = "none";
    perviousPage.style.display = "none";
}

if ( currentPage.innerText ==  "20" ){
    lastPage.style.display = "none";
    nextPage.style.display = "none";
}

