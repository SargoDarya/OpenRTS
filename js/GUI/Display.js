var GUI = GUI || {};
GUI.Display = {};

GUI.Display.dirtyRectangles = [];

// Instanciate GUI Manager
GUI.Display.Manager = new GUI.Manager();

GUI.Display.getNormalizedPosition = function(x, y) 
{
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  return {x: 100/w*x/100, y: 100/h*y/-100+1};
};

GUI.Display.getDenormalizedPosition = function(x, y) 
{
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  return {x: w*x, y: h*y*-1+h};
};

/**
 * Returns the top left 
 */
GUI.Display.getTLPosition = function(obj)
{
  var parentOffset = {x: 0, y: 0};
  
  if(obj._parent) {
    var parentOffset = GUI.Display.getTLPosition(obj._parent);
  }

  var position = GUI.Display.getDenormalizedPosition(obj._position.x, obj._position.y);

  var x = position.x-(obj._size.width*obj._anchorPoint.x);
  var y = position.y-(obj._size.height*-(obj._anchorPoint.y-1));

  return {x: x, y: y};
};

GUI.Display.getObjectAtPoint = function(point)
{
  console.log()
};