
let jugador = 0
let min = 1
let max = 3
let pc = 0
let ganada = 0
let perdida = 0

while (ganada <3 && perdida <3){
    pc = aleatorio(1,3) //Funci�n
    jugador = prompt("Elige: \n 1 - Piedra \n 2 - Papel \n 3 - Tijera")
    //alert("Elegiste: " + jugador)

    //Opciones
    alert("PC elige: " + eleccion(pc))
    alert("Tu elegiste: " + eleccion(jugador))


    //Juego
    if (pc == jugador) {
        alert("EMPATE")
    } else if (jugador == 1 && pc == 3) {
        alert("GANASTE")
        ganada += 1
    } else if (jugador == 2 && pc == 1) {
        alert("GANASTE")
        ganada += 1
    } else if (jugador == 3 && pc == 2) {
        alert("GANASTE")
        ganada += 1
    } else {
        alert("PERDISTE")
        perdida += 1
    }

    //Aleatorio
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //Que elige
    function eleccion(jugada) {
        let resultado = ""

        if (jugada == 1) {
            resultado = "Piedra"
        } else if (jugada == 2) {
            resultado = "Papel"
        } else if (jugada == 3) {
            resultado = "Tijera"
        } else {
            resultado = "Error al ingresar opcion."
        }

        return resultado
    }
    
    alert ("Ganaste " + ganada + "y Perdiste " + perdida)
}
