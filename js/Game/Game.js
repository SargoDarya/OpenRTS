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
  
  this.init();
  
  return this;
};

Game.prototype.init = function() 
{
  this.gameContainer = document.getElementById('gameContainer');
  
  this.sizeW = window.innerWidth;
  this.sizeH = window.innerHeight;
  
  // Set up game wide objects
  this.stateManager = new StateManager();
  this.keyboard = new THREEx.KeyboardState();
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.gameContainer.appendChild(this.renderer.domElement);
  
  return this;
};

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
    requestAnimationFrame(animationLoop);
  }

  animationLoop();
};