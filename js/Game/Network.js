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
  //console.log('Connected to Server');
};

Network.prototype.closeHandler = function(evt)
{
  
};

Network.prototype.messageHandler = function(evt)
{
  game.stateManager.getActiveState().networkHandler(evt);
};

Network.prototype.send = function(type, obj) 
{
  this._socket.emit(type, obj);
};