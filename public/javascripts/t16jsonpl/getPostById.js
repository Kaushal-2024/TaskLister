function getPostDatabyId() {
    
    const strurl = "https://jsonplaceholder.org"

   
    let url = new URL(window.location.href)
    mainUrl = strurl + url.pathname;
   

    return fetch(mainUrl, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
}



(async function createPostView(){
    let element =await getPostDatabyId();
    

    const container = document.getElementById('container')

    let div = document.createElement('div')
    div.className = "content"

        let h2ID = document.createElement('h2')
        h2ID.innerText = element.id
        div.appendChild(h2ID)

        let h2 = document.createElement('h2')
        h2.innerText = element.title
        div.appendChild(h2)

        let img = document.createElement('img')
        img.src = element.image
        div.appendChild(img)


        let p = document.createElement('p')
        p.innerText = element.content
        div.appendChild(p)


        let h4 = document.createElement('h4')
        h4.innerText = element.userId
        div.appendChild(h4)
        

        container.appendChild(div)
    
})()


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

document.getElementById('commentBtn').addEventListener('click',async ()=>{

    let comments =await  fetch("https://jsonplaceholder.org/comments", {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())

    let url = new URL(window.location.href)
    let arr = url.pathname.split('/')
    const postId = arr[arr.length-1];

    let postComments  = comments.filter(comment => comment.postId ==  postId)
    createCommentView(postComments)
})

function createCommentView(postComments){
    console.log(postComments)

    const container = document.getElementById('showComments')

    removeAllChildNodes(container)

    postComments.forEach(element => {

        let div = document.createElement('div')
        div.className = "content2"

        let h2ID = document.createElement('h2')
        h2ID.innerText = element.id
        div.appendChild(h2ID)      

        let p = document.createElement('p')
        p.innerText = element.comment
        div.appendChild(p)


        let h4 = document.createElement('h4')
        h4.innerText = element.userId
        div.appendChild(h4)

        container.appendChild(div)

    });
}