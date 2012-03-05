/** @namespace */
var GUI = GUI || {};
GUI.Point = function(x, y) 
{
  this._position = {x: x, y: y};
};

GUI.Point.prototype.position = function(x, y)
{
  if(typeof x == 'number') this._position = {x: x, y: y};
  return this._position;
};

GUI.Point.prototype.toString = function()
{
  return '[x:'+this._position.x+',y:'+this._position.y+']';
};