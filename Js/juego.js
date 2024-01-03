//@author Paul L. Hernandez <back2bytes@gmail.com> //
//@link https://github.com/onenada/Concentmory //
// Js Para la lógica del juego //

// Variables // 
var inicioMarcado=false;
var adyacentes=[];
var tamanoPanel;
var cartaMarcada;
var idMarcados=[];
var idInterval;
var primeraCarta;
var primeraCartaClass;
var cartaVolteada=false;
var movimientos=0;
var comparacionEnCurso=false;

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
//Funcion para añadir un tiempo de espera antes de volver a usar una funcion que se pasa como argumente //
// @param {func} funcion que se pasara como argumento para ser usada luego del tiempo esperado //
// @param {wait} tiempo que se pasara como argumente para esperar antes de lanzar la funcion como argumento // 
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
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
function cuentaAtras(){
    let tiempoRestante=parseInt(document.getElementById('time').value)-1;
    document.getElementById('time').value=tiempoRestante;
    if(tiempoRestante==0){
        clearInterval(idInterval);
        // Finalizar eventos //
        const items=document.getElementsByClassName('item');
        for (let item of items){
            item.removeEventListener('mousedown', comenzarMarcar);
        }
    }
}

// Funcion para mostrar las cartas //
function mostrarCartas(){
    // Obtenemos la coleccion de items en base a su clase //
    const items=document.getElementsByClassName('containerItem');
    // convertimos la coleccion en un array ya que sus clases seran modificadas durante cada iteracion //
    // lo que hara que progresivamente sean menos items y queremos mantener la misma cantidad de inicio a fin //
    // incluso si borramos la class que los identifica como que esta boca abajo //
    const itemsArray= Array.from(items);
    for (let item of itemsArray) {
        // En cada iteracion quitamos la class containeritem para mostrar lo que hay debajo //
        if(item.classList.contains( 'craneo')){
            item.classList.remove('containerItem');
            item.classList.add('craneoImg');
            setTimeout(function(){
                item.classList.remove('craneoImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'cambio')){
            item.classList.remove('containerItem');
            item.classList.add('cambioImg');
            setTimeout(function(){
                item.classList.remove('cambioImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'control')){
            item.classList.remove('containerItem');
            item.classList.add('controlImg');
            setTimeout(function(){
                item.classList.remove('controlImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'dragon')){
            item.classList.remove('containerItem');
            item.classList.add('dragonImg');
            setTimeout(function(){
                item.classList.remove('dragonImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'dragon2')){
            item.classList.remove('containerItem');
            item.classList.add('dragon2Img');
            setTimeout(function(){
                item.classList.remove('dragon2Img');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'dragonbb')){
            item.classList.remove('containerItem');
            item.classList.add('dragonbbImg');
            setTimeout(function(){
                item.classList.remove('dragonbbImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'eyes')){
            item.classList.remove('containerItem');
            item.classList.add('eyesImg');
            setTimeout(function(){
                item.classList.remove('eyesImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'grave')){
            item.classList.remove('containerItem');
            item.classList.add('graveImg');
            setTimeout(function(){
                item.classList.remove('graveImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'hole')){
            item.classList.remove('containerItem');
            item.classList.add('holeImg');
            setTimeout(function(){
                item.classList.remove('holeImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'kuriboh')){
            item.classList.remove('containerItem');
            item.classList.add('kuribohImg');
            setTimeout(function(){
                item.classList.remove('kuribohImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'mage')){
            item.classList.remove('containerItem');
            item.classList.add('mageImg');
            setTimeout(function(){
                item.classList.remove('mageImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'mage2')){
            item.classList.remove('containerItem');
            item.classList.add('mage2Img');
            setTimeout(function(){
                item.classList.remove('mage2Img');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'mage3')){
            item.classList.remove('containerItem');
            item.classList.add('mage3Img');
            setTimeout(function(){
                item.classList.remove('mage3Img');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'obelis')){
            item.classList.remove('containerItem');
            item.classList.add('obelisImg');
            setTimeout(function(){
                item.classList.remove('obelisImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'poly')){
            item.classList.remove('containerItem');
            item.classList.add('polyImg');
            setTimeout(function(){
                item.classList.remove('polyImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'ra')){
            item.classList.remove('containerItem');
            item.classList.add('raImg');
            setTimeout(function(){
                item.classList.remove('raImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'renacer')){
            item.classList.remove('containerItem');
            item.classList.add('renacerImg');
            setTimeout(function(){
                item.classList.remove('renacerImg');
                item.classList.add('containerItem');
            },2000)
        }
        if(item.classList.contains( 'sli')){
            item.classList.remove('containerItem');
            item.classList.add('sliImg');
            setTimeout(function(){
                item.classList.remove('sliImg');
                item.classList.add('containerItem');
            },2000)
        }
    }
    setTimeout(function(){
        programarEventosJuego();
    }, 2000)
}

// Añadir los eventos al juego //
function programarEventosJuego(){
    const items=document.getElementsByClassName('containerItem');
    for (let item of items){
        item.addEventListener('mousedown', comenzarMarcar);
        // item.addEventListener('mouseover', continuarMarcar);
    }
    // Cuenta atrás //
    idInterval=setInterval(cuentaAtras,1000);
    
}


//  Funciones del juego  //
// Iniciar el marcado de los puntos
// @param {} event 
function comenzarMarcar(event){
    console.log('ya hay una carta seleccionada es: ' + cartaMarcada + ' ' + cartaVolteada);
    console.log('la primera carta es '+ primeraCarta + 'y su clase es ' + primeraCartaClass);
    const puntuacion=document.getElementById('movimientos');
    console.log(puntuacion.value + movimientos);
    if(comparacionEnCurso) return;
    else{
        let item=event.target;
        // Hay una carta ya seleccionada entra en el bloque //
        if(cartaVolteada){
            comparacionEnCurso=true;
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
                        // Sumamos un movimiento //
                        movimientos ++;
                        // Reseteamos todos los valores de seleccion //
                        cartaVolteada=false;
                        cartaMarcada-null;
                        primeraCartaClass=undefined;
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        // Sumamos un movimiento //
                        movimientos ++;
                        // Reseteamos todos los valores de seleccion //
                        cartaVolteada=false;
                        cartaMarcada=null;
                        // Añadimos un timeout para dar el efecto de volteo y una ventana de tiempo //
                        // par que el usuario sea capas de ver la carta y reiniciar la jugada // 
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('craneoImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
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
                        primeraCartaClass=undefined;
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('controlImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null;
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('controlImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
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
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('dragonbblImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('dragonbbImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
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
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('cambiolImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('cambioImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene dragon debajo //
                if(item.classList.contains('dragon')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('dragonImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='dragon'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('dragonlImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('dragonImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene dragon2 debajo //
                if(item.classList.contains('dragon2')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('dragon2Img');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='dragon2'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('dragon2lImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('dragon2Img');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene eyes debajo //
                if(item.classList.contains('eyes')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('eyesImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='eyes'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('eyeslImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('eyesImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene grave debajo //
                if(item.classList.contains('grave')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('graveImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='grave'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('gravelImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('graveImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene hole debajo //
                if(item.classList.contains('hole')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('holeImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='hole'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('holelImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('holeImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene kuriboh debajo //
                if(item.classList.contains('kuriboh')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('kuribohImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='kuriboh'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('kuribohlImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('kuribohImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene mage debajo //
                if(item.classList.contains('mage')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('mageImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='mage'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('magelImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('mageImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene mage2 debajo //
                if(item.classList.contains('mage2')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('mage2Img');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='mage2'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('mage2lImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('mage2Img');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene mage3 debajo //
                if(item.classList.contains('mage3')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('mage3Img');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='mage3'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('mage3lImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('mage3Img');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene obelis debajo //
                if(item.classList.contains('obelis')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('obelisImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='obelis'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('obelislImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('obelisImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene poly debajo //
                if(item.classList.contains('poly')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('polyImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='poly'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('polylImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('polyImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene ra debajo //
                if(item.classList.contains('ra')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('raImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='ra'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('ralImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('raImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene renacer debajo //
                if(item.classList.contains('renacer')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('renacerImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='renacer'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('renacerlImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('renacerImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
                    }
                }
                // Si tiene sli debajo //
                if(item.classList.contains('sli')){
                    // Volteamos la carta al eliminar la img boca abajo //
                    item.classList.remove('containerItem');
                    // mostramos la imagen que esta debajo //
                    item.classList.add('sliImg');
                    // La primera carta seleccionada es igual a la segunda //
                    if(cartaMarcada==='sli'){
                        movimientos ++
                        cartaVolteada=false
                        document.getElementById('1').id=null;
                        comparacionEnCurso=false;
                        console.log('Felicidades encontraste la pareja de tu carta');
                    }
                    // la primera carta no es igual a la segunda //
                    else {
                        movimientos ++
                        cartaVolteada=false;
                        item.classList.remove('slilImg');
                        item.classList.add('containerItem');
                        cartaMarcada=null
                        setTimeout(function() {
                            //Volteamos nuevamente la carta al quitar la imagen de abajo //
                            // y colocar nuevamente la imagen de arriba //
                            item.classList.remove('sliImg');
                            item.classList.add('containerItem');
                            console.log('Volteamos nuevamente la carta no son iguales');
                            document.getElementById('1').classList.remove(primeraCartaClass);
                            document.getElementById('1').classList.add('containerItem');
                            primeraCarta=undefined;
                            primeraCartaClass=undefined;
                            document.getElementById('1').id=null;
                            comparacionEnCurso=false;
                        }, 750);
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
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='craneo';
                    primeraCartaClass='craneoImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene control debajo //
                if(item.classList.contains('control')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('controlImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='control';
                    primeraCartaClass='controlImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene dragonbb debajo //
                if(item.classList.contains('dragonbb')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('dragonbbImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='dragonbb';
                    primeraCartaClass='dragonbbImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene cambio debajo //
                if(item.classList.contains('cambio')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('cambioImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='cambio';
                    primeraCartaClass='cambioImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene dragon debajo //
                if(item.classList.contains('dragon')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('dragonImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='dragon';
                    primeraCartaClass='dragonImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene dragon2 debajo //
                if(item.classList.contains('dragon2')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('dragon2Img');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='dragon2';
                    primeraCartaClass='dragon2Img'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene eyes debajo //
                if(item.classList.contains('eyes')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('eyesImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='eyes';
                    primeraCartaClass='eyesImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene grave debajo //
                if(item.classList.contains('grave')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('graveImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='grave';
                    primeraCartaClass='graveImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene hole debajo //
                if(item.classList.contains('hole')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('holeImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='hole';
                    primeraCartaClass='holeImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene kuriboh debajo //
                if(item.classList.contains('kuriboh')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('kuribohImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='kuriboh';
                    primeraCartaClass='kuribohImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene mage debajo //
                if(item.classList.contains('mage')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('mageImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='mage';
                    primeraCartaClass='mageImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene mage2 debajo //
                if(item.classList.contains('mage2')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('mage2Img');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='mage2';
                    primeraCartaClass='mage2Img'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene mage3 debajo //
                if(item.classList.contains('mage3')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('mage3Img');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='mage3';
                    primeraCartaClass='mage3Img'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene obelis debajo //
                if(item.classList.contains('obelis')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('obelisImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='obelis';
                    primeraCartaClass='obelisImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene poly debajo //
                if(item.classList.contains('poly')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('polyImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='poly';
                    primeraCartaClass='polyImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene ra debajo //
                if(item.classList.contains('ra')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('raImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='ra';
                    primeraCartaClass='raImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene renacer debajo //
                if(item.classList.contains('renacer')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('renacerImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='renacer';
                    primeraCartaClass='renacerImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
                // Si tiene sli debajo //
                if(item.classList.contains('sli')){
                    // Volteamos la carta al quitar la img boca abajo //
                    item.classList.remove('containerItem');
                    // Mostramos la imagen de abajo //
                    item.classList.add('sliImg');
                    // al ser la primera vez que clickamos quedara boca arriba //
                    cartaVolteada=true;
                    // marcamos que carta esta seleccionada //
                    cartaMarcada='sli';
                    primeraCartaClass='sliImg'
                    item.id='1';
                    console.log('su carta seleccionada es ' + cartaMarcada);
                }
            }
        }
    }
    puntuacion.value=movimientos;
}

// MAIN //

//Captura de datos //

getUserData();
//Comprobación de datos //

if (!checkUserData()) location="index.html";

// Rellenar Formulario //
rellenarFormularioUsuario();
seleccionarTamano();
mostrarCartas();
