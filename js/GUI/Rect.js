/** @namespace */
var GUI = GUI || {};
GUI.Rect = function(size, pos){
  this._size = size;
  this._position = pos;
};

GUI.Rect.prototype.size = function(width, height)
{
  if(typeof width == 'number') this._size = {width: width, height: height};
  return this._size;
};

GUI.Rect.prototype.position = function(x, y)
{
  if(typeof x == 'number') this._position = {x: x, y: y};
  return this._position;
};

GUI.Rect.prototype.containsRect = function(rect)
{
  var r1x = rect._position.x,
      r2x = rect._position.x+rect._size.width,
      r1y = rect._position.y,
      r2y = rect._position.y+rect._size.height
      
  var points = [
    new GUI.Point(r1x, r1y),
    new GUI.Point(r1x, r2y),
    new GUI.Point(r2x, r1y),
    new GUI.Point(r2x, r2y)
  ];
  
  for(var i=0; i<points.length; i++) {
    var p = points[i];
    if(this.containsPoint(p)) {
      return true;
    }
  }
  return false;
};

GUI.Rect.prototype.containsPoint = function(p)
{
  var a1x = this._position.x,
      a2x = this._position.x+this._size.width,
      a1y = this._position.y,
      a2y = this._position.y+this._size.height;
  
  var pos = p.position();
  
  if((a1x<=pos.x && pos.x<=a2x) && // Horizontal check
     (a1y<=pos.y && pos.y<=a2y))   // Vertical check
      return true;
  return false;
};

GUI.Rect.prototype.toString = function()
{
  return this._size.width+'/'+this._size.height+'/'+this._position.x+'/'+this._position.y;
};