
let left = document.getElementById('left');
let right = document.getElementById('right');
let sec5 = document.getElementById('slider');
let x = 0;


// left.addEventListener('click',()=>{
//     x -=1400;    
//     sec5.scrollTo(x,0)
// });


// right.addEventListener('click',()=>{
//     x +=1400;
//     sec5.scrollTo(x,0)
// });

//smooth

left.addEventListener('click', () => {
   
    if( x >= 0){
        x -= 1395
        sec5.scrollTo({    
            left: x,
            behavior: 'smooth',
        });
    }
});

right.addEventListener('click', () => {   
    if( x <= 2790){
        x += 1395
        sec5.scrollTo({    
            left: x,
            behavior: 'smooth',
        });
    }
});