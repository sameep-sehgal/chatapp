var io = require('socket.io')(3001)

io.on('connection', socket => {
    socket.emit('chat-message','Hello')
    socket.on('send-message',message => {
        socket.broadcast.emit('chat-message',message)
    })
})