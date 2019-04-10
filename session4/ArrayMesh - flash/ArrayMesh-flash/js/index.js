var renderer, scene, camera;
var controls;
var cubes = [];
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
  renderer.setClearColor(0x000000);
  renderer.setSize(W, H);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -35; x <= 40; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -35; y <= 40; y += 5) {


      // Create a cube Mesh with material ---------
        var cubeGeometry = new THREE.CubeGeometry(2, 2, 3);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

        var mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //mesh.castShadow = true;
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.rotation.z += 360*Math.random();
        mesh.rotation.y += 360*Math.random();

        // Add mesh to scene
        scene.add(mesh);
        cubes.push(mesh);
      }
    }

  console.log(cubes);
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.07;

  //for each
cubes.forEach(function(c,i) {
  c.rotation.x += rot;
});
// Render the scene
renderer.render(scene, camera);
}
init();
drawFrame();
