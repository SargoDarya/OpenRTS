/** @namespace **/
var GUI = GUI || {};
GUI.Sprite = function() {
  GUI.DisplayObject.call(this);
};

GUI.Sprite.prototype = new GUI.DisplayObject;
GUI.Sprite.prototype.constructor = GUI.Sprite;

/**
 * Load a sprite from a remote path
 * @param {String}, path
 * @return void
 */
GUI.Sprite.prototype.fromPath = function(path)
{
  var self = this;
  
  this.isVisible(false);
  
  this.image = new Image();
  this.image.onload = function(evt) {
    self.remoteLoadHandler(evt);
  }
  this.image.src = path;
};

GUI.Sprite.prototype.remoteLoadHandler = function(evt) 
{
  this.isVisible(true);
  this.isDirty(true);
  this.size(this.image.width, this.image.height);
};

GUI.Sprite.prototype.render = function() 
{
  //var pos = GUI.Display.getTLPosition(this);
  
  game.gui.drawImage(this);

  this._dirty = false;
  
  GUI.DisplayObject.prototype.render.call(this);
};