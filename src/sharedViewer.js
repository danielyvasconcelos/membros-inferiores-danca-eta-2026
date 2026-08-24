import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cena, câmera, luzes, controls e raycaster compartilhados entre as abas
// "Esqueleto" e "Músculos". Cada view module (skeletonView.js, muscleView.js)
// adiciona seu próprio modelo a `scene` e alterna `.visible` ao trocar de aba.
export function createViewer(wrap) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x14151a);

  const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.01, 5000);
  camera.position.set(0, 1.5, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  wrap.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(2, 4, 3);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-2, 1, -3);
  scene.add(fill);

  window.addEventListener('resize', () => {
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function pickAt(clientX, clientY, targets) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(targets, false);
  }

  // Enquadra a câmera num objeto qualquer, independente da escala (cm ou metros).
  function frameOnObject(object3D, opts = {}) {
    const box = new THREE.Box3().setFromObject(object3D);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) || 1;
    const dist = radius * (opts.distanceMul ?? 1.4);

    const targetCenter = center.clone();
    targetCenter.y = box.min.y + size.y * (opts.targetHeightFrac ?? 0.5);
    controls.target.copy(targetCenter);

    camera.position.set(
      center.x + radius * 0.15,
      box.min.y + size.y * (opts.cameraHeightFrac ?? 0.55),
      center.z + dist
    );
    camera.near = Math.max(0.001, dist / 200);
    camera.far = dist * 30;
    camera.updateProjectionMatrix();
    controls.update();
    return box;
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return { THREE, scene, camera, renderer, controls, raycaster, pickAt, frameOnObject };
}

// ---------- painel de informação (compartilhado pelas duas abas) ----------
export function openInfoPanel(title, fact) {
  document.getElementById('info-title').textContent = title;
  document.getElementById('info-fact').textContent = fact;
  document.getElementById('info-panel').classList.add('open');
}

export function closeInfoPanel() {
  document.getElementById('info-panel').classList.remove('open');
}
