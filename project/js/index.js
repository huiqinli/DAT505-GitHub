//Global variables
var scene, camera, renderer;
var geometry1, wireframe1, line1, material1;

var geometry2, wireframe2, line2, material2;
var geometry3,mesh1, material3;
var geometry4,mesh2, material4;



/*var effectController = {
				showDots: true,
				showLines: true,
				minDistance: 150,
				limitConnections: false,
				maxConnections: 20,
				particleCount: 500
};*/


//Rotation converter
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};


function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}



function geometry(){

  geometry1 = new THREE.IcosahedronBufferGeometry( 1500, 1 );
  wireframe1 = new THREE.WireframeGeometry( geometry1 );
  material1 = new THREE.MeshBasicMaterial( { color: "#A6FFFF" } );
  line1 = new THREE.LineSegments( wireframe1,material1 );
  //line1.material.depthTest = false;
  //line1.material.opacity = 1;
  //line1.material.transparent = true;
  line1.position.z = -8000;

  scene.add( line1 );

  geometry2 = new THREE.IcosahedronBufferGeometry(2500, 1);
  wireframe2 = new THREE.WireframeGeometry( geometry2 );
  material2 = new THREE.MeshBasicMaterial( { color: "#E6E6FA" } );
  line2 = new THREE.LineSegments( wireframe2,material2 );
  //line1.material.depthTest = false;
  //line1.material.opacity = 1;
  //line1.material.transparent = true;
  line2.position.z = -7500;

  scene.add( line2 );


  var texture = new THREE.TextureLoader().load( "textures/texture" + "textures/texture2" + ".jpg");


  material3 = new THREE.MeshBasicMaterial( { map: texture} );
  material4 = new THREE.MeshBasicMaterial( { map: texture2} );

  geometry3 = new THREE.CircleGeometry(2500, 1000, 600);
  mesh1 = new THREE.Mesh( geometry3, material3 );
  mesh1.position.z = -8500;


  // Add mesh to scene
  scene.add( mesh1 );

  geometry4 = new THREE.CircleGeometry(2000, 1000, 600);
  mesh2 = new THREE.Mesh( geometry4, material4 );
  mesh2.position.z = -9000;
  //mesh2.position.x = 0.0009;

  // Add mesh to scene
  scene.add( mesh2 );




}


// Render Loop
var render = function () {
  requestAnimationFrame( render );

  line1.rotation.x += 0.01; //Continuously rotate the mesh
  line1.rotation.y += 0.01;

  line2.rotation.x += 0.03; //Continuously rotate the mesh
  line2.rotation.y += 0.03;

  //mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh2.rotation.y += 0.05;
  //mesh2.rotation.z += 0.05;



  // Render the scene
  renderer.render(scene, camera);
};



//GUI - Setup the GUI controller
var gui = new dat.GUI();

var controller = new function() {

  this.scaleX = 1;
  this.scaleY = 1;
  //this.scaleZ = 1;


	  //----------------
}();





var f1 = gui.addFolder('Scale');
f1.add(controller, 'scaleX', 0, 50).onChange( function() {
  line1.scale.x = de2ra(controller.scaleX);
});
f1.add(controller, 'scaleY', 0, 50).onChange( function() {
  line1.scale.y = de2ra(controller.scaleY);
});
/*f1.add(controller, 'scaleZ', 0, 5).onChange( function() {
  line1.scale.z = de2ra(controller.scaleZ);
});*/



init();
geometry();
render();
