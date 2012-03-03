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
  
  this.gui = new GUI.Manager();
  
  this.mouse = new Mouse;
  
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
    self.mouseHandler(evt);
  };
  
  function resizeListener(evt) {
    self.resizeHandler(evt);
  };
  window.addEventListener('resize', resizeListener, false);
  
  this.prepareFullScreen();
  
  return this;
};

Game.prototype.prepareFullScreen = function()
{
  var self = this;
  document.onkeydown = function(evt) {
    if(evt.ctrlKey && evt.keyCode == 70) {
      self.toggleFullScreen();
    }
  };
};

Game.prototype.toggleFullScreen = function(evt)
{
  if(THREEx.FullScreen.activated()) {
    THREEx.FullScreen.cancel();
  } else {
    THREEx.FullScreen.request(game.gameContainer);
  }
};

Game.prototype.mouseHandler = function(evt)
{
  game.mouse.injectEvent(evt);
  this.gui.injectMouseMove(evt);
  this.stateManager.getActiveState().mouseHandler(evt);
};

Game.prototype.resizeHandler = function(evt)
{
  this.sizeW = window.innerWidth;
  this.sizeH = window.innerHeight;
  this.renderer.setSize(this.sizeW, this.sizeH);
  
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