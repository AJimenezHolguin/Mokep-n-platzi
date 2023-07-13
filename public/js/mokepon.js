//Esta funcion me sirve para que primero se cargue el html y luego se ejecute mi, pero debo colocar la funcion window.addEventlistener("load",iniciarJuego)

/* las variables "const" son aquellas que su valor o elemento no cambian
mientras que en las variables "let" su valor o elemento si pueden cambiar */

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
sectionReiniciar.style.display = "none"
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let  mokepones = [] /*esto es un array donde podemos meter todos los valores que queramos*/ 
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipego 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonTierra 
let botonAgua 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src ="./assets/mokemap.png "
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
/*todas las class en js comienzan con mayuscula ej: "Mokepon"*/ 
class Mokepon {
    constructor (nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

        pintarMokepon() {
        lienzo.drawImage( //esta funcion "drawImage()" sirve para cargar una imagen a mi canvas
        this.mapaFoto,
        this.x, // valor de x
        this.y, // valor de y
        this.ancho, // width(ancho)
        this.alto // height (alto) 
        )
    }
}

let hipodoge = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")

let capipego = new Mokepon("Capipego","./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")

let ratigueya = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5, "./assets/ratigueya.png")  


/* mokepones.push(hipodoge,capipego,ratigueya) la propiedad .push va insertando los valores o elementos a mi array "mokepones"*/ 

const HIPODOGE_ATAQUES = [
    {nombre: "💧",id:"boton-agua"},
    {nombre: "🔥",id:"boton-fuego"},
    {nombre: "💧",id:"boton-agua"},
    {nombre: "🌱",id:"boton-tierra"},
    {nombre: "💧",id:"boton-agua"},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEGO_ATAQUES = [
    {nombre: "🌱",id:"boton-tierra"},
    {nombre: "💧",id:"boton-agua"},
    {nombre: "🌱",id:"boton-tierra"},
    {nombre: "🔥",id:"boton-fuego"},
    {nombre: "🌱",id:"boton-tierra"},
]

capipego.ataques.push(...CAPIPEGO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    {nombre: "🔥",id:"boton-fuego"},
    {nombre: "💧",id:"boton-agua"},
    {nombre: "🔥",id:"boton-fuego"},
    {nombre: "🌱",id:"boton-tierra"},
    {nombre: "🔥",id:"boton-fuego"},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

    mokepones.push(hipodoge,capipego,ratigueya)

    function iniciarJuego(){
        /*la propiedad style le da estilos por defectos a la pagina los cuales podemos modificar
        y la propiedad display="none" nos ayuda a ocultar nuestro elemento html*/   
        sectionSeleccionarAtaque.style.display = "none"
        sectionVerMapa.style.display = "none"
        /*el metodo .forEach nos sirve para recorrer todos los elementos que se encuentran en el arreglo "mokepones"*/ 
        mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `  
        /*agregamos el simbolo + para que todas nuestras tarjetas de mokepones aparezcan*/ 
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipego = document.getElementById("Capipego")
        inputRatigueya = document.getElementById("Ratigueya")

        })    
        
        botonMascota.addEventListener("click",seleccionarMascotaJugador)
        botonReiniciar.addEventListener("click", reiniciarJuego)
        
        unirseAlJuego()
        
    }
    
    function unirseAlJuego(){
        fetch("http://192.168.0.16:8080/unirse") //fetch nos permite realizar llamadas hacia otros servicios como a HTTP
            .then(function(res){
                if (res.ok) {
                    res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
                }
            })
    
    }


    function seleccionarMascotaJugador() {
        //la propiedad display="block" nos ayuda a mostrar la seccion que se ha ocultado
        
        /*let imagenDeCapipego = new Image()
        imagenDeCapipego.src = capipego.foto*/
        
        
        if (inputHipodoge.checked){
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id
        } else if (inputCapipego.checked) {
            spanMascotaJugador.innerHTML = inputCapipego.id 
            mascotaJugador = inputCapipego.id
        } else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
        } else {
            alert("¡SELECCIONA UNA MASCOTA!")
            return
        }    
        sectionSeleccionarMascota.style.display = "none"
        
        seleccionarMokepon(mascotaJugador)

        extraerAtaques(mascotaJugador)

        sectionVerMapa.style.display ="flex"
        iniciarMapa()

        
        }


        function seleccionarMokepon (mascotaJugador){
            fetch(`http://192.168.0.16:8080/mokepon/${jugadorId}`,{
                method: "post", // peticion tipo post
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    mokepon: mascotaJugador
                })
            })

        }

        function extraerAtaques(mascotaJugador){
            let ataques 
            for (let i = 0; i < mokepones.length; i++) {
                if (mascotaJugador === mokepones[i].nombre) {
                    ataques = mokepones[i].ataques 
                }   
            }
            mostrarAtaques(ataques)
        }

        function mostrarAtaques(ataques){
            ataques.forEach((ataque)=>{
                ataquesMokepon = `
                <button id = ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre} </button>
                `
                contenedorAtaques.innerHTML += ataquesMokepon
            })
                botonFuego = document.getElementById("boton-fuego")
                botonAgua = document.getElementById("boton-agua")
                botonTierra = document.getElementById("boton-tierra")

                botones = document.querySelectorAll(".BAtaque") /*.querySelectorAll() sirve para seleccionar a todos los elementos que tengan "algo" para este caso ese "algo"seria una clase */            
        }
        function secuenciaAtaque(){
            botones.forEach((boton) => {
                boton.addEventListener ("click",(e)=>{
            
                    if(e.target.innerText === "🔥"){
                        ataqueJugador.push("FUEGO🔥")
                        console.log(ataqueJugador)
                        boton.style.background = "#112f58"
                        boton.disabled = true
                    } else if(e.target.innerText === "💧") {
                        ataqueJugador.push("AGUA💧")
                        console.log(ataqueJugador)
                        boton.style.background = "#112f58"
                        boton.disabled = true
                    } else {
                        ataqueJugador.push("TIERRA🌱")
                        console.log(ataqueJugador)
                        boton.style.background = "#112f58"
                        boton.disabled = true 
                    }  
                    if (ataqueJugador.length === 5) {
                        enviarAtaques()
                    }                         
                    })
            })            
        }

        function enviarAtaques(){
            fetch(`http://192.168.0.16:8080/mokepon/${jugadorId}/ataques`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ataques: ataqueJugador
                })
            })

            intervalo = setInterval(obtenerAtaques, 50)
            
            }

            function obtenerAtaques(){
                fetch(`http://192.168.0.16:8080/mokepon/${enemigoId}/ataques`) //los metodos de servidor get no necesitan method ni headers ya los trae por defecto
                .then(function (res) {
                    if (res.ok) {
                        res.json()
                            .then(function({ ataques }){
                                if (ataques.length === 5) {
                                    ataqueEnemigo = ataques
                                    combate()
                                }
                            })
                    }
                })
            }
            
        

        function seleccionarMascotaEnemigo(enemigo) {
            spanMascotaEnemigo.innerHTML = enemigo.nombre
            ataquesMokeponEnemigo = enemigo.ataques
            
            secuenciaAtaque()
        }

        function ataqueAleatorioEnemigo(){
            console.log("Ataque enemigo" , ataquesMokeponEnemigo)
            let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length)

            if (ataqueAleatorio == 0 || ataqueAleatorio ==1){
                ataqueEnemigo.push("FUEGO🔥")
            }else if (ataqueAleatorio == 3 || ataqueAleatorio ==4){
                ataqueEnemigo.push("AGUA💧")
            } else {
                ataqueEnemigo.push("TIERRA🌱")
            }
            console.log(ataqueEnemigo)
            iniciarPelea()

        }

        function iniciarPelea (){
            if(ataqueJugador.length === 5){
                combate()
                alert("selecciona tu ataque")
            }
        }

        function indexAmbosOponentes(jugador, enemigo){
            indexAtaqueJugador = ataqueJugador[jugador]
            indexAtaqueEnemigo = ataqueEnemigo[enemigo]
        }

        function combate() {           
            clearInterval(intervalo)

            for (let index = 0; index < ataqueJugador.length; index++) {
                if (ataqueJugador[index] ===ataqueEnemigo[index]){
                    indexAmbosOponentes(index, index)
                    crearMensaje("😮¡¡¡EMPATE!!!😮")
                    spanVidasJugador.innerHTML = victoriasJugador
                    spanVidasEnemigo.innerHTML = victoriasEnemigo
                    
                } else if (ataqueJugador[index] === "FUEGO🔥" && ataqueEnemigo[index] === "TIERRA🌱"){
                    indexAmbosOponentes(index, index)
                    crearMensaje("😎¡¡¡GANASTE!!!😎")
                    victoriasJugador++
                    spanVidasJugador.innerHTML = victoriasJugador  
                } else if (ataqueJugador[index] === "AGUA💧" && ataqueEnemigo[index] === "FUEGO🔥"){
                    indexAmbosOponentes(index, index)
                    crearMensaje("😎¡¡¡GANASTE!!!😎")
                    victoriasJugador++
                    spanVidasJugador.innerHTML = victoriasJugador   
                } else if (ataqueJugador[index] === "TIERRA🌱" && ataqueEnemigo[index] === "AGUA💧"){
                    indexAmbosOponentes(index, index)
                    crearMensaje("😎¡¡¡GANASTE!!!😎")
                    victoriasJugador++
                    spanVidasJugador.innerHTML = victoriasJugador   
                } else {
                    indexAmbosOponentes(index, index)
                    crearMensaje("😭¡¡¡PERDISTE!!!😭")
                    victoriasEnemigo++
                    spanVidasEnemigo.innerHTML = victoriasEnemigo
                }
            }
        
        revisarVidas()
    }

    function revisarVidas() {
        if (victoriasJugador == victoriasEnemigo) {
            crearMensajeFinal("😮¡ESTO FUE UN EMPATE!😮")         
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("🎉¡FELICITACIONES GANASTE!🎉")         
    } else {
        crearMensajeFinal("😭¡LO SIENTO PERDISTE!😭")
    }
    }


   //funcion para crear mensajes (elementos)       .createElement() archivo html

   //funcion .appendChild() nos ayuda agregar elementos que ya hemos creado con js para insertarlos a algun otro elemento de nuestro html

    function crearMensaje (resultado){
        let nuevoAtaqueDelJugador = document.createElement("p")
        let nuevoAtaqueDelEnemigo = document.createElement("p")   
        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
        //let parrafo = document.createElement("p")
        //parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo +"---" + resultado
        ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    }

    function crearMensajeFinal (resultadoFinal){    
        sectionMensajes.innerHTML = resultadoFinal
        //el atributo "disabled" sirve para deshabilitar los botones
        
        sectionReiniciar.style.display = "block"    
    }
    //el metodo location.reload() nos sirve para recargar nuevamente la pagina en la localidad en donde nos encontremos
    function reiniciarJuego() {
    location.reload()
    
    }
    //Esta conbinacion de funciones me sirve para sacar un numero aleatorio desde un minimo a un maximo
    function aleatorio (min,max) {
        return Math.floor(Math.random()*(max - min + 1)+min)
    }

    function pintarCanvas() {
    
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
        // lienzo.fillRect(5,15,20,40) la funcion "fillRect(x,y,width,height)" lo que hace es crear un rectangulo dentro del canvas
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height,
        )
        
    mascotaJugadorObjeto.pintarMokepon()
    
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)

    })
}

    function enviarPosicion(x, y){
        fetch(`http://192.168.0.16:8080/mokepon/${jugadorId}/posicion`,{  //cordenadas del mokepon tipo post
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function(res){
            if(res.ok){
                res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png",enemigo.id)
                        } else if(mokeponNombre === "Capipego"){
                            mokeponEnemigo = new Mokepon("Capipego","./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png",enemigo.id)
                        } else if(mokeponNombre ==="Ratigueya"){
                            mokeponEnemigo = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5, "./assets/ratigueya.png",enemigo.id)
                        }

                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        
                        return mokeponEnemigo

                    })
                    
                })
            }
        })
    }

    function moverDerecha(){
        mascotaJugadorObjeto.velocidadX = 5
    
    }

    function moverIzquierda(){
        mascotaJugadorObjeto.velocidadX = - 5
    
    }

    function moverArriba(){
        mascotaJugadorObjeto.velocidadY = -5
    
    }

    function moverAbajo(){
        mascotaJugadorObjeto.velocidadY = 5
    
    }

    function detenerMovimiento(){
        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }

    function sePresionoUnaTecla(event){
        switch (event.key) {
            case "ArrowUp":
                moverArriba()
                break
            case "ArrowDown":
                moverAbajo()
                break
            case "ArrowRight":
                moverDerecha()
                break    
            case "ArrowLeft":
                moverIzquierda()
                break       
            default:
                break
        }
    }

    function iniciarMapa(){
        
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)   
        console.log(mascotaJugadorObjeto,mascotaJugador)
        intervalo = setInterval(pintarCanvas,50) //funcion setInterval me permite ejecutar una funcion continuamente (en el primer parametro se llama la funcion a ejecutar, y en el segundo parametro se llama en milisegundo cada cuanto se va a ejecutar esa funcion)
        
        window.addEventListener("keydown",sePresionoUnaTecla) //evento "keydown" nos sirve para mantener tecla del teclado presionado y que nuestro mokepon se mueva

        window.addEventListener("keyup",detenerMovimiento) // "evento keyup"lo que hace es detener el movimiento de nuestro mokepon realizado por tecla del teclado

    }

function obtenerObjetoMascota (){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i] 
        }   
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota= mascotaJugadorObjeto.y
    const abajoMascota= mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota= mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota= mascotaJugadorObjeto.x

if( 
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
        }

        detenerMovimiento()
        clearInterval(intervalo)
        console.log("se detecto una colision")

        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
        //alert("hay colision con " + enemigo.nombre)
}

window.addEventListener("load", iniciarJuego)



/*tabla de operadores

condicion 1 operador condicion 2    resultado
veradero    and (&)   verdadero       verdadero
verdadero   and (&)    falso           falso
falso       and (&)    falso           falso
falso       and (&)    verdadero       falso   
falso       and (&)    falso           falso

verdadero   or (||)     verdadero       verdadero
verdadero   or (||)     falso           verdadero
falso       or (||)     verdadero       verdadero
falso       or (||)     falso           falso 

verdadero   not (!)                         falso
falso       not (!)                        verdadero */