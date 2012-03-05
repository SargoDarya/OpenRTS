var Game = function() 
{
  
  this.keyboard = null;
  this.scene = null;
  this.camera = null;
  
  this.renderer = null;
  this.stateManager = null;
  this.gameContainer = null;
  
  this.sizeW = 0;
  this.sizeH = 0;
  
  this.network = null;
  this.gui = null;
  this.mouse = null;
  
  return this;
};

Game.prototype.init = function() 
{
  var self = this;
  
  this.gameContainer = document.getElementById('gameContainer');
  
  this.sizeW = window.innerWidth;
  this.sizeH = window.innerHeight;

  this.gui = GUI.Display.Manager;
  
  this.mouse = this.gui._mouse;
  
  // Set up Networking
  this.network = new Network();
  
  // Set up game wide objects
  this.stateManager = new StateManager();
  this.keyboard = new THREEx.KeyboardState();
  this.renderer = new THREE.WebGLRenderer({antialias: true});
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.gameContainer.appendChild(this.renderer.domElement);
  this.gameContainer.appendChild(this.gui.domElement);
  
  // Bind Events
  document.onmousemove = function(evt) {
    self.mouseMoveHandler(evt);
  };
  
  document.onclick = function(evt) {
    self.mouseClickHandler(evt);
  };
  
  function resizeListener(evt) {
    self.resizeHandler(evt);
  };
  window.addEventListener('resize', resizeListener, false);
  
  this.prepareFullScreen();
  
  // Connect to server
  this.network.connect(Config.Server);
  
  return this;
};

Game.prototype.prepareFullScreen = function()
{
  var self = this;
  document.onkeydown = function(evt) {
    evt.stopImmediatePropagation();
    if(evt.ctrlKey && evt.keyCode == 70) {
      self.toggleFullScreen(evt);
      self.requestPointerLock(evt);
      return null;
    }
    self.keyDownHandler(evt);
    return false;
  };
  
  document.addEventListener("fullscreenchange", function(evt) {
    if(!document.fullscreenEnabled) {
      self.mouse.setAbsolute();
      self.mouse._cursor.removeFromParent();
    }
  });
};

Game.prototype.toggleFullScreen = function(evt)
{
  //if(THREEx.FullScreen.activated()) {
    /*THREEx.FullScreen.cancel();
    this.mouse.setAbsolute();
    this.mouse._cursor.removeFromParent();*/
  //} else {
    game.gameContainer.requestFullScreen();
  //}
};

Game.prototype.preparePointerLock = function() {
  var self = this;
  
  document.addEventListener('webkitpointerlocklost', function(e) {  
    self.mouse._cursor.removeFromParent();
    self.mouse.setAbsolute();
  }, false);
}

Game.prototype.requestPointerLock = function(evt)
{
  this.gameContainer.requestPointerLock();
  this.gui.addChild(this.mouse._cursor);
  this.mouse._cursor.position(0.5, 0.5);
  this.mouse._cursor.tag('cursor');
  this.mouse.setRelative();
};

/** Event Handler **/

Game.prototype.mouseMoveHandler = function(evt)
{
  this.gui.injectMouseMove(evt);
  this.stateManager.getActiveState().mouseMoveHandler(evt);
};

Game.prototype.mouseClickHandler = function(evt)
{
  this.gui.injectMouseClick(evt);
  this.stateManager.getActiveState().mouseClickHandler(evt);
};

Game.prototype.keyDownHandler = function(evt)
{
  this.gui.injectKeyDown(evt);
};

Game.prototype.resizeHandler = function(evt)
{
  this.sizeW = window.innerWidth;
  this.sizeH = window.innerHeight;
  this.renderer.setSize(this.sizeW, this.sizeH);
  
  this.gui.setSize(this.sizeW, this.sizeH);
  
  this.stateManager.getActiveState().resizeHandler(evt);
}

Game.prototype.run = function(state)
{
  if(!this.stateManager.pushState(state)) {
    console.log("Couldn't initialize game");
    return false;
  }
  this.animate();
};

Game.prototype.animate = function() 
{
  var self = this;
  
  function animationLoop() {
    var state = self.stateManager.getActiveState();
    state.update();
    state.render();
    self.gui.render();
    requestAnimationFrame(animationLoop);
  }

  animationLoop();
};