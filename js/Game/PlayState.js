var PlayState = function()
{
  this.scene = null;
  this.camera = null;
};

PlayState.prototype = new GameState();
PlayState.prototype.constructor = PlayState;

PlayState.prototype.init = function()
{ 
  this.camera = new THREE.PerspectiveCamera(45, 1.33, 0.1, 10000);
  this.camera.position.z = 300;
  
  this.scene = new THREE.Scene();
  this.scene.add(this.camera);
  
  // Create Basic Plane
  this.groundGeometry = new THREE.SphereGeometry(50, 16, 16);
  this.groundMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
  this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial);
  this.scene.add(this.groundMesh);
  
  // Add a light
  var pointLight = new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  this.scene.add(pointLight);
};

PlayState.prototype.update = function()
{

};

PlayState.prototype.render = function()
{
  game.renderer.render(this.scene, this.camera);
};