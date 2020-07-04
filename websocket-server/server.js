var io = require('socket.io')(3001)


io.on('connection', socket => {
    console.log(socket.id)
    socket.on('join-room',channelId=>{
        console.log(channelId)
        socket.join(channelId)
    })

    socket.on('message',(message)=>{
        console.log(message)
        socket.in(message.channelId).emit('message',message)
    })
})