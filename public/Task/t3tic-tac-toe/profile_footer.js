
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();



let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

console.log("The current date is " + currentDate); 
document.write(`
    <div style=" margin-bottom:30px">
    <h1 style="margin-right:40px">Kaushal Tarpara</h1> 
    <h2 style="margin-right:40px">23DEV048 <br>   
05-02-2024 <br> Day-10</h2></div>`
    
);