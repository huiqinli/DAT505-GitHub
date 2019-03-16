//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
 //rotation converter
 var params = {
 				clipIntersection: true,
 				planeConstant: 0,
 				showHelpers: false
 			};
 			var clipPlanes = [
 				new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
 				new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
 				new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
 			];



function init(){

        renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.localClippingEnabled = true;
				document.body.appendChild( renderer.domElement );
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );
  camera.position.set( - 20, 30, 40 );
  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );



  // Create a Cube Mesh with basic material ---------

//color: "#FF00FF"  mesh = new THREE.Mesh( geometry, material );


  // Add mesh to scene
  scene.add( mesh );




  var group = new THREE.Group();
				for ( var i = 1; i < 25; i ++ ) {
					var geometry = new THREE.SphereBufferGeometry( i / 2, 48, 24 );
					var material = new THREE.MeshLambertMaterial( {
						color: new THREE.Color( Math.sin( i * 0.5 ) * 0.5 + 0.5, Math.cos( i * 1.5 ) * 0.5 + 0.5, Math.sin( i * 4.5 + 0 ) * 0.5 + 0.5 ),
						side: THREE.DoubleSide,
						clippingPlanes: clipPlanes,
						clipIntersection: params.clipIntersection
					} );
					group.add( new THREE.Mesh( geometry, material ) );
        }
      scene.add( group );

      var helpers = new THREE.Group();
      				helpers.add( new THREE.AxesHelper( 20 ) );
      				helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 30, 0xff0000 ) );
      				helpers.add( new THREE.PlaneHelper( clipPlanes[ 1 ], 30, 0x00ff00 ) );
      				helpers.add( new THREE.PlaneHelper( clipPlanes[ 2 ], 30, 0x0000ff ) );
      				helpers.visible = false;
      				scene.add( helpers );
      				// gui
      				var gui = new dat.GUI();
      				gui.add( params, 'clipIntersection' ).name( 'clip intersection' ).onChange( function ( value ) {
      					var children = group.children;
      					for ( var i = 0; i < children.length; i ++ ) {
      						children[ i ].material.clipIntersection = value;
      					}
      					render();
      				} );
      				gui.add( params, 'planeConstant', - 16, 16 ).step( 1 ).name( 'plane constant' ).onChange( function ( value ) {
      					for ( var j = 0; j < clipPlanes.length; j ++ ) {
      						clipPlanes[ j ].constant = value;
      					}
      					render();
      				} );
      				gui.add( params, 'showHelpers' ).name( 'show helpers' ).onChange( function ( value ) {
      					helpers.visible = value;
      					render();
      				} );
      				//
      				window.addEventListener( 'resize', onWindowResize, false );
      			}
      			function onWindowResize() {
      				camera.aspect = window.innerWidth / window.innerHeight;
      				camera.updateProjectionMatrix();
      				renderer.setSize( window.innerWidth, window.innerHeight );
      				render();
      			}
      			function render() {
      				renderer.render( scene, camera );
      			}


//control values for GUI
//set preset values for controllers


//create a new DAT.GUI
var gui = new dat.GUI();

//define the folder name


// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
render();
