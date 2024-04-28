import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;


let clientX = window.innerWidth / 2;
let clientY = window.innerHeight / 2;

const canvas = document.getElementById("NormalMapBG");

const mossButton = document.getElementById("moss");
const foamButton = document.getElementById("foam");
const leatherButton = document.getElementById("leather");
const tilesButton = document.getElementById("tiles");

init();
//animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 10;


    scene = new THREE.Scene();
    
    const geometry = new THREE.PlaneGeometry( 30, 30 ); // ensure aspect ratio matches image
    const loader = new THREE.TextureLoader(); // shorthand for loading textures

    // creates moss material (assigned by default)
    const mossTexture = loader.load('/materials/moss/Moss002_1K-JPG_Color.jpg');
    const mossNormalMap = loader.load('/materials/moss/Moss002_1K-JPG_NormalDX.jpg');

    const mossMaterial = new THREE.MeshLambertMaterial({
        map: mossTexture,
        normalMap: mossNormalMap,
    });

    // creates foam material
    const foamTexture = loader.load('/materials/foam/AcousticFoam003_1K-JPG_Color.jpg');
    const foamNormalMap = loader.load('/materials/foam/AcousticFoam003_1K-JPG_NormalDX.jpg');

    const foamMaterial = new THREE.MeshLambertMaterial({
        map: foamTexture,
        normalMap: foamNormalMap,
    });

    // creates leather material
    const leatherTexture = loader.load('/materials/leather/Leather034C_1K-JPG_Color.jpg');
    const leatherNormalMap = loader.load('/materials/leather/Leather034C_1K-JPG_NormalDX.jpg');

    const leatherMaterial = new THREE.MeshLambertMaterial({
        map: leatherTexture,
        normalMap: leatherNormalMap,
    });

    // creates tile material
    const tileTexture = loader.load('/materials/roof_tiles/RoofingTiles013A_1K-JPG_Color.jpg');
    const tileNormalMap = loader.load('/materials/roof_tiles/RoofingTiles013A_1K-JPG_NormalDX.jpg');

    const tileMaterial = new THREE.MeshLambertMaterial({
        map: tileTexture,
        normalMap: tileNormalMap,
    });

    mossNormalMap.flipY = false;

    // debugging light to view material
    //const ambientLight = new THREE.AmbientLight( 0x404040 );
    const ambientLight = new THREE.AmbientLight( 0x3d3d3d );

    const light = new THREE.DirectionalLight( 0xededed, 3);
    light.position.set( clientX, clientY, 5 );
    const lightHelper = new THREE.SpotLightHelper(light, 2);
    light.castShadow = true;

    const mesh = new THREE.Mesh( geometry, mossMaterial );
    scene.add( mesh );
    scene.add( ambientLight );
    scene.add( light );
    scene.add( lightHelper );

    renderer = new THREE.WebGLRenderer( { canvas } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    const HTMLplane = renderer.domElement.style;
    HTMLplane.position = "fixed";
    HTMLplane.top = "0px";
    HTMLplane.left = "0px";
    HTMLplane.zIndex = "-1";

    // lets me see the setup from different angles
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.update();

    // handler for syncing light with mouse movement
    document.onmousemove = (event) => {
        let {
          clientX,
          clientY
        } = event
        light.position.set( ((clientX) - (window.innerWidth / 2)) / 50, ((clientY) - (window.innerHeight / 2)) / -50, 5 );
        //console.log(light.position);
      };

    // these functions change the material based on which button the user clicks
    mossButton.addEventListener('click', function() {
      mesh.material = mossMaterial;
      // ensures normal map intensity value from slider remains the same after selecting different normal map
      mesh.material.normalScale = new THREE.Vector2( rangeInput.value / 100, rangeInput.value / 100 );
    });

    foamButton.addEventListener('click', function() {
      mesh.material = foamMaterial;
      mesh.material.normalScale = new THREE.Vector2( rangeInput.value / 100, rangeInput.value / 100 );
    });

    leatherButton.addEventListener('click', function() {
      mesh.material = leatherMaterial;
      mesh.material.normalScale = new THREE.Vector2( rangeInput.value / 100, rangeInput.value / 100 );
    });

    tilesButton.addEventListener('click', function() {
      mesh.material = tileMaterial;
      mesh.material.normalScale = new THREE.Vector2( rangeInput.value / 100, rangeInput.value / 100 );
    });

    // slider controller for normal map intensity
    rangeInput.addEventListener('input', function() {
      mesh.material.normalScale = new THREE.Vector2( rangeInput.value / 100, rangeInput.value / 100 );
    });

    picker.addEventListener('input', function() {
      console.log(picker.value);
      light.color = new THREE.Color(picker.value);
    });
}



function render() {
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}

render();