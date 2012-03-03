var port = process.env.PORT || 3000;

var connections = [];

var io = require("socket.io").listen(port);

io.sockets.on('connection', function(conn) {
  conn.emit('AuthRequest');
  
  conn.on('AuthResponse', function(data){
    console.log(data);
  });
});