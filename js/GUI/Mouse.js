var Mouse = function() 
{
  this._evt = null;
  
  this._cursor = null;
  this._movement = 'absolute';
  
  this._position = {};
  this._position.x = 0;
  this._position.y = 0;
  
  this.createDisplayObject();
};

Mouse.prototype.createDisplayObject = function()
{
  this._cursor = new GUI.Sprite();
  this._cursor.fromPath('ui/cursor.png');
  this._cursor.anchorPoint(0, 1);
  this._cursor.tag('mouse');
};

Mouse.prototype.getNormalizedPosition = function()
{
  if(this._evt == null) return false;
  var size = GUI.Display.Manager._stage.size();
  var x = (100 / size.width * this._position.x) / 100;
  var y = (100 / size.height * this._position.y) / -100 + 1;
  return {x: x, y: y};
};

Mouse.prototype.position = function(x, y)
{
  if(typeof x === 'number') this._position = {x: x, y: y};
  
  return this._position;
};

Mouse.prototype.injectMoveEvent = function(evt) {
  this._evt = evt;
  this._updatePosition();
  
  var pos = this.getNormalizedPosition();
  //this._cursor.position(pos.x, pos.y);
};

Mouse.prototype._updatePosition = function() {
  if(this._movement === "absolute") {
    this._position = {
      x: this._evt.clientX, 
      y: this._evt.clientY
    }
  } else {
    var movement = this.getMovement();
    var size = GUI.Display.Manager._stage.size();
    
    this._position.x += movement.x;
    this._position.y += movement.y;
    
    if(this._position.x < 0) this._position.x = 0;
    if(this._position.y < 0) this._position.y = 0;
    if(this._position.x > size.width) this._position.x = size.width;
    if(this._position.y > size.height) this._position.y = size.height;
  }
};

Mouse.prototype.setRelative = function() {
  this._movement = "relative";
};

Mouse.prototype.setAbsolute = function() {
  this._movement = "absolute";
};

Mouse.prototype.getMovement = function() {
  if(this._evt.movementX) {
    return {x: this._evt.movementX, y: this._evt.movementY}
  } else if (this._evt.webkitMovementX) {
    return {x: this._evt.webkitMovementX, y: this._evt.webkitMovementY}
  } else if (this._evt.mozMovementX) {
    return {x: this._evt.mozMovementX, y: this._evt.mozMovementY}
  }
  return {x: 0, y: 0};
}