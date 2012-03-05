/** @namespace */
var GUI = GUI || {};
GUI.Manager = function(){
  
  // Create the DOM
  this.domElement = document.createElement('canvas');
  this.domElement.id = 'gui';
  this._ctx = this.domElement.getContext('2d');
  this._ctx.canvas.width = window.innerWidth;
  this._ctx.canvas.height = window.innerHeight;
  
  // Properties
  this._stage = new GUI.DisplayObject();
  this._focus = null;
  
  this._stage._ctx = this._ctx;
  this._stage.tag("Stage");
  this._stage.size(window.innerWidth, window.innerHeight);
  
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
 * @param {Number}, w
 * @param {Number}, h
 * @return void
 */
GUI.Manager.prototype.setSize = function(w, h) 
{
  this._ctx.canvas.width = w;
  this._ctx.canvas.height = h;
  
  this._stage.size(game.sizeW, game.sizeH);
  this._stage.redraw();
  
  GUI.Display.dirtyRectangles.push(new GUI.Rect({width: w, height: h}, {x: 0, y: 0}));
};

/**
 * Clears and removes all childs from the stage
 * @return void
 */
GUI.Manager.prototype.clean = function()
{
  this._stage.removeAllChilds();
  this._stage.invalidateRect();
};

/**
 * Mouse Move Handler
 * @param {MouseEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectMouseMove = function(evt)
{
  if(evt.which === 50) {
    evt.stopImmediatePropagation();
    evt.preventDefault();
  }
  
  this._mouse.injectMoveEvent(evt);
  
  // Update because of cursor
  var r = this._mouse._cursor.rect();
  var rp = GUI.Display.getTLPosition(this._mouse._cursor);
  r.position(rp.x, rp.y);
  this._stage.redrawRect(r);
};

/**
 * Mouse Click Handler
 * @param {MouseEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectMouseClick = function(evt)
{
  var pos = this._mouse.position();
  var p = new GUI.Point(pos.x, pos.y);
  this._focus = this._stage.getChildAtPoint(p);
};

/**
 * Keydown Handler
 * @param {KeyboardEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectKeyDown = function(evt)
{
  if(this._focus && this._focus.handleKeyDown) {
    this._focus.handleKeyDown(evt)
  }
};


/**
 * Render the GUI
 * @return void
 */
GUI.Manager.prototype.render = function() 
{
  if(!GUI.Display.dirtyRectangles.length) return;
  for(var i=0; i<GUI.Display.dirtyRectangles.length; i++) {
    var r = GUI.Display.dirtyRectangles[i];
    r._position = GUI.Display.getDenormalizedPosition(r._position.x, r._position.y);
    this._ctx.clearRect(r.position().x, r.position().y, r.size().width, r.size().height);
  }

  this._stage.render();
  GUI.Display.dirtyRectangles = [];
};


/**
 * Graphic Abstractions
 */
GUI.Manager.prototype.drawImage = function(obj)
{
  var position = GUI.Display.getTLPosition(obj);
  var image = obj.image;
  this._ctx.drawImage(image, position.x, position.y);
};

GUI.Manager.prototype.drawRect = function(obj)
{
  var position = GUI.Display.getTLPosition(obj);
  var size = obj._size;
  var color = obj._background;
  
  this._ctx.beginPath();
  
  this._ctx.moveTo(position.x, position.y);
  this._ctx.lineTo(position.x+size.width, position.y);
  this._ctx.lineTo(position.x+size.width, position.y+size.height);
  this._ctx.lineTo(position.x, position.y+size.height);
  this._ctx.lineTo(position.x, position.y);
  
  this._ctx.fillStyle = color;
  this._ctx.fill();
};

GUI.Manager.prototype.drawText = function(obj)
{
  var position = GUI.Display.getTLPosition(obj);
  var text = obj._text;
  var color = obj._color;
  
  this._ctx.fillStyle = color;
  this._ctx.fillText(text, position.x, position.y);
};