//Comando de instalación: npm install cors
const express = require("express") //Importa librería
const cors = require("cors") // Importa librería para solucionar errores de acceso Control Origin
const app = express() // Inicia la conexión


//archivos estaticos
app.use(express.static('public'))
app.use(cors())
app.use(express.json())





const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}


//petición y respuesta
//app.get("/", (req, rest) => { 
//    rest.send("Hola")
//})

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
    
}


app.get("/unirse", (req, rest) => { 
    
    const id = `${Math.random()}`
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    //meta datos para conexión segura - Access-Control-Allow-Origin
    rest.setHeader("Access-Control-Allow-Origin","*")

    rest.send(id) //Identificador de jugador
})

// end point
app.post("/mokepon/:jugadorid", (req,res) =>{
    
    //Obtiene información de la url
    const jugadorid = req.params.jugadorid || ""
    
    //Extraer mascota seleccionada
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorid === jugador.id)
    
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorid)

    res.end()
})

app.post("/mokepon/:jugadorid/posicion", (req, res) =>{
    const jugadorid = req.params.jugadorid || ""

    const x = req.body.x || ""
    const y = req.body.y || ""

    //Acceder al jugador
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorid === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    //Filtrar jugadores menos el de consulta
    const enemigos = jugadores.filter((jugador) => jugadorid !== jugador.id)

    res.send({
        enemigos
    })
})

//Ataques
app.post("/mokepon/:jugadorid/ataques", (req,res) =>{
    
    //Obtiene información de la url
    const jugadorid = req.params.jugadorid || ""
    const ataques = req.body.ataques || [] //Vacío
        
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorid === jugador.id)
    
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/mokepon/:jugadorid/ataques", (req, res) => {
    const jugadorid = req.params.jugadorid || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorid)

    res.send({
        ataques: jugador.ataques || []
    })
})


//Se indica el puerto
app.listen(8080, () => { 
    console.log("Servidor funcionando")
})



