//@author Paul L. Hernandez <back2bytes@gmail.com> //
//@link //
// Js Para la lógica del juego //

// Variables // 
var inicioMarcado=false;
var adyacentes=[];
var tamanoPanel;
var cartaMarcada;
var idMarcados=[];
var idInterval;
var primeraCarta=null;
var cartaVolteada=false;
var movimientos=0;

// Funciones //

//Devuelve un numero random entre 0 y max 
// @param {} max numero tope 
//source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
// Función para barajar un array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//Obtener y rellenar los datos del usuario con los datos guardados en session storage
function rellenarFormularioUsuario(){
    document.getElementById("nick").value=nick;
    document.getElementById("avatarImg").src=avatarImg;
    document.getElementById('time').value=selectedTime;
    tamanoPanel=parseInt(tamano);
}
// Funcion que dependiendo del tamano seleccionado dispara la //
// funcion que pintara correctamente el panel //
function seleccionarTamano(){
    var tamanoSelected = tamano
    // Llamar a la funcion constructora del panel de juego //
    if(tamanoSelected === "4") pintarPanelJuegoNormal();
    else if (tamanoSelected === "6") pintarPanelJuegoGrande();
}

//Pintado del panel de juego dependiendo de la selección de tamano 
function pintarPanelJuegoNormal(){
    document.getElementById('game').style.gridTemplateColumns="repeat("+tamano+", 70px)";
    document.getElementById('game').style.gridTemplateRows="repeat("+tamano+", 100px)";
    document.getElementById('game').style.width='300px';
    document.getElementById('game').style.height='420px';
    // Pintar elementos de forma automática //
    let items="";
    let carta=["dragon","dragon2","mage","mage2","eyes","grave","hole","kuriboh"];
    let pareja=carta.concat(carta);
    shuffle(pareja);
    for (let index = 0; index < parseInt(tamano)*parseInt(tamano); index++) {
        const cartaActual=pareja[index];
        items+= `<div class="containerItem ${cartaActual}"></div>`;
    }
    document.getElementById("game").innerHTML=items;
}

//Pintado del panel de juego dependiendo de la selección de tamano 
function pintarPanelJuegoGrande(){
    document.getElementById('game').style.gridTemplateColumns="repeat("+tamano+", 70px)";
    document.getElementById('game').style.gridTemplateRows="repeat("+tamano+", 1fr)";
    // Pintar elementos de forma automática //
    let items="";
    let carta=["dragon","dragon2","mage","mage2","eyes","grave","hole","kuriboh","mage3","obelis","poly","ra","renacer","sli","control","cambio","craneo","dragonbb"];
    let pareja=carta.concat(carta);
    shuffle(pareja);
    for (let index = 0; index < parseInt(tamano)*parseInt(tamano); index++) {
        const cartaActual=pareja[index];
        items+= `<div class="containerItem ${cartaActual}"></div>`;
    }
    document.getElementById("game").innerHTML=items;
}


// Funcion que realiza la cuenta hacia atras del juego //
// function cuentaAtras(){
//     let tiempoRestante=parseInt(document.getElementById('time').value)-1;
//     document.getElementById('time').value=tiempoRestante;
//     if(tiempoRestante==0){
//         clearInterval(idInterval);
//         // Finalizar eventos //
//         const items=document.getElementsByClassName('item');
//         for (let item of items){
//             item.removeEventListener('mousedown', comenzarMarcar);
//             item.removeEventListener('mouseover', continuarMarcar);
//         }
//         document.removeEventListener('mouseup', finMarcar);
//         // Cambiar Z-index de los paneles de juego // 
//         document.getElementById('endGame').classList.add('endGameColor');
//         document.getElementById('endGame').style.zIndex='2';
//         document.getElementById('game').style.zIndex='1';
//         document.getElementById('newGame').addEventListener('click',(e)=>location.reload());
//     }
// }

// Añadir los eventos al juego //

function programarEventosJuego(){
    const items=document.getElementsByClassName('containerItem');
    for (let item of items){
        item.addEventListener('mousedown', comenzarMarcar);
        // item.addEventListener('mouseover', continuarMarcar);
    }
    // document.addEventListener('mouseup', finMarcar);
    // Cuenta atrás //
    // idInterval=setInterval(cuentaAtras,1000)
}


//  Funciones del juego  //
// Iniciar el marcado de los puntos
// @param {} event 
function comenzarMarcar(event){
    console.log('ya hay una carta seleccionada es: ' + cartaMarcada + ' ' + cartaVolteada);
    let item=event.target;
    // Hay una carta ya seleccionada entra en el bloque //
    if(cartaVolteada){
            // Verifico si la carta esta boca abajo
        if(item.classList.contains('containerItem')){
            // Si tiene craneo debajo //
            if(item.classList.contains('craneo')){
                // Volteamos la carta al eliminar la img boca abajo //
                item.classList.remove('containerItem');
                // mostramos la imagen que esta debajo //
                item.classList.add('craneoImg');
                // La primera carta seleccionada es igual a la segunda //
                if(cartaMarcada==='craneo'){
                    movimientos ++;
                    cartaVolteada=false;
                    cartaMarcada-null;
                    console.log('Felicidades encontraste la pareja de tu carta');
                }
                // la primera carta no es igual a la segunda //
                else {
                    movimientos ++;
                    cartaVolteada=false;
                    //Volteamos nuevamente la carta al quitar la imagen de abajo //
                    // y colocar nuevamente la imagen de arriba //
                    item.classList.remove('craneoImg');
                    item.classList.add('containerItem');
                    console.log('Volteamos nuevamente la carta no son iguales');
                    cartaMarcada=null;
                }
            }
            // Si tiene control debajo //
            if(item.classList.contains('control')){
                // Volteamos la carta al eliminar la img boca abajo //
                item.classList.remove('containerItem');
                // mostramos la imagen que esta debajo //
                item.classList.add('controlImg');
                // La primera carta seleccionada es igual a la segunda //
                if(cartaMarcada==='control'){
                    movimientos ++;
                    cartaVolteada=false;
                    cartaMarcada=null;
                    console.log('Felicidades encontraste la pareja de tu carta');
                }
                // la primera carta no es igual a la segunda //
                else {
                    movimientos ++
                    cartaVolteada=false;
                    item.classList.remove('controlImg');
                    item.classList.add('containerItem');
                    cartaMarcada=null;
                    console.log('Volteamos nuevamente la carta no son iguales');
                }
            }
            // Si tiene dragonbb debajo //
            if(item.classList.contains('dragonbb')){
                // Volteamos la carta al eliminar la img boca abajo //
                item.classList.remove('containerItem');
                // mostramos la imagen que esta debajo //
                item.classList.add('dragonbbImg');
                // La primera carta seleccionada es igual a la segunda //
                if(cartaMarcada==='dragonbb'){
                    movimientos ++
                    cartaVolteada=false
                    console.log('Felicidades encontraste la pareja de tu carta');
                }
                // la primera carta no es igual a la segunda //
                else {
                    movimientos ++
                    cartaVolteada=false;
                    item.classList.remove('dragonbblImg');
                    item.classList.add('containerItem');
                    cartaMarcada=null
                    console.log('Volteamos nuevamente la carta no son iguales');
                }
            }
            // Si tiene cambio debajo //
            if(item.classList.contains('cambio')){
                // Volteamos la carta al eliminar la img boca abajo //
                item.classList.remove('containerItem');
                // mostramos la imagen que esta debajo //
                item.classList.add('cambioImg');
                // La primera carta seleccionada es igual a la segunda //
                if(cartaMarcada==='cambio'){
                    movimientos ++
                    cartaVolteada=false
                    console.log('Felicidades encontraste la pareja de tu carta');
                }
                // la primera carta no es igual a la segunda //
                else {
                    movimientos ++
                    cartaVolteada=false;
                    item.classList.remove('cambiolImg');
                    item.classList.add('containerItem');
                    cartaMarcada=null
                    console.log('Volteamos nuevamente la carta no son iguales');
                }
            }
        }
    }
    // No hay aun una carta seleccionada debemos seleccionarla // 
    else{
        console.log('no hay carta seleccionada con anterioridad , selecciona la primera carta');
        if(item.classList.contains('containerItem')){
            // Si tiene craneo debajo //
            if(item.classList.contains('craneo')){
                // Volteamos la carta al quitar la img boca abajo //
                item.classList.remove('containerItem');
                // Mostramos la imagen de abajo //
                item.classList.add('craneoImg');
                // al ser la primera vez que clickamos quedara boca arriba //
                cartaVolteada=true
                // marcamos que carta esta seleccionada //
                cartaMarcada='craneo'
                console.log('su carta seleccionada es ' + cartaMarcada);
            }
            // Si tiene control debajo //
            if(item.classList.contains('control')){
                // Volteamos la carta al quitar la img boca abajo //
                item.classList.remove('containerItem');
                // Mostramos la imagen de abajo //
                item.classList.add('controlImg');
                // al ser la primera vez que clickamos quedara boca arriba //
                cartaVolteada=true
                // marcamos que carta esta seleccionada //
                cartaMarcada='control'
                console.log('su carta seleccionada es ' + cartaMarcada);
            }
            // Si tiene dragonbb debajo //
            if(item.classList.contains('dragonbb')){
                // Volteamos la carta al quitar la img boca abajo //
                item.classList.remove('containerItem');
                // Mostramos la imagen de abajo //
                item.classList.add('dragonbbImg');
                // al ser la primera vez que clickamos quedara boca arriba //
                cartaVolteada=true
                // marcamos que carta esta seleccionada //
                cartaMarcada='dragonbb'
                console.log('su carta seleccionada es ' + cartaMarcada);
            }
            // Si tiene cambio debajo //
            if(item.classList.contains('cambio')){
                // Volteamos la carta al quitar la img boca abajo //
                item.classList.remove('containerItem');
                // Mostramos la imagen de abajo //
                item.classList.add('cambioImg');
                // al ser la primera vez que clickamos quedara boca arriba //
                cartaVolteada=true
                // marcamos que carta esta seleccionada //
                cartaMarcada='cambio'
                console.log('su carta seleccionada es ' + cartaMarcada);
            }
        }
    }
}

// Continua el marcado de los puntos mientras el mouse este encima de los puntos
// @param {} event 
function continuarMarcar(event){
    if(inicioMarcado){
        let item=event.target;
        let idNuevo=parseInt(item.id);
        // Es adyacente?
        if(adyacentes.includes(idNuevo)&& item.classList.contains(cartaMarcada)){
            let containerItem=event.target.parentElement;
            if(item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else if(item.classList.contains('naranja')) containerItem.classList.add('naranja');
            else if(item.classList.contains('verde')) containerItem.classList.add('verde');
            // Guardar puntos marcados //
            idMarcados.push(parseInt(item.id))
            calcularAdyacentes(parseInt(item.id));
        }
    }
}
// Finaliza el marcado de puntos 
// function finMarcar(){
//     inicioMarcado=false;
//     adyacentes=[];
//     console.log(idMarcados);
//     // Añadiendo puntuacion //
//     const puntuacionInput=document.getElementById('puntuacion');
//     if(idMarcados.length>1){
//         puntuacionInput.value=parseInt(puntuacionInput.value)+idMarcados.length;
//     }
//     // Trabajar con los puntos marcados
//     for (let index = 0; index < idMarcados.length; index++) {
//         // Captura de id del punto marcado //
//         let itemMarcado=document.getElementById(idMarcados[index]);
//         itemMarcado.parentElement.classList.remove(cartaMarcada);
//         // Cambio aleatorio de color //
//         let color=['rojo','naranja','verde']
//         let colorRandom=getRandomInt(3);
//         itemMarcado.classList.remove('rojo','naranja','verde');
//         itemMarcado.classList.add(color[colorRandom]);
//     }
//     idMarcados=[];
// }



// MAIN //

//Captura de datos //

getUserData();
//Comprobación de datos //

if (!checkUserData()) location="index.html";

// Rellenar Formulario //
rellenarFormularioUsuario();
seleccionarTamano();
programarEventosJuego();
