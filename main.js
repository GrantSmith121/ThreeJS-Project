import * as THREE from 'three';

let camera, scene, renderer;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 10;

    scene = new THREE.Scene();
       
    const geometry = new THREE.PlaneGeometry( 10, 10 ); // ensure aspect ratio matches image
    const material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('uv_grid_opengl.jpg') } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

// This is run on every frame >:>
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}