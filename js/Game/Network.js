var Network = function()
{
  this._socket = null;
};

Network.prototype.connect = function(domain)
{
  var socketConfig = {
    'transports': ['websocket', 'flashsocket']
  };
  
  this._socket = io.connect(domain, socketConfig);
  this._socket.on("connect", this.openHandler);
  this._socket.on("disconnect", this.closeHandler);
  this._socket.on("message", this.messageHandler);
};

Network.prototype.openHandler = function(evt)
{
  console.log('opened');
};

Network.prototype.closeHandler = function(evt)
{
  
};

Network.prototype.messageHandler = function(evt)
{
  console.log(evt);
};

Network.prototype.send = function(type, obj) 
{
  this._socket.send(type, obj);
};