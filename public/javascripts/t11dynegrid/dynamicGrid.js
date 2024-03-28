let submitBtn = document.getElementById('submitBtn')

let selQry = document.getElementById("inputQRY").value || 'Enter right query';
let allClickableQueryTags = document.querySelectorAll('.queryParser')

submitBtn.addEventListener('click', () => {

    let url = window.location.href;
    console.log("url", url)
    let cleanUrl = url.split('?')[0]
    console.log("cleanUrl: ", cleanUrl)
    window.history.replaceState({}, document.title, cleanUrl)

});

// for (let i = 0; i < allClickableQueryTags.length; i++) {
// allClickableQueryTags[i].addEventListener("click", function          () {
//     console.log("from dymeinc grid script ",allClickableQueryTags[i].id)

//     const urlParams = new URLSearchParams(window.location.search);

//     urlParams.set('inputQRY',selQry);

//     window.location.search = urlParams;
// }); 

// }