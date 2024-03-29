
var dtab = document.getElementById('dtab');
var rowC=2;
var colC =2;


var radd = document.getElementById('radd');

radd.addEventListener('click',function() {   
    
    
    var rowCount = dtab.rows.length;
    var columesCount = dtab.rows[0].cells.length;

    var tr = dtab.insertRow(rowCount);
   
    for (var cellMaker = 0; cellMaker < columesCount; cellMaker++) {
        
        var td = document.createElement("td");
        
        td = tr.insertCell(cellMaker);
        
        td.style.padding = "70px";     
        td.setAttribute('id','dark');

        if((cellMaker%2 == 0 && rowCount%2 ==0 ) || (cellMaker%2 != 0 && rowCount%2 !=0 )){
            td.setAttribute('class','dark');
        }

    }

    rowC++;
    // alert("row=" + rowC );
});


var rsub = document.getElementById('rsub');
rsub.addEventListener('click',function() {   
    
    if( rowC > 2 ){
        var tr = dtab.deleteRow(rowC-1);
        --rowC;
    }else{
        alert("Pela add karo paci delete karo row")
    } 
    // alert("row=" + rowC );
});

var cadd = document.getElementById('cadd');
cadd.addEventListener('click', function () {

    var trs = document.querySelectorAll('#dtab tr');    
    // alert("row=" + trs);

    var rowCount = dtab.rows.length;
    var columesCount = dtab.rows[0].cells.length;
    var r=0;

    for (var tr of trs) {

        var td = document.createElement('td');
        td.style.padding = "70px";
        if(( r % 2 != 0 && columesCount%2 !=0 )||( r % 2 == 0 && columesCount%2 ==0 )){
           
            td.setAttribute('class', 'dark');
        }
        r++;
        tr.appendChild(td);
    }
    console.log(trs)
    colC++;
});

var csub = document.getElementById('csub');
csub.addEventListener('click',function(){
    
    var rowCount =  dtab.rows.length;
    var selectCol =  dtab.rows[0].cells.length;
    
    if( colC > 2 ){
        for(var i = 0 ; i < rowCount; i++ ){
            dtab.rows[i].deleteCell(selectCol-1);
        }    
        colC--;
    }else{
            alert("Pela add karo paci delete karo colum")
    } 
    
});