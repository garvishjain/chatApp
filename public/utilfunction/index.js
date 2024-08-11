let socket = io();

/** connection with server */
socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect',()=>{
    console.log('disconnected from server');  
} )

socket.on("newMessage",(msg)=>{
    console.log('New Message',msg);  
    $("#messages").append($('<li>').text(`${msg.from} : ${msg.msg} `));
})

socket.on('newLocationMessage',(msg)=>{
    console.log('newLocationMessage',msg);  
    // let a = $('<a>').attr({"target":"_blank","href":msg.url}).text('My Current Location.')
    // let li = $('<li>').append($('<a>').attr({"target":"_blank","href":msg.url}).text('My Current Location.'))
    $("#messages").append($('<li>').append($('<a>').attr({"target":"_blank","href":msg.url}).text('My Current Location.')));
})

$(()=>{
    $("#submit-btn").on("click", e =>{
        e.preventDefault();
        socket.emit('createMessage',{
            from: "User",
            msg: $('input[name="msg"]').val()
        },()=>{})
    })
})
$(()=>{
    $('#send-location').on('click',function(e){
        if(!navigator.geolocation){
            return alert('Geolocation is not supported by your browser.')
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            // console.log('positon',position);
            socket.emit('createLocationMessage',{
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },()=>{
            alert('Unable to fetch location')
        })
    })
})

// socket.on('newMessage',(msg)=>{
//     console.log('New Message',msg);  
//     let li = document.createElement('li')
//     li.innerText = `${msg.from} : ${msg.msg} `

//     document.getElementById('messages').appendChild(li)
// } )

// socket.on('newLocationMessage',(msg)=>{
//     console.log('newLocationMessage',msg);  
//     let li = document.createElement('li')
//     let a = document.createElement('a')
//     a.setAttribute('target', '_blank')
//     a.setAttribute('href', msg.url)
//     a.innerText = 'My Current Location.'
//     li.appendChild(a);

//     document.getElementById('messages').appendChild(li)
// } )
// socket.emit('createMessage',{
//     from: 'John',
//     msg: 'Hey!!'
// },(msg)=>{
//     console.log('Got It.',msg);  
// })

// document.querySelector('#submit-btn').addEventListener('click',function(e){
//     e.preventDefault();

//     socket.emit('createMessage',{
//         from: "User",
//         msg: document.querySelector('input[name="msg"]').value
//     },()=>{
//     })
// })

// document.querySelector('#send-location').addEventListener('click',function(e){
//     if(!navigator.geolocation){
//         return alert('Geolocation is not supported by your browser.')
//     }
//     navigator.geolocation.getCurrentPosition((position)=>{
//         // console.log('positon',position);
//         socket.emit('createLocationMessage',{
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         })
//     },()=>{
//         alert('Unable to fetch location')
//     })
// })