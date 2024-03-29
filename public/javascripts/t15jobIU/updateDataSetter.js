(async function () {
    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    let route = window.location.href.split('/')[3];

    if (route == "jobUpdate") {
        let btn = document.getElementById('submitBtn')
        btn.value = "Update"
        btn.id = "updateBtn"



        let data = await fetch('/fetchUserData/' + id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(res => res)

        setBasicData(data[0])
        setEduData(data[1])
        setExpData(data[2])
        selLangData(data[3])
        setTechData(data[4])
        setRefData(data[5])
        setPrefData(data[6][0])


        btn.addEventListener('click', async () => {
            
            
           
            
            // create lang details all array for mapping
            let all = document.querySelectorAll('.setDefVal')
            console.log(all)
            
            for (ele of all) {
                console.log("update no check th");
                if (ele.checked) {
                    
                    ele.value = "1"
                }
                console.log("elemetnt cehck ", ele)
                ele.checked = true
            }
            
            // create tech detial array    
            let techLevelArray = document.getElementById('techLevelArray')
            let radios = document.querySelectorAll('.radioCheckVal')
            console.log("raduo :",radios)
            
            let levelarray = []
            
            for (let ele of radios) {
                
                if (ele.checked) {
                    
                    levelarray.push(ele.value)
                }
                
            }
            
            techLevelArray.value = JSON.stringify(levelarray)         
            let upobj = new URLSearchParams(new FormData(document.getElementById('jobAppForm')))
            console.log("ajex mate no obj", upobj);
            
            if (validateJobForm(`prefDetails`)) {
                
                let msg = await fetch('/jobUpdate/' + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: upobj,
                });

                if(msg.ok){
                    document.getElementById('stmsg').innerHTML = "<h3> Data Updated</h3>"
                }
                
            }
        });
    }

    

})()

function setPrefData(obj) {
    console.log("object made ce", obj);
    document.getElementById('notPer').value = obj.noticePreiod;
    document.getElementById('exCTC').value = obj.expactedCTC;
    document.getElementById('cuCTC').value = obj.currentCTC;

    document.getElementById('prefArray').value = obj.p_id;
    let dept = document.getElementById('dept')

    Object.values(dept.options).forEach(ele => {
        if (ele.value == obj.deparment) {

            ele.selected = true
        }
    })

    let prefL = document.getElementById('ploca')

    let prAr = obj.preferdLoc.split(',')

    Object.values(prefL.options).forEach(ele => {

        prAr.forEach(prval => {
            if (ele.value == prval) {

                ele.selected = true
            }

        })
    })
}



function setRefData(obj) {

    count = 1
    obj.forEach(ele => {

        document.getElementById('r_name' + count).value = ele.r_name;
        document.getElementById('con_number' + count).value = ele.con_number;
        document.getElementById('relation' + count).value = ele.relation;
        document.getElementById('refArray'+count).value = ele.r_id

        count++;

    });
}

function setTechData(obj) {

    obj.forEach(ele => {
        let check = document.getElementById(ele.t_name)
        check.checked = true;
        let rdId = `${ele.t_name}${ele.t_knowlevel}`        
        let radio = document.getElementById(rdId)
        radio.checked = true;

        document.getElementById(ele.t_name+'Id').value = ele.t_id;
    });
}

function selLangData(obj) {
    console.log('a ne lang ma fit karvano ce',obj);
    let def = document.querySelectorAll('.setDefVal')
    console.log(def);

    

    obj.forEach(ele =>{
        document.getElementById(ele.l_name).checked = true

        if(ele.isRead == "1")
            document.getElementById('isRead'+ele.l_name).checked = true

        if(ele.isWrite == "1")
            document.getElementById('isWrite'+ele.l_name).checked = true

        if(ele.isSpeak== "1")
            document.getElementById('isSpeak'+ele.l_name).checked = true

        
            document.getElementById(ele.l_name+'Id').value = ele.l_id;
    })

}

function setExpData(obj) {
    let expCon = document.getElementById('expDetails')
    expCon.removeChild(expCon.lastElementChild.previousElementSibling)


    obj.forEach(ele => {
        let div = document.createElement('div')
        div.className = "container"

        div.innerHTML = `
        <div>
        <label for="cName1">Company name</label>
        <input class="req" ="text" id="cName1" name="comName" value=${ele.comName}>
    </div>

    <div>
        <label for="des1">Designation</label>
        <input class="req" type="text" id="des1" name="preDesignation" value=${ele.designation}>
    </div>

    <div>
        <label for="fromDate1">Form</label>
        <input class="req" type="text" id="fromDate1" name="fromDate" value=${ele.fromDate.split('-').reverse().join('/')}>
    </div>

    <div>
        <label for="toDate1">To</label>
        <input class="req" type="text" id="toDate1" name="toDate" value=${ele.toDate.split('-').reverse().join('/')}>
    </div> 
    <input type="hidden" name="expID" value="${ele.w_id}">               
                        `

        expCon.insertBefore(div, document.getElementById("expBtn"))

    });
}

function setEduData(obj) {
    let eduCon = document.getElementById('eduDetails')
    eduCon.removeChild(eduCon.lastElementChild.previousElementSibling)

    
    obj.forEach(ele => {
        let div = document.createElement('div')
        div.className = "container"

        div.innerHTML = `
                    <div>
                    <label for="CourseName">Course Name</label>
                    <select name="CourseName[]" id="CourseName" class="req w-350p">
                    <option selected hidden value="${ele.courceName}">${ele.courceName}</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        </select>                           
                        </div>
    
                        <div>
                        <label for="py">Passing Year</label>
                        <input type="text" id="PassYear" name="PassYear" placeholder="yyyy" value =${ele.pass_year}>
                        </div>
                        
                        <div>
                        <label for="percentage">Percentage Year</label>
                        <input type="text" id="Percentage" name="Percentage" placeholder="99.99" value =${ele.percentage}>
                        </div>                         
                        <input type="hidden" name="eduID" value="${ele.e_id}">
                        `

        eduCon.insertBefore(div, document.getElementById("eduBtns"))

    });
}

function setBasicData(obj) {
    obj = restructuredObj(obj)
    console.log("data get from fecth api", obj)

    Object.entries(obj).forEach(([key, val]) => {
        // console.log(key,":",val)

        let ele = document.querySelector(`input[name=${key}]`)
            || document.querySelector(`textarea[name=${key}]`)
            || document.querySelector(`select[name=${key}]`)

        // console.log(key,":",val);
        // console.log(ele)

        if (ele.type == "text" || ele.tagName == "TEXTAREA") {
            ele.value = val
            if (ele.name == 'dob') {
                ele.value = val.split('-').reverse().join('/');
            }

        } else if (ele.type == "radio") {
            let radioCombo = document.getElementsByName(key)
            radioCombo.forEach(ele => {
                if (ele.value == val) {
                    ele.checked = true
                }
            })

        } else if (ele.tagName == "SELECT") {

            Object.values(ele.options).forEach(ele => {
                if (ele.value == val) {

                    ele.selected = true
                }
            })
            if (ele.name == "state") {
                fillCityByState()

            }
        }

    });
}


function restructuredObj(obj) {

    let inputId = document.createElement('input')
    inputId.type = "hidden";
    inputId.name = "b_id";
    inputId.value = obj.b_id
    document.forms[0].appendChild(inputId)

    // delete obj.b_id

    obj.mobileNumber = obj.phoneno
    obj.add1 = obj.address1
    obj.add2 = obj.address2
    obj.zipcode = obj.zcode
    obj.rstatus = obj.relationship_status
    obj.state = obj.s_id
    obj.city = obj.c_id


    delete obj.created_time
    delete obj.phoneno
    delete obj.address1
    delete obj.address2
    delete obj.zcode
    delete obj.relationship_status
    delete obj.s_id
    delete obj.c_id

    return obj
}


