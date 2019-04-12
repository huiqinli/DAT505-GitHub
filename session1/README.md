# DAT505-GitHub
```html
<script src="js/three.js"></script>
```
This code creates a scene, a camera, two planets and an UFO, and it adds the geometries to the scene. 11 geometries are combined to create new looks of geometries, especially in the case of the UFO. Both 0f them are rotating.It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it renders the geometries within the scene for the camera.

```javascript

var scene, camera, renderer;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;
var geometry4, material4, mesh4;
var geometry5, material5, mesh5;
var geometry6, material6, mesh6;
var geometry7, material7, mesh7;
var geometry8, material8, mesh8;
var geometry9, material9, mesh9;
var geometry10, material10, mesh10;
var geometry11, material11, mesh11;




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


`these universe consists of following
geometries with diffrent shapes, colors and positions `

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.BoxGeometry(70, 12, 12);
  material1 = new THREE.MeshBasicMaterial( { color: "#FFE665" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -1000;


  // Add mesh to scene
  scene.add( mesh1 );

  // Create a sphere Mesh with basic material ---------
  geometry2 = new THREE.SphereGeometry(100, 100, 100);
  material2 = new THREE.MeshBasicMaterial( { color: "#4EFEB3" } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;
  mesh2.position.y = -100;

  // Add mesh to scene
  scene.add( mesh2 );

  // Create a cone Mesh with basic material ---------
  geometry3 = new THREE.ConeGeometry(200, 200, 15);
  material3 = new THREE.MeshBasicMaterial( { color: "#FFA042" } );
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -1000;
  mesh3.position.y = -100;

  // Add mesh to scene
  scene.add( mesh3 );

  // Create a sphere Mesh with basic material ---------
  geometry4 = new THREE.SphereGeometry(40, 10, 3);
  material4 = new THREE.MeshBasicMaterial( { color: "#743A3A" } );
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -800;
  mesh4.position.x = -200;
  mesh4.position.y = 100;

  // Add mesh to scene
  scene.add( mesh4 );

  // Create a cylinder Mesh with basic material ---------
  geometry5 = new THREE.CylinderGeometry( 1, 5, 10 );
  material5 = new THREE.MeshBasicMaterial( { color: "#C07AB8" } );
  mesh5 = new THREE.Mesh( geometry5, material5 );
  mesh5.position.z = -700;
  mesh5.position.x = -235;
  mesh5.position.y = 100;

  // Add mesh to scene
  scene.add( mesh5 );

  // Create a cylinder Mesh with basic material ---------
  geometry6 = new THREE.CylinderGeometry( 1, 5, 10 );
  material6 = new THREE.MeshBasicMaterial( { color: "#C07AB8" } );
  mesh6 = new THREE.Mesh( geometry6, material6 );
  mesh6.position.z = -700;
  mesh6.position.x = -170;
  mesh6.position.y = 100;

  // Add mesh to scene
  scene.add( mesh6 );

  // Create a cylinder Mesh with basic material ---------
  geometry7 = new THREE.CylinderGeometry( 50, 19, 10 );
  material7 = new THREE.MeshBasicMaterial( { color: "#DEFFCC" } );
  mesh7 = new THREE.Mesh( geometry7, material7 );
  mesh7.position.z = -800;
  mesh7.position.x = -200;
  mesh7.position.y = 100;

  // Add mesh to scene
  scene.add( mesh7 );

  // Create a cylinder Mesh with basic material ---------
  //BLUE
  geometry8 = new THREE.CylinderGeometry(105, 105, 20);
  material8 = new THREE.MeshBasicMaterial( { color: "#46A3FF" } );
  mesh8 = new THREE.Mesh( geometry8, material8 );
  mesh8.position.z = -1000;
  mesh8.position.y = -100;

  // Add mesh to scene
  scene.add( mesh8 );

  // Create a sphere Mesh with basic material ---------
  geometry9 = new THREE.SphereGeometry(70, 70, 70);
  material9 = new THREE.MeshBasicMaterial( { color: "#CA8EC2" } );
  mesh9 = new THREE.Mesh( geometry9, material9 );
  mesh9.position.z = -1300;
  mesh9.position.y = 120;
  mesh9.position.x = 350;

  // Add mesh to scene
  scene.add( mesh9 );

  // Create a cylinder Mesh with basic material ---------
  geometry10 = new THREE.CylinderGeometry( 75, 75, 20 );
  material10 = new THREE.MeshBasicMaterial( { color: "#FFBFFF" } );
  mesh10 = new THREE.Mesh( geometry10, material10 );
  mesh10.position.z = -1300;
  mesh10.position.x = 350;
  mesh10.position.y = 120;

  // Add mesh to scene
  scene.add( mesh10 );

  // Create a cylinder Mesh with basic material ---------
  geometry11 = new THREE.CylinderGeometry( 105, 105, 10 );
  material11 = new THREE.MeshBasicMaterial( { color: "#FFFF37" } );
  mesh11 = new THREE.Mesh( geometry11, material11 );
  mesh11.position.z = -1300;
  mesh11.position.x = 350;
  mesh11.position.y = 105;
  // Add mesh to scene
  scene.add( mesh11 );


}

`Continuously rotate the mesh`

// Render Loop
var render = function () {
  requestAnimationFrame( render )


  mesh1.rotation.x += 0.07;
  mesh1.rotation.y += 0.07;

  mesh3.rotation.y += 0.07;


  mesh4.rotation.z += 0.1;
  mesh4.rotation.y += 0.07;

  mesh5.rotation.z += 0.1;
  mesh5.rotation.y += 0.07;

  mesh6.rotation.y += 0.03;
  mesh6.rotation.z += 0.07;


  mesh7.rotation.z += 0.01;
  mesh7.rotation.X += 0.03;


  mesh11.rotation.z += 0.1;
  mesh11.rotation.y += 0.03; //Continuously rotate the mesh




  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);

};

init();
geometry();
render();
