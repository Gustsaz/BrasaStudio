import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
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
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 🚀 Cubo de teste (sempre aparece)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Carregar modelo GLB
const loader = new GLTFLoader();
console.log("Tentando carregar GLB...");

loader.load(
  'Zil3d.glb', // confere se o arquivo realmente está na raiz do /models ou junto ao index.html
  (gltf) => {
    console.log("GLB carregado!");
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => console.error('❌ Erro ao carregar GLB:', error)
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
  cube.rotation.y += 0.01; // gira o cubo para teste
  controls.update();
  renderer.render(scene, camera);
}
animate();
