const http = require('http')
const express = require('express')
const path  = require('path')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("A new user has connected", socket.id);

    socket.emit("newMessage",{
        from:'garvish',
        msg: "hello how r u"
    })
    socket.on('user-message',(message)=>{
        io.emit('message',message)
        console.log("A new User Message", message);
    })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
// app.use(express.static(path.join("./public")));

app.get('/',(req, res)=>{
    return res.sendFile('/public/index.html')
})

server.listen(3000,()=>{
    console.log("server is connected");
})