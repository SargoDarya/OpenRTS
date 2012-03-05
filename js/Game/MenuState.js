var MenuState = function()
{
  
};

MenuState.prototype = new GameState();
MenuState.prototype.constructor = MenuState;

MenuState.prototype.init = function()
{
  var wnd = new GUI.Window();
  wnd.size(400, 300);
  wnd.position(0.5, 0.5);
  wnd.anchorPoint(0.5, 0.5);
  wnd.background("#AAAAAA");
  
  var userLabel = new GUI.TextLabel();
  userLabel.text('Please state your name');
  userLabel.anchorPoint(0, 1);
  userLabel.position(0.5, 0.6);
  userLabel.anchorPoint(0.5, 0.5);
  userLabel.fontSize(24);
  
  var userName = new GUI.TextInput();
  userName.position(0.5, 0.5);
  userName.size(200, 20);
  userName.anchorPoint(0.5, 0.5);
  userName._enterCallback = this.setName;
  
  GUI.Display.Manager.addChild(wnd);
  wnd.addChild(userLabel);
  wnd.addChild(userName);
};

MenuState.prototype.setName = function(text)
{
  if(text.replace(' ', '').length>0) {
    game.network.send('UserJoin', {username: text});
    game.stateManager.replaceState(new PlayState());
  }
}

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

MenuState.prototype.cleanUp = function()
{
  GUI.Display.Manager.clean();
  delete this.wnd;
  delete this.userLabel;
  delete this.userName;
};