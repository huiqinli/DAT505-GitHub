# DAT505-GitHub
this project shows cubes with random textures falling down.
```html
<script src="build/three.min.js"></script>

```

This code creates a scene, a camera, cubes with random textures and fall down randomly. It adds the geometries to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the geometries within the scene for the camera.

```javascript

//Setup the global variables
var camera, scene, renderer, geometry, material, mesh;
var texture;
var cubesNum = 10;

var cubes = [];
var speed = [];

function init() {
	// Create a scene
	scene = new THREE.Scene();

	// Create a geometry
	// 	Create a box (cube) of 10 width, length, and height
	geometry = new THREE.BoxGeometry( 10, 10, 10 );

	for (let i=0;i<cubesNum;i++){
		var randomValue = Math.random() * 0.5;
		speed.push(randomValue);
//generate a random number from 1 to 3
  let randomSelection = Math.round(Math.random()*11) +1;
	// Load a texture
	texture = new THREE.TextureLoader().load( "textures/texture" + randomSelection+".jpg");

	// Create a MeshBasicMaterial with a loaded texture
	material = new THREE.MeshBasicMaterial( { map: texture} );

	// Combine the geometry and material into a mesh
	mesh = new THREE.Mesh( geometry, material );

/*	if (mesh.position.y <- 30){
		mesh.position.y = ( Math.random() * 20 ) - 15;
		mesh.position.x = ( Math.random() * 20 ) - 15;*/
  // Add the mesh to the scene
	scene.add( mesh );
	cubes.push(mesh);
}



  //scaleCube += 0.02
  //if (scaleCube >8) scaleCube = -5;


  //c.scale.x += scaleCube;
  //c.scale.y += scaleCube;
  //c.scale.z += scaleCube;


	// Create a camera
	// 	Set a Field of View (FOV) of 75 degrees
	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
	// Move the camera 'out' by 30
	camera.position.z = 30;

	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );
 }


function animate() {
	// Call the requestAnimationFrame function on the animate function
	// 	(thus creating an infinite loop)
	requestAnimationFrame( animate );

`cubes change according to the condition`
//for (var i=0; i<cubesNum; i++){
for (var i=0; i<cubes.length; i++){
	cubes[i].rotation.x += 0.02;
	cubes[i].rotation.y += 0.01;
	cubes[i].position.y -= speed[i];

	if (cubes[i].position.y<-30){
		cubes[i].position.y = 35;
		cubes[i].position.x = (Math.random() * -20) +10;
		cubes[i].scale.x = (Math.random() * -2) + 1;
		cubes[i].scale.y = Math.random();
		cubes[i].scale.z = Math.random();
	}
}


	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}


init();
animate();
