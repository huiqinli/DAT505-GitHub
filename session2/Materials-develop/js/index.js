// -----------------------------------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene --------------------------
var scene = new THREE.Scene();

// Create a basic perspective camera --------------
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

// Create a renderer with Antialiasing ------------
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#C48888");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Configure lights -------------------------------
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);


// Create a Cube Mesh with basic material ---------
var geometry = new THREE.CylinderGeometry(5, 100, 100);

var geometry1 = new THREE.CubeGeometry(10, 10, 500);

var geometry2 = new THREE.CubeGeometry(30, 30, 30);

// MATERIAL 1:
//var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );

//MATERIAL 2:
//var material = new THREE.MeshNormalMaterial();

//MATERIAL 3:
/*
var material = new THREE.MeshLambertMaterial({
  color: "#433F81",
  transparent: true,
  opacity: 1
});
*/

//MATERIAL 4:
var texture = new THREE.TextureLoader().load( "texture3.jpg" );
var material = new THREE.MeshPhongMaterial({map: texture});

//MATERIAL 5 (non-shiny material):
/*
var material = new THREE.MeshLambertMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});
*/
var texture = new THREE.TextureLoader().load( "texture5.jpg" );
var material2 = new THREE.MeshBasicMaterial( { map: texture} );

/*
//MATERIAL 6 (shiny material):
var material = new THREE.MeshPhongMaterial({
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});
*/

var texture = new THREE.TextureLoader().load( "texture1.jpg" );
var material9 = new THREE.MeshBasicMaterial( { map: texture} );





/*
//MATERIAL 7 (physical-based material)
var material = new THREE.MeshPhysicalMaterial({

*/

var mesh1 = new THREE.Mesh( geometry1, material );
mesh1.position.z = -1000;
mesh1.position.y = 0;
mesh1.position.x = 100;


var mesh4 = new THREE.Mesh( geometry, material9 );
mesh4.position.z = -1000;
mesh4.position.x = 100;
mesh4.position.y = 200;



var mesh6 = new THREE.Mesh( geometry1, material );
mesh6.position.z = -1000;
mesh6.position.x = 100;
mesh6.position.y = 0;

var mesh7 = new THREE.Mesh( geometry2, material9 );
mesh7.position.z = -1000;
mesh7.position.x = -100;
mesh7.position.y = 0;






var mesh12 = new THREE.Mesh( geometry, material9 );
mesh12.position.z = -1000;
mesh12.position.x = 100;
mesh12.position.y = -200;

// ------------------------------------------------

// Add mesh to scene
scene.add( mesh1 );

scene.add( mesh4 );

scene.add( mesh6 );
scene.add( mesh7 );



scene.add( mesh12 );


var rot = 0;

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  rot += 0.01;


  mesh1.rotation.x = rot+1; //Continuously rotate the mesh
  mesh1.rotation.y = rot+0.1;


  mesh4.rotation.x = rot; //Continuously rotate the mesh
  mesh4.rotation.y = rot;


  mesh6.rotation.x = rot; //Continuously rotate the mesh
  mesh6.rotation.y = rot;


  mesh7.rotation.x = rot; //Continuously rotate the mesh
  mesh7.rotation.y = rot;




  mesh12.rotation.x = rot; //Continuously rotate the mesh
  mesh12.rotation.y = rot;



  // Render the scene
  renderer.render(scene, camera);
};

render(); //Run the function render
