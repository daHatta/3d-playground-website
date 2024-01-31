import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Canvas Size
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

renderer.setSize( canvasWidth, canvasHeight );
renderer.setPixelRatio(window.devicePixelRatio);

// Renderer to Canvas
canvas.appendChild(renderer.domElement);

// Szene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 1000 );

// Camera Position
camera.position.z = 100;
camera.position.y = 100;
camera.position.x = 100;

// Camera view
camera.lookAt(0, 0, 0);

scene.add(camera);

scene.add(new THREE.AxesHelper(500));

// Model
let object;
let objToRender = 'cars-fillmore';

// Loader
const loader = new GLTFLoader();

loader.load(`${objToRender}/scene.gltf`, function (gltf) {
        object = gltf.scene;
        object.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                if (node.material.map) {
                    node.material.map = texture
                    node.material.map.anisotropy = 8;
                }
            };
        });

        object.scale.set(24, 24, 24);

        scene.add(object);
    }, 
    function (xhr) {
        console.log((xhr.loaded/xhr.total*100) + '% loaded');
    }, 
    function (error) {
        console.log(error);
    }
);

// Controls
const controls = new OrbitControls( camera, renderer.domElement);
controls.enablePan = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// Hemisphere Light
const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);

// Directional Light
const topLight = new THREE.DirectionalLight(0xffffff, 0.45);
topLight.position.set(2500, 2500, 2500);
topLight.castShadow = true;
scene.add(topLight);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333, 0.25);
scene.add(ambientLight);

// Spotlight
const spotLight = new THREE.SpotLight(0xffa95c, 4);
spotLight.position.set(0, 1500, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.00001;
spotLight.shadow.mapSize.width = 1024*4;
spotLight.shadow.mapSize.height = 1024*4;
//scene.add(spotLight);

// Texture
const texture = new THREE.TextureLoader().load(`${objToRender}/textures/Material.039_baseColor.png`);
//texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4);

// Function Animate
function animate() {

    requestAnimationFrame(animate);
    
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
    )

    //controls.update();

    renderer.render(scene, camera);
}

// Eventlistener 
window.addEventListener("resize", function () {
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
});

// Call
animate();
