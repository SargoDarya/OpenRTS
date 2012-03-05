/** @namespace */
var GUI = GUI || {};
GUI.Window = function(){
  GUI.DisplayObject.call(this);
  this._dirty = false;
};

GUI.Window.prototype = new GUI.DisplayObject;
GUI.Window.prototype.constructor = GUI.Window;

GUI.Window.prototype._background = "#000000";

GUI.Window.prototype.background = function(color) {
  if(typeof color == 'string') this._background = color;
  return this._background
}

GUI.Window.prototype.render = function()
{
  var pos = GUI.Display.getTLPosition(this);
  
  game.gui.drawRect(this);
  
  GUI.DisplayObject.prototype.render.call(this);
}