let firstPage = document.getElementById("firstPage");
let perviousPage = document.getElementById("perviousPage");
let currentPage = document.getElementById("currentPage");
let nextPage = document.getElementById("nextPage");
let lastPage = document.getElementById("lastPage");


let totalRecord = document.getElementById("totalRecord");
let pageNumber = parseInt(currentPage.innerText);

let sqlQryPG = document.getElementById("inputQRY").value;


nextPage.addEventListener("click", (event) => {
  pageNumber = parseInt(currentPage.innerText) + 1 || 1;
  
  // const urlParams = new URLSearchParams(window.location.search);

  // urlParams.set('pageNumber',pageNumber);
  // urlParams.set('inputQRY',sqlQryPG);

  // window.location.search = urlParams;


  nextPage.setAttribute("href", `?pageNumber=${pageNumber}&inputQRY=${sqlQryPG}`);
});

perviousPage.addEventListener("click", (event) => {
  pageNumber = parseInt(currentPage.innerText) - 1;
  if (pageNumber <= 0) {
    pageNumber = 1;
  }

  perviousPage.setAttribute(
    "href",
    `?pageNumber=${pageNumber}&inputQRY=${sqlQryPG}`
  );
});

firstPage.addEventListener("click", (event) => {
  pageNumber = 1;

  firstPage.setAttribute(
    "href",
    `?pageNumber=${pageNumber}&inputQRY=${sqlQryPG}`
  );

});

lastPage.addEventListener("click", (event) => {
  pageNumber = parseInt(totalRecord.innerText) / 10;

  lastPage.setAttribute("href", `?pageNumber=${pageNumber}&inputQRY=${sqlQryPG}`);
});

if (currentPage.innerText <= "1") {
  firstPage.style.display = "none";
  perviousPage.style.display = "none";
}

let limit = parseInt(totalRecord.innerText) / 10;
if (currentPage.innerText >= limit) {
  lastPage.style.display = "none";
  nextPage.style.display = "none";
}


// // future extended
// let allATag = document.querySelector('a')
// allATag.addEventListener('click',()=>{
//     console.log("chalu ce badha uper")
// })
