let socket = io();
const SendBtn = document.getElementById('sendBtn')
const messageInput = document.getElementById('message')
const allMessages = document.getElementById('messages')

socket.on('message',(message)=>{
    const p = document.createElement('p')
    p.innerText = message;
    allMessages.appendChild(p);
})

SendBtn.addEventListener("click",(e)=>{
    const message = messageInput.value;
    console.log(message)
    socket.emit('user-message',message)
})

// connection with server
socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('newMessage',(msg)=>{
    console.log('New Message',msg);
    
} )