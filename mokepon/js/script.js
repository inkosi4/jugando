let ataqueJugador
let varataqueEnemigo
let vidaJugador = 3
let vidaEnemigo = 3

function iniciarjuego(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let btnMascotaJugador = document.getElementById('btn-seleccionar')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let btnFuego = document.getElementById('btn-fuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua = document.getElementById('btn-agua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra = document.getElementById('btn-tierra')
    btnTierra.addEventListener('click',ataqueTierra)

    let btnReiniciar = document.getElementById('btn-reiniciar')
    btnReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador(){
    
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'


    let hipodoge = document.getElementById('hipodoge')
    let capipepo = document.getElementById('capipepo') 
    let ratigueya = document.getElementById('ratigueya') 
    let mascotaJugador = document.getElementById('mascota-jugador')
    if(hipodoge.checked){
        //alert('Mascota seleccionada: hipodoge')
        mascotaJugador.innerHTML = 'Hipodoge'
    }
    else if(capipepo.checked){
        //alert('Mascota seleccionada: capipepo')
        mascotaJugador.innerHTML = 'Capipepo'
    }
    else if(ratigueya.checked){
       // alert('Mascota seleccionada: ratigueya')
        mascotaJugador.innerHTML = 'Ratigueya'
    }
    else{
        alert('No ha seleccionado una mascota.')
    }

    seleccionarMascotaEnemigo()
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(1,3)
    let mascotaEnemigo = document.getElementById('mascota-enemigo')
    
    if(mascotaAleatorio == 1){
        mascotaEnemigo.innerHTML = 'Hipodoge'
    } else if(mascotaAleatorio ==2){
        mascotaEnemigo.innerHTML = 'Capipepo'
    }else{
        mascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueEnemigo()
}

function ataqueEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    
    if(ataqueAleatorio == 1 ){
        varataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio == 2 ){
        varataqueEnemigo = 'AGUA'
    }else{
        varataqueEnemigo = 'TIERRA'
    }

    combate()
}
 
 
function mensaje(resultado){

    let sectionMensaje = document.getElementById('resultadoSuerte')
    let ataquedeJugador = document.getElementById('ataque-de-Jugador')
    let ataquedeEnemigo = document.getElementById('ataque-de-Enemigo')

    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    
    sectionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = varataqueEnemigo

    ataquedeJugador.appendChild(nuevoAtaqueJugador)
    ataquedeEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeResultado(resultadoFinal){

    let sectionMensaje = document.getElementById('resultadoSuerte')

    sectionMensaje.innerHTML= resultadoFinal


    let btnFuego = document.getElementById('btn-fuego')
    btnFuego.disabled = true
    let btnAgua = document.getElementById('btn-agua')
    btnAgua.disabled = true
    let btnTierra = document.getElementById('btn-tierra')
    btnTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'

}

function combate(){

    let spanvidaJugador = document.getElementById('vida-jugador')
    let spanvidaEnemigo = document.getElementById('vida-enemigo')


    if (varataqueEnemigo == ataqueJugador) {
        mensaje("EMPATE")
    } else if (ataqueJugador == 'FUEGO' && varataqueEnemigo == 'TIERRA') {
        mensaje("GANASTE")
        vidaEnemigo = vidaEnemigo -1
        spanvidaEnemigo.innerHTML = vidaEnemigo
    } else if (ataqueJugador == 'AGUA' && varataqueEnemigo == 'FUEGO') {
        mensaje("GANASTE")
        vidaEnemigo = vidaEnemigo -1
        spanvidaEnemigo.innerHTML = vidaEnemigo
    } else if (ataqueJugador == 'TIERRA' && varataqueEnemigo == 'AGUA') {
        mensaje("GANASTE")
        vidaEnemigo = vidaEnemigo -1
        spanvidaEnemigo.innerHTML = vidaEnemigo
    } else {
        mensaje("PERDISTE")
        vidaJugador = vidaJugador -1
        spanvidaJugador.innerHTML = vidaJugador
    }

    revisarVidas()
}

function revisarVidas(){
    if(vidaEnemigo ==0){
        mensajeResultado('GANASTE!!!')
    }else if (vidaJugador == 0) {
        mensajeResultado('PERDISTE!!!')
    }
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarjuego)