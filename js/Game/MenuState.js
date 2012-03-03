var MenuState = function()
{
  
};

MenuState.prototype = new GameState();
MenuState.prototype.constructor = MenuState;

MenuState.prototype.init = function()
{
  var wnd = new GUI.Window();
  wnd.size(300, 300);
  wnd.position(0.5, 0.5);
  wnd.anchorPoint(0.5, 0.5);
  
  game.gui.addChild(wnd);
};

MenuState.prototype.update = function()
{
  
};

MenuState.prototype.render = function()
{
  
};

MenuState.prototype.keyHandler = function(evt)
{
  
};

MenuState.prototype.mouseHandler = function(evt)
{
  
};

MenuState.prototype.clickHandler = function(evt)
{
  
};

MenuState.prototype.resizeHandler = function(evt)
{
  
};