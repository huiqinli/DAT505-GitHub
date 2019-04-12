# DAT505-GitHub

Final Project
=======================
Break the Space
----------------------

This code creates a scene, a camera, a planetary system and destructive figures.It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it renders the system and destructive figures within the scene for the camera. My concept is that the distinct figures which resemble "noise" can exert influence on the planetary system. When the mouse moves, the figure appears as if the system has peeled off to reveal another space.



var renderer, scene, camera, system;
var stats, objects;
var particlesR = 100;
var positions = [];
var colors = [];
var color = new THREE.Color();
var clock = new THREE.Clock();
var geometry1 = new THREE.BufferGeometry();



if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

function init() {
  // Create an empty scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 380;

  var container = document.getElementById("container");

// Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});

    // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Configure renderer clear color
  renderer.setClearColor(0x000000);

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);

    // Append Renderer to container
  container.appendChild( renderer.domElement );

  system = new THREE.Group();

  stats = new Stats();
  container.appendChild( stats.dom );

  //create light
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2 );
  scene.add(ambientLight);

  var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
  light.position.set(1500, 2500, 0);
  scene.add(light);

  window.addEventListener( 'resize', onWindowResize, false );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
-----------------------------------------------------------------------------------
`this part is responsible for the building of a planetary system, including a planet and the surrounding asteriods, along with small particles in the background`
  // Create a planet Mesh with material
  var geometry = new THREE.IcosahedronGeometry(100, 3);

  var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

  var planet = new THREE.Mesh(geometry, material);

  `set the zoom of the planet`
  for (var i = 0; i < planet.geometry.vertices.length; i++)
  planet.geometry.vertices[i].multiplyScalar(Math.random() * 0.05 + 0.75);

  planet.geometry.computeFlatVertexNormals();

  system.add(planet);

  var asteroids = new THREE.Group();

  for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.2) {
    var asteroid = new THREE.Mesh(new THREE.IcosahedronGeometry(8,0),material);

    `set the zoom of asteriod`
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


  for (i = 0; i < 30; i++) {
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
-----------------------------------------------------------------------------------------------
`Here the destructive objects are produced with different colors and they are designed to spread randomly on the screen`

  for ( var s = 0; s < particlesR; s ++ ) {
    // positions
    var positionX = Math.random() * 100 - 50;
    var positionY = Math.random() * 100 - 50;
    var positionZ = Math.random() * 100 - 50;
    positions.push( positionX, positionY, positionZ );
    // colors
    var vpositionX = ( positionX / 100 ) + 0.5;
    var vpositionY = ( positionY / 100 ) + 0.5;
    var vpositionZ = ( positionZ / 100 ) + 0.5;
    color.setRGB( vpositionX, vpositionY, vpositionZ );
    colors.push( color.r, color.g, color.b );
  }

  geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  geometry1.computeBoundingSphere();

  var material1 = new THREE.PointsMaterial( { size: 2, vertexColors: THREE.VertexColors, opacity:1 } );
  objects = new THREE.Points( geometry1, material1 );
  scene.add( objects );
}
----------------------------------------------------------------------------
`this part illustrates the position and the density of destructive objects`

var delta = 0.0;

function onDocumentMouseMove( event ) {
  delta += clock.getDelta();
  console.log(event.clientX);
  if(delta > 0.02){
    delta = 0;

    var positionX = event.clientX - window.innerWidth /2 ;
    var positionY = event.clientY - window.innerHeight / 2;
    var positionZ = 30;
    positions.push( positionX , positionY, positionZ );
    // colors
    var vpositionX = ( positionX / 100 ) + 0.5;
    var vpositionY = ( positionY / 100 ) + 0.5;
    var vpositionZ = ( positionZ / 100 ) + 0.5;
    color.setRGB( vpositionX, vpositionY, vpositionZ );
    colors.push( color.r, color.g, color.b );

    geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry1.computeBoundingSphere();

    var material1 = new THREE.PointsMaterial( { size: 35, vertexColors: THREE.VertexColors } );
    objects = new THREE.Points( geometry1, material1 );
    scene.add( objects );
  }
}
-----------------------------------------------------------------------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}
---------------------------------------------------------------------------------
`this part is written to make sure that various elements rotate continuously`
var render = function () {
  requestAnimationFrame(render);
  //Continuously rotate the system and particals
  system.rotation.y += 0.002;


  particles.rotation.y += 0.002;
  particles.rotation.z += 0.002;

  var time = Date.now() * 0.001;
  objects.scale.x += 0.7;
  objects.scale.y += 0.7;
  objects.scale.z += 0.2;

  if(objects.scale.x < 0.03){
    scene.remove(objects);
  }
---------------------------------------------------------------------------------
  // Render the scene
  renderer.render(scene, camera);
}
init();
render();
animate();
