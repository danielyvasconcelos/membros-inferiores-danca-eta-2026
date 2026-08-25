import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MUSCLE_CATALOG } from './muscleCatalog.js';

// Modelo "Myology" (Z-Anatomy): 283 nodes, cada estrutura anatômica já é um
// mesh separado (sem hitbox necessária), mas os nomes são genéricos
// (Object_2..Object_284) — a identificação vem do material (tipo de tecido)
// e, quando catalogado, de MUSCLE_CATALOG.

// Cor de reserva só para o caso raro de faltar baseColorFactor no glTF —
// os materiais originais (ex.: Muscles.001 ~ vermelho tecido) já vêm com cor.
const FALLBACK_COLORS = {
  'Muscles.001': 0xb23a3a,
  Bone: 0xe8e2d0,
  'Tendon.001': 0xcfcfcf,
  'Ligament.002': 0xf2f0d8,
  Cartilage: 0x9fd6d6,
  'Cartilage.001': 0x9fd6d6,
  'Cartilage.002': 0x9fd6d6,
  'Fat.001': 0xd9a066,
  'Fat.002': 0xd9a066,
  Teeth: 0xf0e6c8,
  Suture: 0xa0a0a0,
  'Eye.001': 0x828282,
  'Cornea.001': 0x111111,
  'Articular_capsule.002': 0x8f76cc,
  None: 0xcccccc,
};

export function loadMuscles(scene, onProgress) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load('./assets/muscles/scene.gltf', (gltf) => {
      const model = gltf.scene;
      const meshes = [];
      const materialNames = new Set();

      model.traverse((o) => {
        if (!o.isMesh) return;

        // clona o material por mesh: vários objetos compartilham a mesma
        // instância de material no glTF original, e precisamos poder
        // destacar/esconder cada um individualmente sem afetar os outros.
        const matName = o.material?.name || 'None';
        o.material = o.material ? o.material.clone() : new THREE.MeshStandardMaterial();
        if (!o.material.name) o.material.name = matName;
        if (o.material.color && o.material.color.r === 1 && o.material.color.g === 1 && o.material.color.b === 1) {
          o.material.color.setHex(FALLBACK_COLORS[matName] ?? 0xcccccc);
        }

        o.userData.materialName = matName;
        o.userData.catalog = MUSCLE_CATALOG[o.name] || null;
        materialNames.add(matName);
        meshes.push(o);
      });

      scene.add(model);
      resolve({ root: model, meshes, materialNames: Array.from(materialNames).sort() });
    }, onProgress, reject);
  });
}

export function setLayerVisibility(meshes, materialName, visible) {
  meshes.forEach((m) => {
    if (m.userData.materialName === materialName) m.visible = visible;
  });
}

export function setAllLayersVisible(meshes, visible) {
  meshes.forEach((m) => { m.visible = visible; });
}

// Destaque suporta um mesh só (clique normal) ou vários de uma vez
// (botão de grupo muscular, ex.: "Quadríceps" seleciona todos os objetos
// daquele grupo ao mesmo tempo).
let highlighted = []; // [{ mesh, originalHex }]

export function highlightMeshes(meshList) {
  clearHighlight();
  highlighted = meshList
    .filter((m) => m?.material?.emissive)
    .map((mesh) => {
      const originalHex = mesh.material.emissive.getHex();
      mesh.material.emissive.setHex(0x2f6f4f);
      return { mesh, originalHex };
    });
}

export function highlightMesh(mesh) {
  highlightMeshes(mesh ? [mesh] : []);
}

export function clearHighlight() {
  highlighted.forEach(({ mesh, originalHex }) => {
    mesh.material.emissive.setHex(originalHex);
  });
  highlighted = [];
}

export function lookupCatalog(mesh) {
  return MUSCLE_CATALOG[mesh.name] || null;
}

export function findMeshesByGroup(meshes, group) {
  return meshes.filter((m) => MUSCLE_CATALOG[m.name]?.group === group);
}

export function getGroupInfo(group) {
  const entry = Object.values(MUSCLE_CATALOG).find((e) => e.group === group);
  return entry ? { fact: entry.fact, cards: entry.cards } : null;
}
