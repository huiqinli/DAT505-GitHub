var renderer, scene, camera, system;

var container = document.getElementById("container");


function init() {
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Create an empty scene
scene = new THREE.Scene();

// Create a basic perspective camera
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 390

system = new THREE.Group(); // planetary system


//create light
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2 );
scene.add(ambientLight);

var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
light.position.set(1500, 2500, 0);
scene.add(light);

// Create a planet Mesh with material

var geometry = new THREE.IcosahedronGeometry(100, 3);

var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

var planet = new THREE.Mesh(geometry, material);

//set the zoom of planet
for (var i = 0; i < planet.geometry.vertices.length; i++)
planet.geometry.vertices[i].multiplyScalar(Math.random() * 0.05 + 0.75);

planet.geometry.computeFlatVertexNormals();


system.add(planet);

//create surroundings
var asteroids = new THREE.Group();

for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.2) {
  var asteroid = new THREE.Mesh(new THREE.IcosahedronGeometry(8,0),material);

//set the zoom of asteriod
  var size = Math.random() * 0.6;
  for (var i = 0; i < asteroid.geometry.vertices.length; i++)
  asteroid.geometry.vertices[i].multiplyScalar(Math.random() * 0.7 + size);

  rand = Math.random() * 60 - 30;
  asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

  asteroid.geometry.computeFlatVertexNormals();
  asteroids.add(asteroid);
}

system.add(asteroids);

scene.add(system);

//create small points
for (i = 0; i < 20; i++) {
  particles = new THREE.Points(
    new THREE.Geometry(),
    new THREE.PointsMaterial({size: Math.random() * 10})
  );
  for (j = 0; j < 20; j++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * window.innerWidth * 1.1 - window.innerWidth * 1.1 / 2;
    vertex.y = Math.random() * window.innerHeight * 1.1 - window.innerHeight * 1.1 / 2;
    vertex.z = -500;
    particles.geometry.vertices.push(vertex);
    particles.material.color.setScalar(Math.random() * 0.4 + 0.2);
  }
  scene.add(particles);
}
}
var render = function () {
  requestAnimationFrame(render);
  //Continuously rotate the system and particals
  system.rotation.y += 0.002;


  particles.rotation.y += 0.003;
  particles.rotation.z += 0.003;


  // Render the scene
  renderer.render(scene, camera);
};
init();
render();
