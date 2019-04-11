// MatCap-style image rendered on a sphere
// modify sphere UVs instead of using a ShaderMaterial

var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;
var eyes = [];

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotX = [];
var rotY = [];



init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// Create an empty scene --------------------------
	scene = new THREE.Scene();

	// Create a basic perspective camera --------------
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 200 );
	scene.add( camera ); // since light is child of camera
	//add light to the scene
	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

	for(s = 0; s < 30; s ++){
		//create a sphere
		var geometry = new THREE.SphereGeometry( 30, 32, 16 );
		var material = new THREE.MeshPhongMaterial( {
			color: 0xffffff,
			specular: 0x050505,
			shininess: 50,
			map: THREE.ImageUtils.loadTexture('images/eye.png'),
		});


		// modify UVs to accommodate MatCap texture

		var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
		for ( i = 0; i < faceVertexUvs.length; i ++ ) {
			var uvs = faceVertexUvs[ i ];
			var face = geometry.faces[ i ];
			for ( var sphere = 0; sphere < 3; sphere ++ ) {
				uvs[ sphere ].x = face.vertexNormals[ sphere ].x * 0.5 + 0.5;
				uvs[ sphere ].y = face.vertexNormals[ sphere ].y * 0.5 + 0.5;
			}
		}


		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = (Math.random()*-200)+70;
		mesh.position.y = (Math.random()*-50)+30;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = (Math.random() * -3) +1;

		var rotValX = (Math.random()* 0.1) - 0.25;
		var rotValY = (Math.random()* 0.1) - 0.25;

		rotX.push(rotValX);
		rotY.push(rotValY);

		//add mesh to the scene
		scene.add(mesh);
		eyes.push(mesh);
	}

	// Create a renderer with Antialiasing ------------
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	console.log(window.innerHeight)

	eyes.forEach(function(c,i){
		eyes[i].rotation.x += rotX;
		eyes[i].rotation.y += rotY;
		eyes[i].rotation.x = mouseY/window.innerHeight*2;
		eyes[i].rotation.y = mouseX/window.innerWidth*2;
	});


	// Render the scene
	renderer.render( scene, camera );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseMove( event ) {
	console.log(event.clientX);
	mouseX = event.clientX - windowHalfX;;
	mouseY = event.clientY - windowHalfY;
}
