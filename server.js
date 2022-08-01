const express = require('express');
const router = require("./routes/messages.routes");
const cors = require('cors')
const {Server} = require("socket.io");

const app = express()
const http = require('http');
const MessagesController = require("./controller/messages.controller");
const messagesController = new MessagesController
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello!')
})

io.on('connection', (socket)=>{
    socket.on("NEW-MESSAGE:CLIENT", (data) => {
        socket.broadcast.emit("NEW-MESSAGE:SERVER", data)

        messagesController.createMessage({body: data}).then((res) => {
            console.log(res)
        })
    });
});


server.listen(PORT, () => {
    console.log("Server started")
})

