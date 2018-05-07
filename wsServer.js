var ws = require("nodejs-websocket")
var PORT = 3000

var clientCount = 0;
var mes = {};
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickName = 'user' + clientCount;
    mes.type = 'enter';
    mes.data = conn.nickName + '  comes in';
    broadcast(JSON.stringify(mes));
    conn.on("text", function (str) {
        console.log("Received "+str)
        mes.type = 'message';
        mes.data = conn.nickName +'  says：' + str;
        broadcast(JSON.stringify(mes));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        mes.type = 'leave';
        mes.data = conn.nickName + '  left';
        broadcast(JSON.stringify(mes));
    })
    conn.on('error',function(err){
        console.log('handle err')
        console.log(err)
    })
}).listen(PORT);

function broadcast(str){
    server.connections.forEach(function(con){
        con.sendText(str);
    })

}

console.log('webpocket server listening on port' + PORT );