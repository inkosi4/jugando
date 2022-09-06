//iniciarjuego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const btnMascotaJugador = document.getElementById('btn-seleccionar')
//const btnFuego = document.getElementById('btn-fuego')
//const btnAgua = document.getElementById('btn-agua')
//const btnTierra = document.getElementById('btn-tierra')
const btnReiniciar = document.getElementById('btn-reiniciar')

//seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
//let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')

const mascotaJugador = document.getElementById('mascota-jugador')

//seleccionarMascotaEnemigo
const mascotaEnemigo = document.getElementById('mascota-enemigo')

//combate
const spanvidaJugador = document.getElementById('vida-jugador')
const spanvidaEnemigo = document.getElementById('vida-enemigo')

//mensaje
const sectionMensaje = document.getElementById('resultadoSuerte')
const ataquedeJugador = document.getElementById('ataque-de-Jugador')
const ataquedeEnemigo = document.getElementById('ataque-de-Enemigo')
const nuevoAtaqueJugador = document.createElement('p')
const nuevoAtaqueEnemigo = document.createElement('p')


const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

//mensajeResultado
//let sectionMensaje = document.getElementById('resultadoSuerte')
//let btnFuego = document.getElementById('btn-fuego')
//let btnAgua = document.getElementById('btn-agua')
//let btnTierra = document.getElementById('btn-tierra')
//let sectionReiniciar = document.getElementById('reiniciar')

let ataqueJugador
let varataqueEnemigo
let hipodoge
let capipepo 
let ratigueya
let btnFuego
let btnAgua
let btnTierra
let botones = []
let mascotadeJugador
let ataquesMokepon
let vidaJugador = 3
let vidaEnemigo = 3

let mokepones = []

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let mokeponhipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5)
let mokeponcapipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5)
let mokeponratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5)

mokeponhipodoge.ataques.push(
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'}
)

mokeponcapipepo.ataques.push(
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'}
)

mokeponratigueya.ataques.push(
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'}
)

mokepones.push(mokeponhipodoge,mokeponcapipepo,mokeponratigueya)


function iniciarjuego(){

    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((newmokepon) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${newmokepon.nombre} />
        <label class="tarjeta-mokepon" for=${newmokepon.nombre}>
            <p>${newmokepon.nombre}</p>
            <img src=${newmokepon.foto} alt=${newmokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones

        hipodoge = document.getElementById('Hipodoge')
        capipepo = document.getElementById('Capipepo') 
        ratigueya = document.getElementById('Ratigueya') 

    })

    sectionReiniciar.style.display = 'none'
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    btnReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador(){
        
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    
    


    if(hipodoge.checked){
        mascotaJugador.innerHTML =  hipodoge.id
        mascotadeJugador = hipodoge.id
    }
    else if(capipepo.checked){
        mascotaJugador.innerHTML = capipepo.id
        mascotadeJugador = capipepo.id
    }
    else if(ratigueya.checked){
        mascotaJugador.innerHTML = ratigueya.id
        mascotadeJugador = ratigueya.id
    }
    else{
        alert('No ha seleccionado una mascota.')
    }
    extraerAtaques(mascotadeJugador)
    seleccionarMascotaEnemigo()
    
}

function extraerAtaques(mascotadeJugador){
    let leataques
    
    for (let i = 0; i < mokepones.length; i++) {
        
        if(mascotadeJugador == mokepones[i].nombre){
            leataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(leataques)
}

function mostrarAtaques(leataques){
    leataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.idAtaq} class="btn-ataque BAtaque">${ataque.nombreAtaq} </button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')

    botones = document.querySelectorAll('.BAtaque')

    btnFuego.addEventListener('click',ataqueFuego)
    btnAgua.addEventListener('click',ataqueAgua)
    btnTierra.addEventListener('click',ataqueTierra)
    
}

function secuenciaAtaque(){

}

function seleccionarMascotaEnemigo(){

    let mascotaAleatorio = aleatorio(0,mokepones.length -1)
   
    mascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre

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

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = varataqueEnemigo

    ataquedeJugador.appendChild(nuevoAtaqueJugador)
    ataquedeEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeResultado(resultadoFinal){

    sectionMensaje.innerHTML= resultadoFinal
    
    btnFuego.disabled = true
    btnAgua.disabled = true
    btnTierra.disabled = true
   
    sectionReiniciar.style.display = 'block'

}

function combate(){


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