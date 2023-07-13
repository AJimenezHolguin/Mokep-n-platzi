


//es una funcion que recibe dos parametros el primero en que url va a solicitar la información y el segundo es como se le va a transmitir la información o a recibir los datos de esa petición y a responder a la petición---el get nos indica que cada vez que un cliente solicite un recurso el get se lo de 
/*req = la peticion , res = el objeto que nos permite realizar las respuestas al usuario */ 

/*URI = UNIFORM RESOURCE IDENTIFIER = es la forma en la que podemos conectarnos a cualquier sitio con esa identificacion unica
partes de una URI=
https://platzi.com:44/search?=js#title entonces:
https : es el esquema (URI)
platzi.com: dominio (URI)
44:puerto (URI)
search:Ruta (URI)
search?=js:Cadena de busqueda (URI) 
title:nombre (URN)

localhost (es nuestra computadora)
y pueden haber puertos para conectarnos a ese localhost como por ej:
para conectarnos al correo puerto 587
para conectarno al nodJS puerto 8080

protocolo HTTP : Nos permite hacer peticiones y obtener respuestas, tambien hay diferentes peticiones unas donde se le envian datos al servidor y otras donde se le solicita respuestas al servidor
dos verbos HTTP
1 GET: Solicitar recursos
2 POST Nos permite enviar datos
ejemplo:
app.post (estamos enviando datos al servidor)
app.get (estamos solicitando datos al servidor)

JSON = JavaScript Object Notation no se define por class si no por objetos la estructura para definirse es {"clave":"valor"} un ejemplo seria {Nombre:"Diana"
                    Edad: 27   }


*/

const express = require ("express") //forma de importar la libreria express
const cors = require("cors") //impotar libreria que trabaja especialmente con la libreria express

const app =  express()

app.use(express.static("public")) // nos ayuda a servir archivos estaticos como html, css, imagenes etc dentro del servidor de node js ***para que funcione en el localhost:8080 para este caso hicimos esta linea de codigo y creamos una carpeta dentro de mokepon llamada "public"
app.use(cors()) //diciendole a express que utilice la libreria cors
app.use(express.json()) //habilitando la capacidad de recibir peticiones POST que traigan contenido en formato json


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

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }

}

app.get("/unirse",(req,res)=>{
    const id =`${Math.random()}`
    
    const jugador = new Jugador(id)
    
    jugadores.push(jugador)
    
    res.setHeader("Access-Control-Allow-Origin","*")

    res.send(id)
    
}) 

    
app.post("/mokepon/:jugadorId",(req,res)=> {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {    // servidor para cordenadas del mokepon
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) //metodo sobre javascript que nos permite ejecutar filtros sobre las listas y se llama 

    res.send({
        enemigos
    }) //en express solo puedes devolver json
})
   

app.post("/mokepon/:jugadorId/ataques",(req,res)=> {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
   

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
})


app.get("/mokepon/:jugadorId/ataques",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log("servidor funcionando")
})

