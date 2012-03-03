/** @namespace */
var GUI = GUI || {};
GUI.Manager = function(){
  this._stage = new GUI.DisplayObject();
  
  this.domElement = document.createElement('canvas');
  this.domElement.id = 'gui';
  this._ctx = this.domElement.getContext('2d');
  this._ctx.canvas.width = game.sizeW;
  this._ctx.canvas.height = game.sizeH;
  
  this._mouse = new Mouse();
};

/**
 * Adds a children to the Stage
 * @param {GUI.DisplayObject}, child
 * @return void
 */
GUI.Manager.prototype.addChild = function(child)
{
  this._stage.addChild(child);
};

/**
 * Resizes the canvas on resize
 * @param {ResizeEvent}, evt
 * @return void
 */
GUI.Manager.prototype.resizeHandler = function(evt) 
{
  //this._ctx.canvas.width = game.sizeW;
  //this._ctx.canvas.height = game.sizeH;
};

/**
 * Mouse Move Handler
 * @param {MouseEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectMouseMove = function(evt)
{
  game.mouse.getNormalizedPosition();
};


/**
 * Render the GUI
 * @return void
 */
GUI.Manager.prototype.render = function() 
{
  for(var i=0; i<GUI.Display.dirtyRectangles.length; i++) {
    
  }
  this._stage.render();
  GUI.Display.dirtyRectangles = [];
};



/**
 * Graphic Abstractions
 */
GUI.Manager.prototype.drawImage = function(image, x, y)
{
  this._ctx.drawImage(image, x, y);
};

GUI.Manager.prototype.drawRect = function(size, position, color)
{
  this._ctx.beginPath();
  
  this._ctx.moveTo(position.x, position.y);
  this._ctx.lineTo(position.x+size.width, position.y);
  this._ctx.lineTo(position.x+size.width, position.y+size.height);
  this._ctx.lineTo(position.x, position.y+size.height);
  this._ctx.lineTo(position.x, position.y);
  
  this._ctx.fillStyle = color;
  this._ctx.fill();
};