# DAT505-GitHub

```html
<script src="build/three.min.js"></script>
<script src="js/dat.gui.min.js"></script>

```
This code creates a scene, a camera, GUI controllers including scale, position, rotation, color, opacity, and a ring which can be changed via different controllers, and it adds the geometries to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it renders the geometry within the scene for the camera.

```javascript

//Global variables
var scene, camera, renderer;
var geometry, material, mesh, threejs, color;

var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

//GUI - Declare variable
var gui = null;

//Rotation converter
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

init();
render();

function init(){
  threejs = document.getElementById('threejs');

  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a renderer  ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x333F47, 1);
  renderer.shadowMap.Enabled = true;
  renderer.shadowMapSoft = true;

  threejs.appendChild(renderer.domElement);

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1 , 1000);
  camera.position.set(0, 6, 6);
  camera.lookAt(scene.position);
  scene.add(camera);

  // Create a torusbuffer Mesh with material  ---------
  geometry = new THREE.TorusBufferGeometry(6, 2, 6, 60);
  color = Math.random() * 0xffffff;

  var material = new THREE.MeshLambertMaterial({
    //ambient: color,
    color: color,
    transparent: true
  });

`set the parameters of ring mesh`

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(0, 0, 0);
  mesh.rotation.y = de2ra(-90);
  mesh.scale.set(1, 1, 1);
  mesh.doubleSided = true;
  mesh.castShadow = true;
  // Add mesh to scene
  scene.add(mesh);

  lightingSystem();


  var controller = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.positionX = 1;
    this.positionY = 1;
    this.positionZ = 1;
    this.rotationX = 1;
    this.rotationY = 1;
    this.rotationZ = 1;
    this.boxColor = color;
    //this.castShadow = true;
    this.boxOpacity = 1;
  }();
//GUI - Setup the GUI controller
  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX',  30).onChange( function() {
    mesh.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 30).onChange( function() {
    mesh.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 30).onChange( function() {
    mesh.scale.z = (controller.scaleZ);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -100, 30).onChange( function() {
    mesh.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -100, 30).onChange( function() {
    mesh.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -100, 30).onChange( function() {
    mesh.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 360).onChange( function() {
    mesh.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 360).onChange( function() {
    mesh.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 360).onChange( function() {
    mesh.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh.material.color.setHex( dec2hex(controller.boxColor) );
  });
  //gui.add( controller, 'castShadow', false ).onChange( function() {
    //mesh.castShadow = controller.castShadow;
  //});
  gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
    material.opacity = (controller.boxOpacity);
  });
}

//Color converter
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}

// Render Loop
function render () {
  requestAnimationFrame(render);
  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;
  //renderer.setClearColor("#000000");
  // Render the scene
  renderer.render(scene, camera);
};

//add lightingSystem
function lightingSystem(){
  var object3d  = new THREE.DirectionalLight('white', 0.15);
  object3d.position.set(6,3,9);
  object3d.name = 'Back light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.35);
  object3d.position.set(-6, -3, 0);
  object3d.name   = 'Key light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.55);
  object3d.position.set(9, 9, 6);
  object3d.name = 'Fill light';
  scene.add(object3d);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 3, 30, 3 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 45;
  // Add spotlight to scene
  scene.add( spotLight );
}
