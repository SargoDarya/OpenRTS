var Game = function() {
  THREEx.FullScreen.request();
  
  this.keyboard = null;
  this.renderer = null;
  this.scene = null;
  this.camera = null;
  this.stateManager = null;
  
  this.init();
};

Game.prototype.init = function() {
  this.keyboard = new THREEx.KeyboardState();
  
  this.scene = new THREE.Scene();
};

Game.prototype.render = function() {
  
};

Game.prototype.animate = function() {
  
};