var DebugConsole = function() {
  this._msgArray = ['','','','','','','','',''];
  this._historyLength = 9;
  this.init();
};

DebugConsole.prototype.init = function() {
  var self = this;
  
  var exLog = console.log;
  console.log = function(msg) {
    exLog.apply(this, arguments);
    self.msg(msg);
  }
  
  var posX = 0.03;
  var posY = 0.07;
  
  this.textArea = new GUI.TextArea();
  this.textArea.size(400, 150);
  this.textArea.position(posX, posY);
  this.textArea.anchorPoint(0, 0);
  this.textArea.color('#ffffff');
  this.textArea.tag("console");
  
  this.textInput = new GUI.TextInput();
  this.textInput.size(400, 20);
  this.textInput.anchorPoint(0, 1);
  this.textInput.position(posX, posY);
};

DebugConsole.prototype.msg = function(msg) {
  if(this._msgArray.length == this._historyLength) this._msgArray.shift();
  
  var d = new Date();
  var msg = '['+pad(d.getHours(), 2)+':'+pad(d.getMinutes(),2)+':'+pad(d.getSeconds(), 2)+']: '+ msg;
  this._msgArray.push(msg);
  
  this.textArea.text(this._msgArray.join("\n"));
};