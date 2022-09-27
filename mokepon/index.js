const express = require("express") //Importa librería
const app = express() // Inicia la conexión

//Comando de instalación: npm install cors
const cors = require("cors") // Importa librería para solucionar errores de acceso Control Origin
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

//
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

//Se indica el puerto
app.listen(8080, () => { 
    console.log("Servidor funcionando")
})



