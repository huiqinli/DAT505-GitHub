# DAT505-GitHub

```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>

```

This code creates a scene, a camera, lights, an array of rotating geometry given different textures. Orders are given for each geometry to rotate, it adds the geometries to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it renders the geometries within the scene for the camera.

```javascript

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

//add light
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
  for (var x = -100; x <= 100; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -100; y <= 100; y += 5) {

      // Create a cube Mesh with material ---------
     `geometries select from 12 pictures randomly`

      var boxGeometry = new THREE.ConeGeometry(2, 2, 3, 100);

      var texture =  new THREE.TextureLoader().load( "textures/texture"+ Math.floor(Math.random()*12) +".jpg" );

      var boxMaterial = new THREE.MeshBasicMaterial({ map: texture });


      /*if (x==-5 && y==-5){
        boxMaterial =  new THREE.MeshBasicMaterial({ map: texture });
      } else if (x==5 && y==5){
        boxMaterial =  new THREE.MeshBasicMaterial({ map: texture });
      } else {
        boxMaterial =  new THREE.MeshBasicMaterial({ map: texture });
      }*/

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

//var scaleCube = -5;


function drawFrame(){
  requestAnimationFrame(drawFrame);
  //scaleCube += 0.02
  //if (scaleCube >8) scaleCube = -5;
`each geometry rotate in a similar speed`
  cubes.forEach(function(c,i) {
  //Continuously rotate the mesh
  c.rotation.x += 0.7;
  c.rotation.y += 0.1;
  c.rotation.z += 0.1;

  //c.scale.x += scaleCube;
  //c.scale.y += scaleCube;
  //c.scale.z += scaleCube;

});

// Render the scene
  renderer.render(scene, camera);

}


init();
drawFrame();
