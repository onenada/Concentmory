//@author Paul L. Hernandez <back2bytes@gmail.com> //
//@link https://github.com/onenada/Concentmory //

// JS Para los datos del usuario


//------------------- Variables ---------------------------- //
var nick;
var tamano;
var geolocation;
var avatarImg;
var dificultades;
var dificultadEle;
var selectedTime;

//-------------------- Funciones --------------------------- //

 //SessionStorage//

// Almacenar datos del usuario en sessionStorage //
// @param {HTMLElement} nick <- Nick del usuario //
// @param {HTMLElement} tamano <- Tamaño del panel escogido por el usuario //

function userData(nick,tamano,avatarContainer){
    sessionStorage.setItem('nick',nick.value);
    sessionStorage.setItem('tamano',tamano.value);
    sessionStorage.setItem('geolocation',geolocationText);
    sessionStorage.setItem('avatarImg',avatarContainer.src);
}

// Funcion para seleccionar el tiempo de partida //
function dificultad(){
    var dificultades=document.getElementById('timeSelect');
    var dificultadEle=dificultades.value;
    sessionStorage.setItem('time',dificultadEle);
}

// Obtener datos del usuario de la sessionStorage //

function getUserData(){
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('tamano');
    avatarImg = sessionStorage.getItem('avatarImg');
    selectedTime = sessionStorage.getItem('time')
}

// Verificación de la correcta obtención de los datos del usuario // 

function checkUserData(){
    if(nick==null){
        sessionStorage.setItem('error','No se ha rellenado correctamente el formulario')
        return false
    }
    return true
}

// Verificación y uso de la herramienta de geolocalizacion del navegador //

function geolocationData(){
    // Si el navegador usado no tiene geolocalizacion //
    if(!navigator.geolocation){
        geolocationText= "El Navegador no es compatible con API Geolocation";
        }
        // El navegador tiene la geolocalizacion y el usuario acepta dar su ubicación //
        else{
        navigator.geolocation.getCurrentPosition(
            //éxito en callback//
            (position)=>{
                geolocationText='Latitud:'+position.coords.latitude+' Longitud:'+position.coords.longitude},
            //error//
            ()=>{geolocationText= "error en la geolocalizacion"}
        )
    }
}

//LocalStorage//

// Almacenar datos del usuario en localStorage //
// si no hay usuarios anteriores creara una lista de usuarios , de haber usuarios anteriores //
// añadirá uno nuevo a la lista //
// @param {sessionStorageItem} nick <- Nick del usuario en sessionStorage //

function userHistory(nick){
    let userListStored=localStorage.getItem('userList');
    let userList;
    if(userListStored==null){
        userList=[];
    }
    else{
        userList=JSON.parse(userListStored);
    }
    let regUser={
        // Propiedades guardadas en cada usuario //
        usuario:nick.value,
        fecha:Date.now(),
        ubicación:geolocationText,
    }
    userList.push(regUser)
    localStorage.setItem("userList", JSON.stringify(userList));
}