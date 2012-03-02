var GUI = function()
{
  this._cvs = null;
  this._ctx = null;
  
  this._objects = [];
  this._dirty = true;
  
  this.init();
};

GUI.prototype.init = function()
{
  this._cvs = document.createElement('canvas');
  this._cvs.id = 'gui';
  this._ctx = this._cvs.getContext('2d');
  
  this._ctx.canvas.width = window.innerWidth;
  this._ctx.canvas.height = window.innerHeight;
  
  game.gameContainer.appendChild(this._cvs);
};

GUI.prototype.add = function(obj)
{
  obj.parent = this;
  this._objects.push(obj);
  this._dirty = true;
};

GUI.prototype.resizeHandler = function(evt)
{
  this._ctx.canvas.width = game.sizeW;
  this._ctx.canvas.height = game.sizeH;
};

GUI.prototype.update = function()
{
  if(!this._dirty) return false;
  
  for(var k in this._objects) {
    var obj = this._objects[k];
    if(obj.isLoaded) {
      this._ctx.clearRect(obj.previousPosition.x, obj.previousPosition.y, obj._width, obj._height);
      this._ctx.drawImage(obj.image, obj.position.x, obj.position.y);
    }
  }
  
  this._dirty = false;
};