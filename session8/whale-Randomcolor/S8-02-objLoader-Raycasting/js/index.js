var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var object;

var objects = [];
//var selectedObject = null;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );

  // Create an empty scene --------------------------
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );


  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

//create a boxbuffer mesh with material
  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  for (var i=0; i<500; i++){

  // Model/material loading!
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("Blocks.mtl", function(materials){

		materials.preload();

    var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
//load OBJ
  		objLoader.load("shark.obj", function(mesh){
  			mesh.traverse(function(node){
  				if( node instanceof THREE.Mesh ){
  					node.castShadow = true;
  					node.receiveShadow = true;
  				}
  			});
        var sizeRand = Math.random() * 0.5;
        mesh.scale.set(sizeRand,sizeRand,sizeRand);
        mesh.position.set(Math.random()*800-400, Math.random()*800-400, Math.random()*800-400);
        mesh.rotation.y = -Math.PI/Math.random()*4;
        //add mesh to the scene
        scene.add(mesh);
        objects.push(mesh); //Add to the array so that we can access for raycasting
  		});
  	});
  }

  raycaster = new THREE.Raycaster();

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //stats = new Stats();
  //container.appendChild( stats.dom );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  //document.addEventListener( 'mousemove', onDocumentMouseDown, false );
  window.addEventListener( 'resize', onWindowResize, false );
}

//reset parameters of camera
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

/*function onDocumentMouseDown( event ) {
  event.preventDefault();
  if ( selectedObject ) {
    selectedObject.material.color.set(  Math.random() * 0xFFFFFF  );
    selectedObject = null;
  }

  var intersects = getIntersects( event.layerX, event.layerY );
    if ( intersects.length > 0 ) {
      var res = intersects.filter( function ( res ) {
        return res && res.object;
      } )[ 0 ];
      if ( res && res.object ) {
        selectedObject = res.object;
        console.log(selectedObject.scale);
      }
    }
  }*/
//
function animate() {
  requestAnimationFrame( animate );

  render();
  //stats.update();
}

function render() {
  //Auto rotate camera
  theta += 0.1;
  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );
  camera.updateMatrixWorld();

  //Find intersections
  raycaster.setFromCamera( mouse, camera );
  //var intersects = raycaster.intersectObjects( scene.children );

  var intersects = raycaster.intersectObjects( objects, true );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( Math.random() * 0xFFFFFF );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }

  // Render the scene
  renderer.render( scene, camera );
}
