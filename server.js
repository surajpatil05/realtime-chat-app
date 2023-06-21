const express = require('express') // javascript connection
const app = express()
const http = require('http').createServer(app) // creates http server

const PORT = process.env.PORT || 3000


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // application is running on port 3000
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})