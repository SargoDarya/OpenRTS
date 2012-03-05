/** @namespace */
var GUI = GUI || {};
GUI.DisplayObject = function(){
  /** Properties */
  this._dirty    = false;
  this._hasDirty = false;
  this._parent   = null;
  this._children = [];

  /** Positioning */
  this._position    = {};
  this._position.x  = 0;
  this._position.y  = 0;
  
  /** Z-Ordering */
  this._z           = 1;
  
  /** Anchor Point */
  this._anchorPoint    = {};
  this._anchorPoint.x  = 0;
  this._anchorPoint.y  = 0;
  
  /** Visibility */
  this._visible = true;
  
  /** Width/Height */
  this._size        = {};
  this._size.width  = 0;
  this._size.height = 0;
  
  /** Instancing */
  this._tag = "";
  this._ctx = null;
};

/**
 * Set the position of a DisplayObject
 * @param {Number}, x
 * @param {Number}, y
 * @return void
 */
GUI.DisplayObject.prototype.position = function(x, y) 
{
  this.invalidateRect();
  this._position.x = x;
  this._position.y = y;
  this.invalidateRect()
};

/**
 * Convenience Method to get a rect
 * @return GUI.Rect
 */
GUI.DisplayObject.prototype.rect = function()
{
  return new GUI.Rect(
    {
      width: this._size.width,
      height: this._size.height
    }, 
    {
      x: this._position.x,
      y: this._position.y
    });
};

/**
 * Sets the z layer the object is rendered at
 * @param {Number}, z
 * @return Number
 */
GUI.DisplayObject.prototype.z = function(z) {
  if(typeof z === 'Number') this._z = z;
  return this._z;
};


GUI.DisplayObject.prototype.anchorPoint = function(x, y)
{
  this._anchorPoint = {x: x, y: y};
  return this._anchorPoint;
}

/**
 * Set the visibility of an object
 * @param {Boolean}, visibility (optional)
 * @return Boolean
 */
GUI.DisplayObject.prototype.isVisible = function(visibility) 
{
  if(typeof visibility === "boolean") this._visible = visibility; 
  return this._visible;
};

/**
 * Set and get size
 * @param {Number}, width
 * @param {Number}, height
 */
GUI.DisplayObject.prototype.size = function(width, height) 
{
  if(width) this._size.width = width;
  if(height) this._size.height = height;
  return {
    width: this._size.width,
    height: this._size.height
  };
};

/** 
 * Set a DisplayObject Tag 
 * @param {String}, obj
 */
GUI.DisplayObject.prototype.tag = function(tag) 
{
  if(typeof tag === 'string') this._tag = tag;
  return this._tag;
}


/** Display List Handling **/

/**
 * Sets a child to dirty for rerendering
 * @param {Boolean}, child
 * @return Boolean
 */
GUI.DisplayObject.prototype.isDirty = function()
{
  this._dirty = true;
  if(this._parent != null) this._parent.setDirtyChilds();
};

/**
 * Sets a child to dirty for rerendering
 * @param {Boolean}, child
 * @return Boolean
 */
GUI.DisplayObject.prototype.setDirtyChilds = function()
{
  this._dirty = true;
  if(this._parent != null) this._parent.setDirtyChilds();
};

GUI.DisplayObject.prototype.redraw = function()
{
  this._dirty = true;
  for(var i=0; i<this._children.length; i++) {
    this._children[i].redraw();
  }
};

GUI.DisplayObject.prototype.redrawRect = function(rect)
{
  this._dirty = true;
  if(this._parent) this.invalidateRect();
  for(var i=0; i<this._children.length; i++) {
    //var pos = rect.position(); 
    //pos = GUI.Display.getDenormalizedPosition(pos.x, pos.y);
    //rect.position(Math.round(pos.x), Math.round(pos.y));
    
    var cr = this._children[i].rect();
    var cp = GUI.Display.getTLPosition(this._children[i]);
    cr.position(Math.round(cp.x), Math.round(cp.y));

    //console.log(rect.toString() + ' && ' + cr.toString());

    if(rect.containsRect(cr)) {
      this._children[i].redrawRect(rect);
    }
  }
};

GUI.DisplayObject.prototype.getChildAtPoint = function(point)
{
  var child = this;
  for(var i=0; i<this._children.length; i++) {
    var r = this._children[i].rect();
    var pos = GUI.Display.getTLPosition(this._children[i]);
    r.position(pos.x, pos.y);
    if(r.containsPoint(point)) {
      child = this._children[i].getChildAtPoint(point);
      break;
    }
  }
  return child;
};

/**
 * Adds a Child to the Display List
 * @param {DisplayObject}, child
 * @return Boolean
 */
GUI.DisplayObject.prototype.addChild = function(child) 
{  
  assert(child._parent === null, "DisplayObject already has a parent");
  assert(child._parent != this, "DisplayObject was already added to parent");
  
  child._parent = this;
  child._ctx = this._ctx;
  this._children.push(child);
  
  return true;
};

/**
 * Removes a child from the parent
 * @param {DisplayObject}, child
 * @return void
 */
GUI.DisplayObject.prototype.removeChild = function(child) 
{
  child._parent = null;
  this._children.remove(child);
};

/**
 * Removes all children
 * @return void
 */
GUI.DisplayObject.prototype.removeAllChilds = function() 
{
  for(var i=0; i<this._children.length; i++) {
    this._children[i].removeAllChilds();
    this._children[i].removeFromParent();
  }
};

/**
 * Removes itself from the parent
 * @return void
 */
GUI.DisplayObject.prototype.removeFromParent = function() 
{
  assert(this._parent != null, "DisplayObject has no parent");
  this._parent.removeChild(this);
};

/**
 * Base Render Method
 * @return void
 */
GUI.DisplayObject.prototype.render = function()
{
  for(var i=0; i<this._children.length; i++) {
    if( this._children[i].isVisible()) {
      this._children[i].render();
    }
  }
  this._hasDirty = false;
  this._dirty = false;
};

/**
 * Invalidates the current Rect
 * @return void
 */
GUI.DisplayObject.prototype.invalidateRect = function()
{ 
  if(this.parent === null) {
    return null;
  }

  var pos = GUI.Display.getTLPosition(this);
  var pos2 = GUI.Display.getNormalizedPosition(pos.x, pos.y);
  
  var r = new GUI.Rect(
    {
      width: this._size.width, 
      height: this._size.height
    },
    {
      x: pos2.x, 
      y: pos2.y
    }
  );

  GUI.Display.dirtyRectangles.push(r);
  return r;
};