var Mouse = function() 
{
  this._evt = null;
};

Mouse.prototype.getNormalizedPosition = function()
{
  if(this._evt == null) return false;
  var x = (100 / game.sizeW * this._evt.clientX) / 100;
  var y = (100 / game.sizeH * this._evt.clientY) / -100 + 1;
  return {x: x, y: y};
};

Mouse.prototype.injectEvent = function(evt) {
  this._evt = evt;
};