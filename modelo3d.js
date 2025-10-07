// cena câmera e o render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
document.getElementById("modelo3d").appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

let object3D; 

//carregar
const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("models/Zil3d/");
mtlLoader.load("source.mtl", (materials) => {
  materials.preload();

  const objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("models/Zil3d/");
  objLoader.load("source.obj", (object) => {
    object.scale.set(4, 4, 4);

    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);

    object.position.sub(center); 

    //detecta orientação
    const size = new THREE.Vector3();
    box.getSize(size);

    if (size.y < size.x) {
      object.rotation.z = Math.PI / 2;
    } else if (size.y < size.z) {
      object.rotation.x = -Math.PI / 2;
    }

    const pivot = new THREE.Group();
    pivot.add(object);

    scene.add(pivot);
    object3D = pivot; 
  });

});

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

function animate() {
  requestAnimationFrame(animate);

  if (object3D) {
    object3D.rotation.y += 0.01; 
  }

  renderer.render(scene, camera);
}
animate();