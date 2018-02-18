let express = require('express');
let server = require('http').Server(express);
let io = require('socket.io')(server);

io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'] );

server.listen(4321, function(){
    console.log('----------------------------------');
    console.log("Server is running on 4321");
    console.log('----------------------------------');
});

io.on('connection', function(socket) {
  console.log("bağlandı");
  socket.on('getClient', function(user) {
    let client = {
      socket_id: socket.id
    }
    socket.user = {
            username: user.username,
            _id: user._id,
            name: user.name,
            password: user.password
        }
    socket.user.client = {
          socket_id: socket.id
    };
    socket.emit('setClient', client);
          console.log('CONNECT', socket.user.name, 'CONNECTED TO SERVER!');
  });
});

io.on('disconnect', function(socket) {
    if(socket.user)
        serverLog('DISCONNECT', socket.user.username, 'DISCONNECTED FROM SERVER')
});
