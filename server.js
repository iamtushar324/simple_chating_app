const http = require('http')
const exp = require('express')

const app = exp()
const socketio = require('socket.io')
const { db, chat_users } = require('./db/db')


const server = http.createServer(app)
const io = socketio(server)

app.use(exp.urlencoded({ extended: false }));
app.use(exp.json());

app.use(exp.static(__dirname + "/public"))

io.on('connection', (socket) => {

    console.log("socket connected with id : " + socket.id)
})



app.post('/login', async (req, res) => {

    const currentUser = await chat_users.findOne({
        where: {
            username: req.body.username
        }
    })

    if (currentUser) {
        if (currentUser.password == req.body.password) {
            res.send({ username: currentUser.username })
        }

        else {
            res.send({ error: "password is wrong" })
        }
    }

    else {
        const newUser = await chat_users.create({
            username: req.body.username,
            password: req.body.password
        })
            .then((u) => {
                res.send({ username: u.username })
            })
            .catch(() => {
                res.send({
                    error: "May be user aleredy exist , try different username"
                })
            })
    }


})

io.on("msg_send", (socket) => {

    io.to(socket.to).emit("msg_re", {
        msg: socket.msg
    })


})





db.sync().then(() => {

    server.listen(2020, () => {
        console.log("server started At http://localhost:2020")
    })

})