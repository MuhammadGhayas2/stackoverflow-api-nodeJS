import http from 'node:http'
import {getDataFromDB} from './db.js'
const PORT=8000

const server=http.createServer(async(req,res)=>{
    const urlObj=new URL(req.url,`http://${req.headers.host}`)
    const data=await getDataFromDB() 
    if(urlObj.pathname==='/api/questions'){
        res.end(JSON.stringify(data))
    }

})


server.listen(PORT,()=>console.log(`Server is Listening at PORT ${PORT}`))