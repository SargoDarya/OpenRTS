var GUI = GUI || {};
GUI.Display = {};

GUI.Display.dirtyRectangles = [];

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

GUI.Display.getTLPosition = function(position, size, anchorPoint)
{
  position = GUI.Display.getDenormalizedPosition(position.x, position.y);
  
  var x = position.x-(size.width*anchorPoint.x);
  var y = position.y-(size.height*-(anchorPoint.y-1));
  
  return {x: x, y: y};
};