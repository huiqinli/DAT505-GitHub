# DAT505-GitHub

`Final Project`
=======================
`Make Some Noise`
----------------------

`This code creates a scene, a camera, a planetary system and a 'noise' object.It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it renders the system and 'noise' within the scene for the camera. My concept is that the planet is like a sentient being, when the mouse moves, the 'noise' appears from the middle of the planet as if the planet is making some noise and expressing its feelings. if you use the mouse to draw a circle on the screen, the tracks of noise will be more regular. When the mouse moves continuously, the noise becomes ‘denser’ and some of the parts even connect and line up to show a path. `



var renderer, scene, camera, system;
var stats, objects;
var particlesR = 100;
var positions = [];
var colors = [];
var color = new THREE.Color();
var clock = new THREE.Clock();`Create a clock to record time`
var geometry1 = new THREE.BufferGeometry();`Create 'noise'`


--------------------------------------------------------------------------------------------
if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

`this part creates an empty scene, a basic perspective camera, a renderer with Antialiasing,
renderer size and color, the ambientLight and DirectionalLight, a system group`

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 380;

  renderer = new THREE.WebGLRenderer({antialias:true});

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setClearColor(0x000000);

  `Append Renderer to DOM`
  document.body.appendChild(renderer.domElement);

  system = new THREE.Group();

  `Performance monitoring`
  stats = new Stats();

  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2 );
  scene.add(ambientLight);

  var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
  light.position.set(1500, 2500, 0);
  scene.add(light);

  window.addEventListener( 'resize', onWindowResize, false );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  -----------------------------------------------------------------------------------
  `this part is responsible for the construction of a planetary system, including a
  planet and the surrounding asteriods, as well as small particles in the background`

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

    `set the zoom of asteriod, when they move to the front, they will look near`
    var size = Math.random() * 0.6;
    for (var i = 0; i < asteroid.geometry.vertices.length; i++)
    asteroid.geometry.vertices[i].multiplyScalar(Math.random() * 0.7 + size);

    `control the distance between asteroids`
    rand = Math.random() * 60 - 30;
    asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

    asteroid.geometry.computeFlatVertexNormals();
    asteroids.add(asteroid);
  }

  system.add(asteroids);

  scene.add(system);

  `Create small points, set up the size, distance and density`
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
    `Here the destructive objects are produced with different colors
    and they are designed to spread randomly on the screen`

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
    `noise`
    geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry1.computeBoundingSphere();

    var material1 = new THREE.PointsMaterial( { size: 2, vertexColors: THREE.VertexColors, opacity:1 } );
    objects = new THREE.Points( geometry1, material1 );
    scene.add( objects );
  }
  ----------------------------------------------------------------------------
  `this part illustrates the position and the density of 'noise', the 'noise' will
   move from the center to the border, the more you move, the denser the noise becomes`

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
  `this part is written to make sure that various elements rotate continuously and appropriately`
  var render = function () {
    requestAnimationFrame(render);

    system.rotation.y += 0.002;


    particles.rotation.y += 0.002;
    particles.rotation.z += 0.002;

    var time = Date.now() * 0.001;
    objects.scale.x += 0.7;
    objects.scale.y += 0.7;

--------------------------------------------------------------------------

    renderer.render(scene, camera);
  }
  init();
  render();
  animate();
