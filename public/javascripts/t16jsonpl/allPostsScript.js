function getALLPostsData() {
    
    return fetch('https://jsonplaceholder.org/posts', {
        
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
}


let allData = [];

(async function (){
    allData = await getALLPostsData()
    createPostsView(allData.slice(0,pageLimit))   
    totalRecord = allData.length
})()


document.getElementById('submitBtn')
.addEventListener('click',
(async (e) => {
    //let keyword= "dolor";
   
    e.preventDefault();
   
    let keyword = document.getElementById('searchId');        

    // let allData = await getALLPostsData()
    console.log("data for search",allData)
    
    allData = allData.filter(data => data.title.includes(keyword.value))
    totalRecord = allData.length
    console.log("filter data: ",allData)


    document.getElementById('currentPage').innerText = 1
    
    createPostsView(allData.slice(0,pageLimit))  
    currentPageChecker()
    
}));    



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function createPostsView(postJsonData) {  


        const container = document.getElementById('container')

        removeAllChildNodes(container);

        postJsonData.forEach(element => {

            let div = document.createElement('div')
            div.className = "content"

            let h2ID = document.createElement('h2')
            h2ID.innerText = "Post Id: " + element.id
            div.appendChild(h2ID)

            let h2 = document.createElement('h2')
            h2.innerText = element.title
            div.appendChild(h2)


            let divCon = document.createElement('div')
            divCon.className = "flex"
           
            let img = document.createElement('img')
            img.src = element.image
            divCon.appendChild(img)

            let p = document.createElement('p')
            p.innerText = element.content
            divCon.appendChild(p)

            div.appendChild(divCon)

            let a = document.createElement('a')
            a.innerText = "Read More"
            a.className = "btnStyle"
            a.href = "posts/" + element.id
            div.appendChild(a)

            let h4 = document.createElement('h4')
            h4.innerText = "by " +  element.userId
            div.appendChild(h4)           

            container.appendChild(div)

        });
}





