const http = require('http')
const express = require('express')
const path  = require('path')
require('./database/model')
require('dotenv').config();
const {Server} = require('socket.io')
const exphbs = require('express-handlebars');
const { getMessages,getLocationMessages } = require('./utils/message');
const chatboatRoutes = require('./routes/ChatboatRoutes')
const app = express()

/** Create The Socket Server */
const server = http.createServer(app)
const io = new Server(server)

/** MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public"))); //we have add multiple static folders

/** Set The Views */
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "default",
  })
);
app.set('view engine', 'hbs')
app.set('views', 'views')

/** Create the socket connection here */
io.on("connection",(socket)=>{
    console.log("A new user has connected", socket.id);

    socket.emit("newMessage",getMessages('Garvish',"Hello, How r u"))

    socket.broadcast.emit("newMessage",getMessages('Somu',"New User Has Joined"))

    socket.on('createMessage', (message,callback)=>{
        console.log("Create Message",message);
        io.emit('newMessage',getMessages(message.from,message.msg))
        callback('This is the server.');
    })

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage',getLocationMessages("Admin",coords.lat,coords.lng))
    })

    socket.on('disconnect', ()=>{
        console.log('User was disconnect.');
    })
})

//BASE ROUTE
app.use('/api', chatboatRoutes)

/** App Server */
server.listen(process.env.PORT,()=>{
    console.log("server is connected");
})