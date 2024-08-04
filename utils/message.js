let getMessages = (from, msg) =>{
    return{
        from,
        msg,
        createdAt: new Date().getTime()
    }
}

let getLocationMessages = (from, lat,lng) =>{
    return{
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {getMessages,getLocationMessages}