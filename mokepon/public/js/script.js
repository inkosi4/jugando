//const { json } = require("express")

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
let miMokepon
let ataquesMokepon
let ataquesmokeponEnemigo
let iAtaqueJugador
let iAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidaJugador = 3
let vidaEnemigo = 3

let mokepones = []

//Lista de enemigos
let mokeponesEnemigos = []


//Para enviar datos al backend
let jugadorid = null
let enemigoid = null
//mapa

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image
mapaBackground.src = './assets/mokemap.png'

//Contorl de Ancho y Alto de Mapa
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let mokeponhipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5,'./assets/hipodoge.png')
let mokeponcapipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
let mokeponratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')

//enemigo anterior
//let mokeponhipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5,'./assets/hipodoge.png')
//let mokeponcapipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
//let mokeponratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')


const hipodoge_ataques =[
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'}
]

const capipepo_ataques = [
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'}
]

const ratigueya_ataques = [
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'fuego', idAtaq: 'btn-fuego'},
    {nombreAtaq: 'agua', idAtaq: 'btn-agua'},
    {nombreAtaq: 'tierra', idAtaq: 'btn-tierra'}
]

mokeponhipodoge.ataques.push(...hipodoge_ataques)
//mokeponhipodogeEnemigo.ataques.push(...hipodoge_ataques)

mokeponcapipepo.ataques.push(...capipepo_ataques)
//mokeponcapipepoEnemigo.ataques.push(...capipepo_ataques)

mokeponratigueya.ataques.push(...ratigueya_ataques)
//mokeponratigueyaEnemigo.ataques.push(...ratigueya_ataques)


mokepones.push(mokeponhipodoge,mokeponcapipepo,mokeponratigueya)


function iniciarjuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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

    unirseJuego()

}

function unirseJuego(){
    fetch("http://192.168.1.63:8080/unirse").then(function(res){
        //console.log(res)
        if(res.ok){
            res.text().then(function(respuesta){
                console.log(respuesta)
                jugadorid = respuesta
            })
        }
    })

}

function seleccionarMascotaJugador(){
        
    

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
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotadeJugador) //Para enviar el dato al backend


    extraerAtaques(mascotadeJugador)

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJug){
    fetch(`http://192.168.1.63:8080/mokepon/${jugadorid}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJug //Esta variable se pasa al backend para el nombre del mokepon
        })
    })
}

function extraerAtaques(mascotadeJugador){
    let ataques
    
    for (let i = 0; i < mokepones.length; i++) {
        
        if(mascotadeJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
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
            //Antiguo ataque enemigo
            //ataqueEnemigo()

            //Nueva función que viene con los enemigos seleccionados desde el server
            if(ataqueJugadorArray.length === 5){
                enviarAtaques()
            }
            

        })
    })

}

function enviarAtaques(){
    fetch(`http://192.168.1.63:8080/mokepon/${jugadorid}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        ataques: ataqueJugadorArray
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

//Valida si se seleccionaron los 5 ataques por jugador.
function obtenerAtaques(){
    fetch(`http://192.168.1.63:8080/mokepon/${enemigoid}/ataques`).then(function(res){
        if(res.ok){
            res.json().then(function({ ataques }){
                if(ataques.length === 5){
                    varataqueEnemigo = ataques
                    combate()
                }
            })
        }
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
    console.log('Ataques enemigo', ataquesmokeponEnemigo);
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

    clearInterval(intervalo) //termina la actualización cada 50 milisegundos
    
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

function pintaCanvas(){
        
    miMokepon.x = miMokepon.x + miMokepon.velocidadX
    miMokepon.y = miMokepon.y + miMokepon.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    //Se inicia en el Constructor
    miMokepon.pintarMokepon()
    //Anterior mokepon enemigo, ahora es dinámico en base a las conexión del server
    //mokeponcapipepoEnemigo.pintarMokepon()
    //mokeponhipodogeEnemigo.pintarMokepon()
    //mokeponratigueyaEnemigo.pintarMokepon()

    //Enviar posición del Mokepon al backend
    enviarPosicion(miMokepon.x, miMokepon.y)

    //Dibuja los mokepones
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon) //nueva colisión, con los enemigos llegando desde el server
    })

    //colisión antigua

    //if(miMokepon.velocidadX !==0 || miMokepon.velocidadY !== 0){
    //    revisarColision(mokeponhipodogeEnemigo)
    //    revisarColision(mokeponcapipepoEnemigo)
    //    revisarColision(mokeponratigueyaEnemigo)
    //}
    
}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.63:8080/mokepon/${jugadorid}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x: x,
            y: y
        })
    }).then(function (res){
        if(res.ok){
            res.json().then(function({enemigos}){
                console.log(enemigos)
                //Nueva creación de enemigos en base a los que se conectan
                //Antes era forEach, el map retorna una respuesta
                
                mokeponesEnemigos = enemigos.map(function(enemigo){ 
                    //mokeponNombre Viene del servidor
                    const mokeponNombre = enemigo.mokepon.nombre || "" 
                    let mokeponEnemigo = null
                    if (mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5,'./assets/hipodoge.png',enemigo.id)
                    }else if (mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png', enemigo.id)
                    } else if (mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png', enemigo.id)
                    } 

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    //mokeponEnemigo.pintarMokepon()

                    return mokeponEnemigo
                })
                
                
                

            })
        }
    })
}

function moverDerecha(){
    miMokepon.velocidadX = 5
    
}

function moverIzquierda(){
    miMokepon.velocidadX = -5
}

function moverAbajo(){
    miMokepon.velocidadY = 5
}

function moverArriba(){
    miMokepon.velocidadY = -5
}

function detener(){
    miMokepon.velocidadX = 0
    miMokepon.velocidadY = 0    
}

function presionLetra(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    
    mapa.width = 320
    mapa.height = 240
    miMokepon = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintaCanvas, 50)

    window.addEventListener('keydown', presionLetra)

    window.addEventListener('keyup', detener)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        
        if(mascotadeJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = miMokepon.y
    const abajoMascota = miMokepon.y + miMokepon.alto
    const derechaMascota = miMokepon.x + miMokepon.ancho
    const izquierdaMascota = miMokepon.x
    


    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return 
    }
    
    

    detener()
    clearInterval(intervalo) //Para que no se repita nuevamente el llamado a la selección de mascota
    
    enemigoid = enemigo.id //Para saber quien es el enemigo
    
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    seleccionarMascotaEnemigo(enemigo)
    //alert("Hay Colisión: " + enemigo.nombre)
    
}


window.addEventListener('load', iniciarjuego)