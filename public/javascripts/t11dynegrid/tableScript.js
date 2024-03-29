let allTableHead = document.querySelectorAll('th');    
console.log("tabeleScript ",allTableHead)


let flag = localStorage.getItem('flag') || 0 ;
let type = localStorage.getItem('type') || '#upArrow';

for (let i = 0; i < allTableHead.length; i++){
  
   
    allTableHead[i].addEventListener("click", function() {
   
        console.log(allTableHead[i])  
  

        const urlParams = new URLSearchParams(window.location.search);      
        
        urlParams.set('orderBy', allTableHead[i].id);
        urlParams.set('pageNumber',1);

   
        let orderByType   = urlParams. get('orderByType') ;
       
        if (flag == i){
            if(orderByType == 'asc'){
                urlParams.set('orderByType', 'desc');              
                type = localStorage.setItem('type','#downArrow');
        
            }else{
                urlParams.set('orderByType', 'asc'); 
                type = localStorage.setItem('type','#upArrow');     
            }
        }else{
            urlParams.set('orderByType', 'asc'); 
            type = localStorage.setItem('type','#upArrow');      
        }

        flag = localStorage.setItem('flag',i);
        
        window.location.search = urlParams;
    });

}

// allTableHead[flag].querySelector(type).style.backgroundColor = 'yellow';
allTableHead[flag].querySelector(type).className = 'highlight';