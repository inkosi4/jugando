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



const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

//mensajeResultado
//let sectionMensaje = document.getElementById('resultadoSuerte')
//let btnFuego = document.getElementById('btn-fuego')
//let btnAgua = document.getElementById('btn-agua')
//let btnTierra = document.getElementById('btn-tierra')
//let sectionReiniciar = document.getElementById('reiniciar')

//let ataqueJugador
let varataqueEnemigo = []
let hipodoge
let capipepo 
let ratigueya
let btnFuego
let btnAgua
let btnTierra
let botones = []
let ataqueJugadorArray = []
let mascotadeJugador
let ataquesMokepon
let ataquesmokeponEnemigo
let iAtaqueJugador
let iAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
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

}

function secuenciaAtaque(){

    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) =>{
            
            let o = e.target.textContent.trimEnd()

            if(o == 'fuego'){
                ataqueJugadorArray.push('fuego')
                console.log(ataqueJugadorArray)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (o == 'agua'){
                ataqueJugadorArray.push('agua')
                console.log(ataqueJugadorArray)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugadorArray.push('tierra')
                console.log(ataqueJugadorArray)
                boton.style.background = '#112f58'
                boton.disabled = true
            }

            //Se agrega al flujo para que luego de seleccionar un ataque, el enemigo seleccione el suyo
            ataqueEnemigo()

        })
    })

    

}

function seleccionarMascotaEnemigo(){

    let mascotaAleatorio = aleatorio(0,mokepones.length -1)
   
    mascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesmokeponEnemigo = mokepones[mascotaAleatorio].ataques

    secuenciaAtaque()
}

function ataqueFuego(){
    ataqueEnemigo()
}

function ataqueAgua(){
    ataqueEnemigo()
}

function ataqueTierra(){
    ataqueEnemigo()
}

function ataqueEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesmokeponEnemigo.length -1)
    
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1 ){
        varataqueEnemigo.push('fuego') 
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
        varataqueEnemigo.push('agua')
    }else{
        varataqueEnemigo.push('tierra')
    }
    console.log(varataqueEnemigo)
    iniciarPelea()
}
 
function iniciarPelea(){
    if(ataqueJugadorArray.length == 5){
        combate()
    }
}
 
function mensaje(resultado){

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = iAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = iAtaqueEnemigo

    ataquedeJugador.appendChild(nuevoAtaqueJugador)
    ataquedeEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeResultado(resultadoFinal){

    sectionMensaje.innerHTML= resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function iAmbosOponentes(jugador,enemigo){
    iAtaqueJugador = ataqueJugadorArray[jugador]
    iAtaqueEnemigo = varataqueEnemigo[enemigo]
}

function combate(){
    
    for (let i = 0; i < ataqueJugadorArray.length; i++) {
        
        if(ataqueJugadorArray[i] == varataqueEnemigo[i]){
            iAmbosOponentes(i,i)
            mensaje('EMPATE')
        } else if (ataqueJugadorArray[i] == 'fuego' && varataqueEnemigo[i] == 'tierra'){
            iAmbosOponentes(i,i)
            mensaje('GANASTE')
            victoriasJugador++
            spanvidaJugador.innerHTML = victoriasJugador
        } else if (ataqueJugadorArray[i] == 'agua' && varataqueEnemigo[i] == 'fuego') {
            iAmbosOponentes(i,i)
            mensaje("GANASTE")
            victoriasJugador++
            spanvidaJugador.innerHTML = victoriasJugador
        } else if (ataqueJugadorArray[i] == 'tierra' && varataqueEnemigo[i] == 'agua') {
            iAmbosOponentes(i,i)
            mensaje("GANASTE")
            victoriasJugador++
            spanvidaJugador.innerHTML = victoriasJugador
        } else {
            iAmbosOponentes(i,i)
            mensaje("PERDISTE")
            victoriasEnemigo++
            spanvidaEnemigo.innerHTML = victoriasEnemigo
        }
        
    }


    revisarVictorias()
}

function revisarVictorias(){
    if(victoriasJugador == victoriasEnemigo){
        mensajeResultado('Esto fue un empate!!!')
    }else if (victoriasJugador > victoriasEnemigo) {
        mensajeResultado('Ganaste!!!')
    }else{
        console.log(victoriasJugador)
        console.log(victoriasEnemigo)
        mensajeResultado('El enemigo ha ganado!!!')
    }
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarjuego)