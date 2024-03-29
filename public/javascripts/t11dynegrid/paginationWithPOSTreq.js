

let firstPage = document.getElementById('firstPage')
let perviousPage = document.getElementById('perviousPage')
let currentPage = document.getElementById('currentPage')
let nextPage = document.getElementById('nextPage')
let lastPage = document.getElementById('lastPage')

let totalRecord = document.getElementById('totalRecord')
let pageNumber = parseInt(currentPage.innerText)


let selQry = document.getElementById('inputQRY')  

selQry = selQry.value;





nextPage.addEventListener('click',(event) => {    
    
    // event.preventDefault(); 
    pageNumber = parseInt(currentPage.innerText) + 1 || 1;
    let url =`?pageNumber=${pageNumber}`;
   
    
    console.log("from before vanila js :",url)
   
    // // let res = await postData(url)
    // // console.log("resoponce : ",res)
    // console.log("from after vanila js :",url)
    // window.location.href=url    

    nextPage.setAttribute('href',`?pageNumber=${pageNumber}&inputQRY=${selQry}`)

})



perviousPage.addEventListener('click', (event)=>{   
    
    // event.preventDefault(); 
    pageNumber = parseInt(currentPage.innerText) - 1 ; 
    if(pageNumber <= 0 ){
        pageNumber = 1 
    }
    // await postData(`?pageNumber=${pageNumber}`)
    perviousPage.setAttribute('href',`?pageNumber=${pageNumber}&inputQRY=${selQry}`)   
    
});

firstPage.addEventListener('click',(event)=>{    
    // event.preventDefault(); 

    pageNumber = 1 ;    
    // await postData(`?pageNumber=${pageNumber}`)
    firstPage.setAttribute('href',`?pageNumber=${pageNumber}&inputQRY=${selQry}`)   
    
});

lastPage.addEventListener('click',(event)=>{      

    // event.preventDefault(); 
    pageNumber = parseInt(totalRecord.innerText) /10 ;     

    lastPage.setAttribute('href',`?pageNumber=${pageNumber}&inputQRY=${selQry}`)   
    // await postData(`?pageNumber=${pageNumber}`)
    
});





if ( currentPage.innerText <=  "1" ){
    firstPage.style.display = "none";
    perviousPage.style.display = "none";
}

let limit = parseInt(totalRecord.innerText)/10
if ( currentPage.innerText >=  limit ){
    lastPage.style.display = "none";
    nextPage.style.display = "none";
}



// make post request in url

async function postData(url){
    try {
        const response = await fetch(url, {
          method: "POST",
          redirected: "true",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jsonkey:josnvalue}),
        }).then(response => {
            // HTTP 301 response
            // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
            

            if (response.ok) {
                console.log("OK")
                console.log(response)
            }else{
                console.log("NOT OK")
                console.log(response)
            }  

            if (!response.redirected) {
                window.location.href = response.url;
            }
        })         
          

        
      } catch (error) {
        console.error("Error:", error);
      }    
}