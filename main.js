import * as THREE from 'three';

let camera, scene, renderer;

init();
//animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 10;

    scene = new THREE.Scene();
    
    const geometry = new THREE.PlaneGeometry( 10, 10 ); // ensure aspect ratio matches image
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/Moss002_1K-JPG_Color.jpg');

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: loader.load('/Moss002_1K-JPG_NormalGL.jpg'),
        normalScale: (2, 2)
    });

    // debugging light to view material
    const light = new THREE.AmbientLight( 0x404040 );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    scene.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

//renderer.render( scene, camera );

function render() {
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

render();

// This is run on every frame >:>
// function animate() {
//     requestAnimationFrame( animate );
//     renderer.render( scene, camera );
// }