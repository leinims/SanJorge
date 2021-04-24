var viewbox = [0, 0, 800, 450];

var map = document.getElementsByTagName("svg")[0]

function panel(zoom,v,h) {
    var i=0
    var arr = viewbox.map ((item)=> {i+=1; return item + 25*zoom*((i>2)? -2: 1) ;})
    arr = arr.map ((item)=> {i+=1; return item + 25*v*((i%2==0)? 1: 0) ;})
    arr = arr.map ((item)=> {i+=1; return item + 25*h*((i%2==1)? 1: 0) ;})
    if(!arr.every((item)=>{return item>=0 && item<=800}) || arr.join('')=='2252253500') return;
    if (Math.abs(zoom) + Math.abs(v) + Math.abs(h) == 0) arr = [0, 0, 800, 450]
    
    map.setAttribute("viewBox", arr.join(" "));
    viewbox = arr; 
}
function hover(these) {
    var mapConvencionName = $('#map-convencion-name');
    mapConvencionName.text($('#'+these.id).text());
        
    document.getElementById("map-convencion-in").style.visibility = "visible";
    document.getElementById("map-convencion-in").onclick = ()=> {
        
        localStorage.setItem("base", these.id);
        window.open("actividad.html","_self");
    }
    
    
}
function verificarCode() {
    //console.log($('#login-code')[0].value);
    var arr = JSON.parse(localStorage.getItem("sheetList"));
    index = arr.findIndex(item=> {
        return item[5]==$('#login-code')[0].value;
    });
    if (index==-1) {
        alert('No se encontró el usuario asociado. Verifica el código')
    } else {
        localStorage.setItem("usuario", JSON.stringify(arr[index]));
        window.open('index.html', "_self")
    }
    
}

$( document ).ready(function() {
    
    function cargarUser () {

        console.log(localStorage.getItem("usuario"))
        var user = (JSON.parse (localStorage.getItem("usuario")))
        $('#nickname-info').text(user[4].substring(0, 10))
        $('#kingdom-info').html('<strong>Reino: </strong>' + user[1])
        $('#skill1').val(user[6]*10);
        $('#skill2').val(user[7]*10);
        $('#skill3').val(user[8]*10);
        $('#skill4').val(user[9]*10);
        $('#skill5').val(user[10]*10);

    }

    cargarUser();
       
});

