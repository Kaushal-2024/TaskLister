// tab srcipt 

let had = document.getElementById('tabHeading');
let desc = document.getElementById('tabDesc');

document.getElementById("wordpress").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for WordPress";
    desc.textContent = "We Live and breathe wordpress. our manged hosting for wordpress and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("magento").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for Magento";
    desc.textContent = "We Live and breathe magento. our manged hosting for magento and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("laravel").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for Laravel";
    desc.textContent = "We Live and breathe Laravel. our manged hosting for Laravel and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("php").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for PHP";
    desc.textContent = "We Live and breathe PHP. our manged hosting for PHP and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

// slider script

let left = document.getElementById('left');
let right = document.getElementById('right');
let sec5 = document.getElementById('rowSec5Id');
let x = 0;


// left.addEventListener('click',()=>{
//     x -=200;    
//     sec5.scrollTo(x,0)
// });


// right.addEventListener('click',()=>{
//     x +=200;
//     sec5.scrollTo(x,0)
// });

//smooth

left.addEventListener('click', () => {
    if( x >= 0){
        x -= 100
        sec5.scrollTo({    
        left: x,
        behavior: 'smooth',
        });
    }
});

right.addEventListener('click', () => {
    if( x <= 500){
        x += 100
        sec5.scrollTo({    
        left: x,
        behavior: 'smooth',
        });
    }
});




