/** @namespace */
var GUI = GUI || {};
GUI.DisplayObject = function(){};

/** Properties */
GUI.DisplayObject.prototype._dirty    = false;
GUI.DisplayObject.prototype._hasDirty = false;
GUI.DisplayObject.prototype._parent   = null;
GUI.DisplayObject.prototype._children = [];

/** Positioning */
GUI.DisplayObject.prototype._oldPosition = {};
GUI.DisplayObject.prototype._position    = {};
GUI.DisplayObject.prototype._position.x  = 0;
GUI.DisplayObject.prototype._position.y  = 0;

/**
 * Set the position of a DisplayObject
 * @param {Number}, x
 * @param {Number}, y
 * @return void
 */
GUI.DisplayObject.prototype.position = function(x, y) 
{
  this._position.x = x;
  this._position.y = y;
};


/** Z-Ordering */
GUI.DisplayObject.prototype._z           = 1;

/**
 * Sets the z layer the object is rendered at
 * @param {Number}, z
 * @return Number
 */
GUI.DisplayObject.prototype.z = function(z) {
  if(typeof z === 'Number') this._z = z;
  return this._z;
};


/** Anchor Point */
GUI.DisplayObject.prototype._anchorPoint    = {};
GUI.DisplayObject.prototype._anchorPoint.x  = 0;
GUI.DisplayObject.prototype._anchorPoint.y  = 0;

GUI.DisplayObject.prototype.anchorPoint = function(x, y)
{
  this._anchorPoint = {x: x, y: y};
  
  return this._anchorPoint;
}


GUI.DisplayObject.prototype._visible = true;

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


/** Width/Height */
GUI.DisplayObject.prototype._size        = {};
GUI.DisplayObject.prototype._size.width  = 0;
GUI.DisplayObject.prototype._size.height = 0;

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

GUI.DisplayObject.prototype._tag = "";

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
  this._hasDirty = true;
  if(this._parent != null) this._parent.setDirtyChilds();
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
  
  child.isDirty(true);
  this._children.push(child);
  this._hasDirty = true;
  
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
    this._children[i].removeFromParent();
  }
};

/**
 * Removes itself from the parent
 * @return void
 */
GUI.DisplayObject.prototype.removeFromParent = function() 
{
  assert(this._parent == null, "DisplayObject has no parent");
  this._parent.removeChild(this);
};

/**
 * Base Render Method
 * @return void
 */
GUI.DisplayObject.prototype.render = function()
{
  for(var i=0; i<this._children.length; i++) {
    if( this._children[i].isVisible() && 
         (this._children[i]._dirty || 
          this._children[i]._hasDirty)) {
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
  GUI.Display.dirtyRectangles.push(this._size, this._position);
};