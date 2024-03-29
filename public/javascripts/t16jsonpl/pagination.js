let firstPage = document.getElementById('firstPage')
let perviousPage = document.getElementById('perviousPage')
let currentPage = document.getElementById('currentPage')
let nextPage = document.getElementById('nextPage')
let lastPage = document.getElementById('lastPage')
// let totalRecord = document.getElementById('totalRecord')

let pageLimit = 10;

let totalRecord = 0;

nextPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) + 1 ; 
    let offset = (pageNumber-1 ) * pageLimit;     
    currentPage.innerText = pageNumber
    createPostsView(allData.slice(offset,pageLimit+offset))    
    currentPageChecker()
});

perviousPage.addEventListener('click',()=>{    
    
    let pageNumber = parseInt(currentPage.innerText) - 1 ; 
    if(pageNumber <= 0 ){
        pageNumber =  1 
    }   
    let offset = (pageNumber-1 ) * pageLimit;     
    currentPage.innerText = pageNumber
    createPostsView(allData.slice(offset,pageLimit+offset))  
    currentPageChecker()
});

firstPage.addEventListener('click',()=>{    
    
    let pageNumber =  1 ;     
    let offset = (pageNumber-1 ) * pageLimit;     
    currentPage.innerText = pageNumber
    createPostsView(allData.slice(offset,pageLimit+offset))   
    currentPageChecker() 

});

lastPage.addEventListener('click',()=>{      

    let pageNumber = Math.round(allData.length / pageLimit );     
    let offset = (pageNumber-1 ) * pageLimit;     
    currentPage.innerText = pageNumber
    createPostsView(allData.slice(offset,pageLimit+offset))
    currentPageChecker()   
});




function currentPageChecker(){  
    let lastPageNumber = Math.round(totalRecord / pageLimit);
   
    if (currentPage.innerText == "1"){
        firstPage.style.visibility = "hidden";
        perviousPage.style.visibility = "hidden";
    }else{
        firstPage.style.visibility = "visible";
        perviousPage.style.visibility = "visible";
    }

    if (currentPage.innerText == lastPageNumber){
        lastPage.style.visibility = "hidden";
        nextPage.style.visibility = "hidden";
    }else{
        lastPage.style.visibility = "visible";
        nextPage.style.visibility = "visible";
    }
}

currentPageChecker()
