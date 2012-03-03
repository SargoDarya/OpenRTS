/** @namespace */
var GUI = GUI || {};
GUI.Window = function(){
  this._dirty = false;
};

GUI.Window.prototype = new GUI.DisplayObject;
GUI.Window.prototype.constructor = GUI.Window;

GUI.Window.prototype._background = "#000000";

GUI.Window.prototype.render = function()
{
  var pos = GUI.Display.getTLPosition(this._position, this._size, this._anchorPoint);
  
  game.gui.drawRect(this._size, pos, this._background);
  
  GUI.DisplayObject.prototype.render.call(this);
}