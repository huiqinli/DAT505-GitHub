var renderer, scene, camera;
var controls;
var torusbuffers = [];
var rot = 0;

function init() {
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(20, 20, 85);
  camera.lookAt(scene.position);

//create light
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 2000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;
  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0,1000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      for (var z = -10; z <= 10; z += 5) {
        //for (var y = -30; y <= 30; y += 5) {

        console.log("X: " +x+", Y: " +y+ ", Z: " +z);
        var torusbufferGeometry = new THREE.TorusBufferGeometry(1, 1, 3, 100);
        //The color of the material is assigned a random color
        if (x >= 0 && z >= 0 && y >= 0){
          //MEANS squares with values 0 and 5 are true
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0xFFCBB3});
        } else if ( x <= 0 && y >=0 && z >= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0xAE57A4});
        } else if ( x >= 0 && y <=0 && z >= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF6F});
        } else if ( x <= 0 && y <=0 && z >= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0x28FF28});
        } else if ( x >= 0 && y >=0 && z <= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0xD94600});
        } else if ( x <= 0 && y >=0 && z <= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0x743A3A});
        } else if ( x >= 0 && y <=0 && z <= 0){
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0xFF2D2D});
        } else {
          torusbufferMaterial = new THREE.MeshLambertMaterial({color: 0x5CADAD});
        }

        var mesh = new THREE.Mesh(torusbufferGeometry, torusbufferMaterial);
        //mesh.castShadow = true;
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        // Add mesh to scene
        scene.add(mesh);
        torusbuffers.push(mesh);
      }
    }
  }
  console.log(torusbuffers);
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //for each
torusbuffers.forEach(function(c,i) {
    c.rotation.x = rot;
    c.rotation.y = rot+0.1;

});
// Render the scene
renderer.render(scene, camera);
}
init();
drawFrame();
