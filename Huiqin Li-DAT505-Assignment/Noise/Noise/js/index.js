var renderer, scene, camera, system;
var stats, objects;
var particlesR = 100;
var positions = [];
var colors = [];
var color = new THREE.Color();
var clock = new THREE.Clock();// Create a clock to record time
var geometry1 = new THREE.BufferGeometry();// Create 'noise'


if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

function init() {
  // Create an empty scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 380;

  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Configure renderer clear color
  renderer.setClearColor(0x000000);

  // Append Renderer to DOM
  var content = document.getElementById("container");
  document.getElementById("container").appendChild(renderer.domElement);

  // Create a planetary system
  system = new THREE.Group();

  // Performance monitoring
  stats = new Stats();

  //Create lights
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2 );
  scene.add(ambientLight);

  var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
  light.position.set(1500, 2500, 0);
  scene.add(light);

  // Add listenerS to control the camera
  window.addEventListener( 'resize', onWindowResize, false );

 document.addEventListener( 'mousemove', onDocumentMouseMove, false );


  // Create a planet Mesh with material
  var geometry = new THREE.IcosahedronGeometry(100, 3);

  var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

  var planet = new THREE.Mesh(geometry, material);

  // Set up the zoom of planet
  for (var i = 0; i < planet.geometry.vertices.length; i++)
  planet.geometry.vertices[i].multiplyScalar(Math.random() * 0.05 + 0.75);

  planet.geometry.computeFlatVertexNormals();

  system.add(planet);

  // Create surroundings of the planet
  var asteroids = new THREE.Group();

  for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.2) {
    var asteroid = new THREE.Mesh(new THREE.IcosahedronGeometry(8,0),material);

    // Set up the zoom of asteriod
    var size = Math.random() * 0.6;
    for (var i = 0; i < asteroid.geometry.vertices.length; i++)
    asteroid.geometry.vertices[i].multiplyScalar(Math.random() * 0.7 + size);

    // Control the distance between asteroids
    rand = Math.random() * 50 - 30;
    asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

    asteroid.geometry.computeFlatVertexNormals();

    // Add asteroid to asteroids
    asteroids.add(asteroid);
  }

  // Add asteriods to system
  system.add(asteroids);

  // Add system to scene
  scene.add(system);

  //Create small points
  for (i = 0; i < 30; i++) {
    particles = new THREE.Points(
      new THREE.Geometry(),
      new THREE.PointsMaterial({size: Math.random() * 10})
    );
    for (j = 0; j < 20; j++) {
      var vertex = new THREE.Vector3();
      // Random X and Y positions according to the scale of screen
      vertex.x = Math.random() * window.innerWidth * 1.1 - window.innerWidth * 1.1 / 2;
      vertex.y = Math.random() * window.innerHeight * 1.1 - window.innerHeight * 1.1 / 2;
      // Distance between small points and screen
      vertex.z = -500;
      particles.geometry.vertices.push(vertex);
      particles.material.color.setScalar(Math.random() * 0.4 + 0.2);
    }

    // Add particles to the scene
    scene.add(particles);
  }

  // Set up the position and color of 'noise'
  for ( var s = 0; s < particlesR; s ++ ) {
    // positions
    var positionX = Math.random() * 100 - 50;
    var positionY = Math.random() * 100 - 50;

    positions.push( positionX, positionY );
    // colors
    var vpositionX = ( positionX / 100 ) + 0.5;
    var vpositionY = ( positionY / 100 ) + 0.5;

    color.setRGB( vpositionX, vpositionY );
    colors.push( color.r, color.g, color.b );
  }

  geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 1 ) );
  geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 1 ) );
  geometry1.computeBoundingSphere();

  // Create 'noise' with PointsMaterial
  var material1 = new THREE.PointsMaterial( { size: 2, vertexColors: THREE.VertexColors} );
  noise = new THREE.Points( geometry1, material1 );
  scene.add( noise );
}

var delta = 0.0;

function onDocumentMouseMove( event ) {
  delta += clock.getDelta();
  console.log(event.clientX);
  if(delta > 0.02){
    delta = 0;

    var positionX = event.clientX - window.innerWidth /2 ;
    var positionY = event.clientY - window.innerHeight / 2;

    positions.push( positionX , positionY );
    // colors
    var vpositionX = ( positionX / 100 ) + 0.5;
    var vpositionY = ( positionY / 100 ) + 0.5;

    color.setRGB( vpositionX, vpositionY );
    colors.push( color.r, color.g, color.b );

    geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry1.computeBoundingSphere();

    var material1 = new THREE.PointsMaterial( { size: 30, vertexColors: THREE.VertexColors} );
    noise = new THREE.Points( geometry1, material1 );
    scene.add( noise );


  }
}


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

var render = function () {
  requestAnimationFrame(render);
  //Continuously rotate the system and particals
  system.rotation.y += 0.002;

  particles.rotation.y += 0.002;
  particles.rotation.z += 0.002;

  // The changes of the scale of noise
  var time = Date.now() * 0.001;
  noise.scale.x += 0.7;
  noise.scale.y += 0.9;

  // Render the scene
  renderer.render(scene, camera);
}
init();
render();
animate();
