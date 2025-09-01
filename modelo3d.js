// modelo3d.js
import * as THREE from 

'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 

'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.

js';
import { OrbitControls } from 

'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitContr

ols.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(400, 400);
document.getElementById("modelo3d").appendChild(renderer.domElement);
console.log("Renderer anexado em #modelo3d:", renderer.domElement);

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// GLTF Loader
const loader = new GLTFLoader();
loader.load(
  'models/Zil3d/Zil3d.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Erro ao carregar GLB:', error);
  }
);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minPolarAngle = Math.PI / 2.2;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 0, 0);
controls.update();

// Redimensionamento
function resizeRenderer() {
  const container = document.getElementById("modelo3d");
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resizeRenderer);
resizeRenderer();

// Loop de renderização
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
