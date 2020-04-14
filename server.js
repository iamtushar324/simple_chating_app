const http = require('http')
const exp = require('express')

const app = exp()
const socketio = require('socket.io')
const { db, chat_users } = require('./db/db')


const server = http.createServer(app)
const io = socketio(server)

app.use(exp.static(__dirname + "/public"))

io.on('connection', (socket) => {

    console.log("socket connected with id : " + socket.id)
})





db.sync(() => {
    server.listen(2020, () => {
        console.log("server started At http://localhost:2000")
    })
})