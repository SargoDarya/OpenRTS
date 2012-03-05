var port = process.env.PORT || 3000;

var connections = [];

var io = require("socket.io").listen(port);
//io.disable('heartbeats');
io.set('transports', ['websocket', 'flashsocket']);
io.set('log level', 1);

var Session = require('connect').middleware.session.Session;
var MemoryStore = require('connect/middleware/session/memory');
var sessionStore = new MemoryStore();

io.sockets.on('connection', function(conn) {
  var cookie_string = socket_client.request.headers.cookie;
  var parsed_cookies = connect.utils.parseCookie(cookie_string);
  var connect_sid = parsed_cookies['connect.sid'];
  
  if (connect_sid) {
    sessionStore.get(connect_sid, function (error, session) {
      console.log(session);
    });
  }

  conn.on('UserJoin', function(data) {
    conn.username = data.username;
    connections.forEach(function(singleConnection){
      singleConnection.emit('message', {
        type: 'UserJoinMessage',
        msg: conn.username+' joined the game. ('+connections.length+' people)'
      });
    });
  });
  
  conn.on('UserMessage', function(data) {
    connections.forEach(function(singleConnection){
      singleConnection.emit('message', {
        type: 'UserMessage',
        msg: conn.username+': '+data.msg
      });
    });
  })
});