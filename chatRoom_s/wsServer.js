var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;
var clientCount = 0;


app.listen(PORT);
io.on('connection',function(socket){
    clientCount++;
    socket.nickName = 'user' + clientCount;
    io.emit('enter',socket.nickName + '  comes in');   //io 广播  socket  客户端发消息

    socket.on('message',function(str){
        io.emit('message',socket.nickName +'（'+new Date().getHours() + ':' + new Date().getMinutes() +':'+new Date().getSeconds() +'）：' + str);
    })

    socket.on('disconnect',function () {
        io.emit('leave',socket.nickName + 'left');
    })
})

console.log('webpocket server listening on port' + PORT );