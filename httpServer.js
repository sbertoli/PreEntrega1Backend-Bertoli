import http from 'http'

const server = http.createServer((request,response)=>{
    console.log("nueva peticion recibida de algun cliente")
    response.end("hola backend");
})

server.listen(8080, ()=>console.log("listo el servidor en el puerto 8080"))