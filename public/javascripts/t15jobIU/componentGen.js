let addEdu = document.getElementById('addEdu')
let removeEdu = document.getElementById('removeEdu')
let eduCon = document.getElementById('eduDetails')
let count = 1
addEdu.addEventListener('click',()=>{
    let div = document.createElement('div')
    div.className="container"
    
    div.innerHTML = `
                <div>
                <label for="CourseName">Course Name</label>
                <select name="CourseName" id="CourseName" class="req w-350p">
                <option selected disabled hidden value="">-- Select Course --</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    </select>                           
                    </div>

                    <div>
                    <label for="py">Passing Year</label>
                    <input  class="req"type="text" id="PassYear" name="PassYear" placeholder="yyyy">
                    </div>
                    
                    <div>
                    <label for="percentage">Percentage Year</label>
                    <input  class="req" type="text" id="Percentage" name="Percentage" placeholder="99.99">
                    </div> 
                    
                    `

                if(count !=  6){
                    ++count;
                    eduCon.insertBefore(div, document.getElementById("eduBtns"))
                }

})
                                
removeEdu.addEventListener('click',()=>{
      let remChild = eduCon.lastElementChild.previousElementSibling
      console.log(parent)
      if(count !=  1){
        --count;
        eduCon.removeChild(remChild)                  
      } 
})


let addExp = document.getElementById('addExp')
let removeExp = document.getElementById('removeExp')
let expCon = document.getElementById('expDetails')
let expcount = 1
addExp.addEventListener('click',()=>{
    let div = document.createElement('div')
    div.className="container"
    
    div.innerHTML = `
                            <div>
                            <label for="cName1">Company name</label>
                            <input class="req" type="text" id="cName1" name="comName" placeholder="esparkbiz">
                        </div>

                        <div>
                            <label for="des1">Designation</label>
                            <input  class="req" type="text" id="des1" name="preDesignation" placeholder="web developer">
                        </div>

                        <div>
                            <label for="fromDate1">Form</label>
                            <input class="req"  type="text" id="fromDate1" name="fromDate" placeholder="dd/mm/yyyy">
                        </div>

                        <div>
                            <label for="toDate1">To</label>
                            <input class="req"  type="text" id="toDate1" name="toDate" placeholder="dd/mm/yyyy">
                        </div> 
                    
                    `

                if(expcount !=  4){
                    ++expcount;
                    expCon.insertBefore(div, document.getElementById("expBtn"))
                }

})
                                
removeExp.addEventListener('click',()=>{
      let remChild = expCon.lastElementChild.previousElementSibling
      console.log(parent)
      if(expcount !=  1){
        --expcount;
        expCon.removeChild(remChild)                  
      } 
})