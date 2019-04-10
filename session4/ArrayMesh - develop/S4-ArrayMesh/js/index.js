var renderer, scene, camera;

var controls;
var cubes = [];
var randomSpeedX = [];

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
  spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0,1000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x000000);
  renderer.setSize(W, H);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {

      var boxGeometry = new THREE.ConeGeometry(2, 2, 3, 100);
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      if (x==-5 && y==-5){
        boxMaterial =  new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      } else if (x==5 && y==5){
        boxMaterial =  new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      } else {
        boxMaterial =  new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      }

      var box = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      box.position.x = x;
      box.position.z = y;
      box.scale.x = 0.5;
      box.rotation.x += 360*Math.random();
      box.rotation.y += 360*Math.random();
      box.rotation.z += 360*Math.random();

      var randomValueX = (Math.random() * 0.5) - 0.25;
      randomSpeedX.push(randomValueX);
      // Add mesh to scene
      scene.add(box);
      cubes.push(box);
    }
  }

  console.log(randomSpeedX);
  document.body.appendChild(renderer.domElement);
}

var scaleCube = -5;


function drawFrame(){
  requestAnimationFrame(drawFrame);
  scaleCube += 0.02
  if (scaleCube >8) scaleCube = -5;

  cubes.forEach(function(c,i) {
    //Continuously rotate the mesh
  c.rotation.x += 0.7;
  c.rotation.y += 0.1;
  c.rotation.z += 0.1;

  c.scale.x += scaleCube;
  c.scale.y = scaleCube;
  c.scale.z = scaleCube;

});
//  cubes[6].rotation.x += 0.2;
//  cubes[6].scale.x += scaleCube;
  //cubes[6].material = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

  console.log(scaleCube)
  //cubes[6].rotation.x += randomSpeedX[6];
  //cubes[18].rotation.x += randomSpeedX[18];
  // Render the scene
  renderer.render(scene, camera);

}


init();
drawFrame();
