const http = require('http')
const express = require('express')
const path  = require('path')
const {Server} = require('socket.io')
const exphbs = require('express-handlebars');
const { getMessages,getLocationMessages } = require('./utils/message');
const routes = require('./routes/routes')

const app = express()

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public"))); //we have add multiple static folders

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "default",
  })
);

app.set('view engine', 'hbs')
app.set('views', 'views')

const server = http.createServer(app)

const io = new Server(server)

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

    // socket.on('user-message',(message)=>{
    //     io.emit('message',message)
    //     console.log("A new User Message", message);
    // })
})

//BASE ROUTE
app.use('/api',routes)


server.listen(3000,()=>{
    console.log("server is connected");
})