import * as THREE from "../node_modules/three/build/three.module.js";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
document.getElementById("modelo3d").appendChild(renderer.domElement);
resizeRenderer();

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Carregar modelo GLB
const loader = new GLTFLoader();
console.log("Antes de carregar o GLB");

loader.load('Zil3d.glb',
  (gltf) => {
    console.log("GLB carregado!");
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model);
  },
  undefined,
  (error) => console.error('Erro ao carregar GLB:', error)
);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Redimensionar
function resizeRenderer() {
  const container = document.getElementById("modelo3d");
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeRenderer);
resizeRenderer();

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
