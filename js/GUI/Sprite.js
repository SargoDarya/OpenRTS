var Sprite = function(imagePath) {
  var self = this;
  
  this.parent = null;
  this.position = {x: 0, y: 0};
  this.previousPosition = {x: 0, y: 0};
  this._loaded = false;
  
  this.image = new Image();
  this.image.onload = function(evt) {
    self.loadHandler(evt);
  }
  this.image.src = imagePath;
};

Sprite.prototype.loadHandler = function(evt) {
  this._loaded = true;
  this._width = this.image.width;
  this._height = this.image.height;
  
  if(this.parent) this.parent._dirty = true;
};

Sprite.prototype.setPosition = function(x, y) {
  this.previousPosition = this.position;
  this.position = {x: x, y: y};
};

Sprite.prototype.isLoaded = function() {
  return this._loaded;
}