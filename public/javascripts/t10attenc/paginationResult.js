let firstPage = document.getElementById('firstPage')
let perviousPage = document.getElementById('perviousPage')
let currentPage = document.getElementById('currentPage')
let nextPage = document.getElementById('nextPage')
let lastPage = document.getElementById('lastPage')
let totalRecord = document.getElementById('totalRecord')


nextPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) + 1 ; 

    nextPage.setAttribute('href',`/getAllStudentResult?pageNumber=${pageNumber}`)
});

perviousPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) - 1 ; 
    if(pageNumber <= 0 ){
        pageNumber =    1 
    }
    perviousPage.setAttribute('href',`/getAllStudentResult?pageNumber=${pageNumber}`)

    
});

firstPage.addEventListener('click',()=>{    
    
    let FirstPageNumber = 1 ;    
    firstPage.setAttribute('href',`/getAllStudentResult?pageNumber=${FirstPageNumber}`)

});

lastPage.addEventListener('click',()=>{      

    let LastPageNumber = parseInt(totalRecord.innerText) / 10 ;     
    lastPage.setAttribute('href',`/getAllStudentResult?pageNumber=${LastPageNumber}`)
    
    
});

if ( currentPage.innerText ==  "1" ){
    firstPage.style.display = "none";
    perviousPage.style.display = "none";
}

if ( currentPage.innerText ==  "20" ){
    lastPage.style.display = "none";
    nextPage.style.display = "none";
}

