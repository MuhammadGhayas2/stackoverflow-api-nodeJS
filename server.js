import http from 'node:http'
const PORT=8000

const server=http.createServer((req,res)=>{
    res.end("Hello from server")
})

server.listen(PORT,()=>console.log(`Server is Listening at PORT ${PORT}`))