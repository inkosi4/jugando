function iniciarjuego(){
    let btnMascotaJugador = document.getElementById('btn-seleccionar')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    
    let hipodoge = document.getElementById('hipodoge')
    let capipepo = document.getElementById('capipepo') 
    let ratigueya = document.getElementById('ratigueya') 
    
    if(hipodoge.checked){
        alert('Mascota seleccionada: hipodoge')
    }
    else if(capipepo.checked){
        alert('Mascota seleccionada: capipepo')
    }
    else if(ratigueya.checked){
        alert('Mascota seleccionada: ratigueya')
    }
    else{
        alert('No ha seleccionado una mascota.')
    }
}

window.addEventListener('load', iniciarjuego)