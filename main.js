import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;


let clientX = window.innerWidth / 2;
let clientY = window.innerHeight / 2;

init();
//animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 10;


    scene = new THREE.Scene();
    
    const geometry = new THREE.PlaneGeometry( 10, 10 ); // ensure aspect ratio matches image
    const loader = new THREE.TextureLoader(); // shorthand for loading textures
    const texture = loader.load('/Moss002_1K-JPG_Color.jpg');
    const normalMap = loader.load('/Moss002_1K-JPG_NormalDX.jpg');

    const material = new THREE.MeshLambertMaterial({
        map: texture,
        normalMap: normalMap,
    });

    normalMap.flipY = false;

    // debugging light to view material
    const ambientLight = new THREE.AmbientLight( 0x404040 );

    const light = new THREE.SpotLight( 0xffffff, 100);
    light.position.set( clientX, clientY, 5 );
    const lightHelper = new THREE.SpotLightHelper(light, 2);
    light.castShadow = true;

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    scene.add( ambientLight );
    scene.add( light );
    scene.add( lightHelper );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // lets me see the setup from different angles
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.update();

    // handler for syncing light with mouse movement
    document.onmousemove = (event) => {
        let {
          clientX,
          clientY
        } = event
        light.position.set( ((clientX) - (window.innerWidth / 2)) / 200, ((clientY) - (window.innerHeight / 2)) / -200, 5 );
        //console.log(light.position);
      }
    
}

function render() {
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

render();