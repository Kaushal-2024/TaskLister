let formParts= document.querySelectorAll('.main')
console.log("from na part no array ",formParts);
let currentPageIndex = 0

formParts.forEach(ele =>{
    ele.classList.add("hidden");
})

formParts[currentPageIndex].classList.remove("hidden")

// let next = formParts.splice(formParts.length-1, 1)
Object.values(formParts).forEach(ele=>{
    // console.log(ele.id);

    document.getElementById(ele.id + "Next").addEventListener("click",()=>{
        
        if(validateJobForm(ele.id)){
            formParts.forEach(ele =>{
                ele.classList.add("hidden");
            })  

            formParts[++currentPageIndex].classList.remove("hidden")
        }
    });
});

Object.values(formParts).forEach(ele=>{
    
    document.getElementById(ele.id + "Prev").addEventListener("click",()=>{
        formParts.forEach(ele =>{
            ele.classList.add("hidden");
        }) 
       
        formParts[--currentPageIndex].classList.remove("hidden")
    });
});


// stepper logic
let allNavBtn = document.getElementById('navbar').childNodes;
Object.values(allNavBtn).forEach(ele=>{
    
    ele.addEventListener("click",()=>{
        formParts.forEach(ele =>{
            ele.classList.add("hidden");
            
        })         
        formParts[ele.className].classList.remove("hidden")
        currentPageIndex = parseInt(ele.className)
    });
});