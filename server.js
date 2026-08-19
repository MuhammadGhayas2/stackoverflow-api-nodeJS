import http from 'node:http'
import { getDataFromDB } from './db.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api/questions') {
        const data = await getDataFromDB()
        let result = data
        if (queryObj.title) {
            result = result.filter((title) => title.title.toLowerCase().includes(queryObj.title.toLowerCase()))
        }
        if (queryObj.tags) {
            result = result.filter((tags) => tags.tags.includes(queryObj.tags))
        }
        if (queryObj.isAnswered) {
            const wanted = queryObj.isAnswered === 'true'
            result = result.filter((i) => i.isAnswered === wanted)
        }
        res.setHeader('Content-Type', 'application/json')
        if (result.length > 0) {
            res.statusCode = 200
            res.end(JSON.stringify(result))
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.end(JSON.stringify({ error: "Route not found" }))
        }


    }
    else if (urlObj.pathname.startsWith('/api/questions/')) {
        const data = await getDataFromDB()
        const id = Number(urlObj.pathname.split('/').pop())
        const question = data.find((q) => q.id === id)
        res.setHeader('Content-Type', 'application/json')
        if (question) {
            res.statusCode = 200
            res.end(JSON.stringify(question))
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.end(JSON.stringify({ error: "Route not found" }))
        }
    }


})



server.listen(PORT, () => console.log(`Server is Listening at PORT ${PORT}`))