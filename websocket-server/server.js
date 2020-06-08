var io = require('socket.io')(3001)


// io.on('connection', socket => {
//     socket.on('create-namespace', channelId =>{
//         console.log(channelId)
//         room=channelId
//         socket.join(room)
//         socket.on('send-message',message=>{
//             console.log(message)
//             io.sockets.in(room).emit('chat-message',message)
//         })
//     })
//     // socket.on('send-message',message => {
//     //     socket.broadcast.emit('chat-message',message)
//     // })
//     // namespace.on('send-message',message => {
//     //     console.log(message)
//     //     namespace.broadcast.emit('chat-message',message)
//     // })
// })
// io.on('connection', socket => {
//     socket.on('create-namespace', channelId =>{
//         console.log(channelId)
//         var namespace = io.of(`/${channelId}`)
//         namespace.on('connection',nsp=>{
//             console.log('connected')
//             nsp.on('send-message',message => {
//                 console.log(message)
//                 nsp.broadcast.emit('chat-message',message)
//             })
//         })
//     })
//     // socket.on('send-message',message => {
//     //     socket.broadcast.emit('chat-message',message)
//     // })
//     // namespace.on('send-message',message => {
//     //     console.log(message)
//     //     namespace.broadcast.emit('chat-message',message)
//     // })
// })




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