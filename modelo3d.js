// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  1,
  0.1,
  1000
);

// Define a posição inicial exata da câmera
camera.position.set(-5.08, 0.25, 0.32);

// Define a rotação exata
camera.rotation.set(-0.66, -1.49, -0.66);

// Faz a câmera olhar para o ponto central do modelo
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(400, 400); // <--- aqui estava
document.getElementById("modelo3d").appendChild(renderer.domElement);

console.log("Renderer anexado em #modelo3d:", renderer.domElement);


// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Carregar modelo 3D
const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("models/Zil3d/"); // pasta onde está tudo
mtlLoader.load("tripo_convert_40013212-5b4a-452c-9707-41ed41408f9a.mtl", (materials) => {
  materials.preload();

  const objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("models/Zil3d/");
  objLoader.load("tripo_convert_40013212-5b4a-452c-9707-41ed41408f9a.obj", (object) => {
    object.scale.set(4, 4, 4); // ajuste conforme necessário
    object.position.set(0, 0, 0);

    scene.add(object);
  });
});


// Controles de rotação
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;   // bloqueia zoom
controls.enablePan = false;    // opcional: bloqueia arrastar

controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.set(0, 1, 5); // centraliza verticalmente e horizontalmente
camera.lookAt(0, 0, 0);

controls.minPolarAngle = Math.PI / 2.2; // trava vertical para não olhar de cima
controls.maxPolarAngle = Math.PI / 2;   // trava vertical para não olhar de baixo
controls.target.set(0, 0, 0);
controls.update();



// Redimensionar automaticamente
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