var PlayState = function()
{
  this.scene = null;
  this.camera = null;
  
  this.mousePos = {x: 0, y: 0};
  this.cursor = null;
};

PlayState.prototype = new GameState();
PlayState.prototype.constructor = PlayState;

PlayState.prototype.init = function()
{ 
  this.camera = new THREE.PerspectiveCamera(45, game.sizeW/game.sizeH, 0.1, 10000);
  this.camera.position.y = 100;
  this.camera.position.z = 300;
  this.camera.rotation.x = Math.PI/3*-1;
  
  this.scene = new THREE.Scene();
  this.scene.add(this.camera);
  
  // Create Basic Plane
  var texture = THREE.ImageUtils.loadTexture("textures/grass2.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(40, 40)
  this.groundGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  this.groundMaterial = new THREE.MeshBasicMaterial({map: texture});
  this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial);
  this.groundMesh.rotation.x = Math.PI/2*-1;
  this.scene.add(this.groundMesh);
  
  // Add a light
  var pointLight = new THREE.DirectionalLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 1;
  pointLight.position.y = 1;
  pointLight.position.z = -1;

  // add to the scene
  this.scene.add(pointLight);
  
  // set up GUI
  this.setupGUI();
};

PlayState.prototype.setupGUI = function()
{
  var toolbox = new GUI.Sprite();
  toolbox.fromPath('ui/icon_holder.png');
  toolbox.position(0.98, 0.02);
  toolbox.anchorPoint(1, 0);
  
  var debugConsole = new DebugConsole();
  game.gui.addChild(debugConsole.textArea);
  game.gui.addChild(debugConsole.textInput);
  game.gui.addChild(toolbox);
  
  // attach to Debug Console
  debugConsole.textInput._enterCallback = this.sendMessage;
};

PlayState.prototype.sendMessage = function(data)
{
  game.network.send('UserMessage', {msg: data});
};

PlayState.prototype.networkHandler = function(evt)
{
  console.log(evt.msg);
};

PlayState.prototype.mouseHandler = function(evt)
{
  this.mousePos.x = evt.clientX;
  this.mousePos.y = evt.clientY;
};

PlayState.prototype.resizeHandler = function(evt)
{
  this.camera.aspect = game.sizeW/game.sizeH;
  this.camera.updateProjectionMatrix();
};

PlayState.prototype.update = function()
{
  var mousePos = game.mouse.getNormalizedPosition();
  if(mousePos.x < 0.01) this.camera.position.x -= (mousePos.x-0.01)*-100*2;
  if(mousePos.y < 0.05) this.camera.position.z += (mousePos.y-0.05)*-100/2;
  
  if(mousePos.x > 0.99) this.camera.position.x -= (mousePos.x-0.99)*-100*2;
  if(mousePos.y > 0.95) this.camera.position.z += ((mousePos.y-0.95)*-100)/2;
};

PlayState.prototype.render = function()
{
  game.renderer.render(this.scene, this.camera);
};