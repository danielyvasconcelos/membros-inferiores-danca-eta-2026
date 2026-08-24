import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Malha única, sem divisão por osso — detecção de clique via caixas
// invisíveis (hitboxes) posicionadas por fração da altura total do modelo.
// Ajuste yFrom/yTo usando o modo inspetor (tecla "d") se necessário.
export const PARTS = [
  {
    id: 'quadril', name: 'Quadril (pelve)', side: 'both',
    yFrom: 0.50, yTo: 0.62,
    fact: 'A cintura pélvica é formada pela fusão de ílio, ísquio e púbis, unidos ao sacro e ao cóccix — a base que sustenta o tronco e transmite força aos membros inferiores. É o centro de força, equilíbrio e expressão do movimento: no samba de roda e no afro, o jogo de cintura e os isolamentos pélvicos nascem aqui; no ballet, o plié exige rotação externa do quadril; no hip hop e no dancehall, os isolamentos e quebras pélvicas dão ritmo e atitude à dança.'
  },
  {
    id: 'femur-esq', name: 'Fêmur (coxa) — esquerdo', side: 'left',
    yFrom: 0.30, yTo: 0.50,
    fact: 'O fêmur é o osso mais longo e mais resistente do corpo humano, movido pelo quadríceps (extensão do joelho) e pelos isquiotibiais (flexão do joelho e extensão do quadril). É a base da força nas pernas: nos battements do ballet, nos saltos e nos power moves do breaking, é a coxa que gera potência, amplitude e impulsão.'
  },
  {
    id: 'femur-dir', name: 'Fêmur (coxa) — direito', side: 'right',
    yFrom: 0.30, yTo: 0.50,
    fact: 'O fêmur é o osso mais longo e mais resistente do corpo humano, movido pelo quadríceps (extensão do joelho) e pelos isquiotibiais (flexão do joelho e extensão do quadril). É a base da força nas pernas: nos battements do ballet, nos saltos e nos power moves do breaking, é a coxa que gera potência, amplitude e impulsão.'
  },
  {
    id: 'joelho-esq', name: 'Joelho — esquerdo', side: 'left',
    yFrom: 0.27, yTo: 0.31,
    fact: 'O joelho é a maior articulação do corpo, protegido pela patela — o maior osso sesamoide, formado dentro de um tendão. Sua flexão e extensão sustentam o plié do ballet, os giros e os saltos: é aqui que o corpo absorve o impacto e gera o impulso para voos e quedas controladas.'
  },
  {
    id: 'joelho-dir', name: 'Joelho — direito', side: 'right',
    yFrom: 0.27, yTo: 0.31,
    fact: 'O joelho é a maior articulação do corpo, protegido pela patela — o maior osso sesamoide, formado dentro de um tendão. Sua flexão e extensão sustentam o plié do ballet, os giros e os saltos: é aqui que o corpo absorve o impacto e gera o impulso para voos e quedas controladas.'
  },
  {
    id: 'perna-esq', name: 'Tíbia e fíbula — esquerda', side: 'left',
    yFrom: 0.06, yTo: 0.27,
    fact: 'A tíbia sustenta a maior parte do peso do corpo, enquanto a fíbula, mais fina, estabiliza o tornozelo. Juntas garantem a firmeza e a agilidade dos passos: no frevo, permitem a rapidez das pernas; na catira, resistem às batidas marcadas dos pés; no forró, sustentam a ginga e os deslocamentos laterais.'
  },
  {
    id: 'perna-dir', name: 'Tíbia e fíbula — direita', side: 'right',
    yFrom: 0.06, yTo: 0.27,
    fact: 'A tíbia sustenta a maior parte do peso do corpo, enquanto a fíbula, mais fina, estabiliza o tornozelo. Juntas garantem a firmeza e a agilidade dos passos: no frevo, permitem a rapidez das pernas; na catira, resistem às batidas marcadas dos pés; no forró, sustentam a ginga e os deslocamentos laterais.'
  },
  {
    id: 'tornozelo-esq', name: 'Tornozelo — esquerdo', side: 'left',
    yFrom: 0.03, yTo: 0.065,
    fact: 'O tornozelo é formado por tíbia, fíbula e tálus, permitindo a flexão dorsal e plantar do pé. É essencial para a fluidez do movimento: no zouk e nas danças de salão, garante ondas e conexão; no ballet, sustenta o trabalho de ponta e a elevação do corpo.'
  },
  {
    id: 'tornozelo-dir', name: 'Tornozelo — direito', side: 'right',
    yFrom: 0.03, yTo: 0.065,
    fact: 'O tornozelo é formado por tíbia, fíbula e tálus, permitindo a flexão dorsal e plantar do pé. É essencial para a fluidez do movimento: no zouk e nas danças de salão, garante ondas e conexão; no ballet, sustenta o trabalho de ponta e a elevação do corpo.'
  },
  {
    id: 'pe-esq', name: 'Pé — esquerdo', side: 'left',
    yFrom: 0.0, yTo: 0.035,
    fact: 'Cada pé tem 26 ossos — tarso, metatarso e falanges —, somando mais de um quarto de todos os ossos do corpo humano, além de 33 articulações. É a base de apoio, equilíbrio e impulsão da dança: no frevo e na catira, os pés marcam o ritmo com agilidade e precisão; em qualquer estilo, é dali que nasce o salto e o giro.'
  },
  {
    id: 'pe-dir', name: 'Pé — direito', side: 'right',
    yFrom: 0.0, yTo: 0.035,
    fact: 'Cada pé tem 26 ossos — tarso, metatarso e falanges —, somando mais de um quarto de todos os ossos do corpo humano, além de 33 articulações. É a base de apoio, equilíbrio e impulsão da dança: no frevo e na catira, os pés marcam o ritmo com agilidade e precisão; em qualquer estilo, é dali que nasce o salto e o giro.'
  },
  {
    id: 'coluna-lombar', name: 'Coluna lombar', side: 'both',
    yFrom: 0.58, yTo: 0.665,
    fact: 'A coluna lombar tem 5 vértebras e sustenta a maior parte do peso da parte superior do corpo — por isso é a região mais comum de dores nas costas.'
  },
  {
    id: 'caixa-toracica', name: 'Caixa torácica e coluna torácica', side: 'both',
    yFrom: 0.665, yTo: 0.83,
    fact: 'A caixa torácica é formada por 12 pares de costelas presas à coluna torácica e, na maioria dos casos, ao esterno na frente. Ela protege o coração e os pulmões.'
  },
  {
    id: 'mao-esq', name: 'Mão — esquerda', side: 'left',
    yFrom: 0.47, yTo: 0.545,
    fact: 'Cada mão tem 27 ossos — mais do que qualquer outra parte do corpo em relação ao tamanho. Isso permite a incrível variedade de movimentos finos que os dedos conseguem fazer.'
  },
  {
    id: 'mao-dir', name: 'Mão — direita', side: 'right',
    yFrom: 0.47, yTo: 0.545,
    fact: 'Cada mão tem 27 ossos — mais do que qualquer outra parte do corpo em relação ao tamanho. Isso permite a incrível variedade de movimentos finos que os dedos conseguem fazer.'
  },
  {
    id: 'antebraco-esq', name: 'Antebraço (rádio e ulna) — esquerdo', side: 'left',
    yFrom: 0.545, yTo: 0.68,
    fact: 'O antebraço tem dois ossos, rádio e ulna, que giram um sobre o outro — é esse movimento que permite virar a palma da mão pra cima ou pra baixo (pronação e supinação).'
  },
  {
    id: 'antebraco-dir', name: 'Antebraço (rádio e ulna) — direito', side: 'right',
    yFrom: 0.545, yTo: 0.68,
    fact: 'O antebraço tem dois ossos, rádio e ulna, que giram um sobre o outro — é esse movimento que permite virar a palma da mão pra cima ou pra baixo (pronação e supinação).'
  },
  {
    id: 'braco-esq', name: 'Braço (úmero) — esquerdo', side: 'left',
    yFrom: 0.68, yTo: 0.815,
    fact: 'O úmero é o osso do braço e o terceiro mais longo do corpo. Seu extremo superior encaixa no ombro numa articulação esférica, a mais móvel do corpo humano.'
  },
  {
    id: 'braco-dir', name: 'Braço (úmero) — direito', side: 'right',
    yFrom: 0.68, yTo: 0.815,
    fact: 'O úmero é o osso do braço e o terceiro mais longo do corpo. Seu extremo superior encaixa no ombro numa articulação esférica, a mais móvel do corpo humano.'
  },
  {
    id: 'ombros', name: 'Ombros (clavícula e escápula)', side: 'both',
    yFrom: 0.795, yTo: 0.845,
    fact: 'A clavícula é o único osso longo do corpo que fica quase na horizontal, e é também o osso mais frequentemente fraturado — comum em quedas ou impactos no ombro.'
  },
  {
    id: 'pescoco', name: 'Pescoço (vértebras cervicais)', side: 'both',
    yFrom: 0.845, yTo: 0.885,
    fact: 'O pescoço tem 7 vértebras cervicais — a mesma quantidade que uma girafa tem, só que muito maiores nela. É a região mais móvel da coluna.'
  },
  {
    id: 'cranio', name: 'Crânio', side: 'both',
    yFrom: 0.885, yTo: 1.0,
    fact: 'O crânio de um adulto é formado por 22 ossos, a maioria unidos por articulações fixas chamadas suturas. Ao nascer, esses ossos ainda não estão totalmente fundidos, o que permite a passagem pelo canal do parto.'
  },
];

export function loadSkeleton(scene, onProgress) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load('./assets/skeleton/scene.gltf', (gltf) => {
      const model = gltf.scene;

      // material neutro tipo osso, funciona sem texturas
      model.traverse((o) => {
        if (o.isMesh) {
          o.material = new THREE.MeshStandardMaterial({
            color: 0xe8e2d0, roughness: 0.85, metalness: 0.05
          });
        }
      });

      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const minY = box.min.y, maxY = box.max.y, height = maxY - minY;
      const minX = box.min.x, maxX = box.max.x, cx = (minX + maxX) / 2;
      const minZ = box.min.z, maxZ = box.max.z;

      const helperMat = new THREE.MeshBasicMaterial({
        color: 0x7fd0a8, transparent: true, opacity: 0
      });

      const hitboxes = [];
      PARTS.forEach((part) => {
        const yFrom = minY + height * part.yFrom;
        const yTo = minY + height * part.yFrom + (height * (part.yTo - part.yFrom));
        let xFrom = minX, xTo = maxX;
        if (part.side === 'left') { xFrom = cx; xTo = maxX; }
        if (part.side === 'right') { xFrom = minX; xTo = cx; }

        const w = xTo - xFrom;
        const h = yTo - yFrom;
        const d = (maxZ - minZ) * 1.4;

        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, helperMat.clone());
        mesh.position.set(xFrom + w / 2, yFrom + h / 2, (minZ + maxZ) / 2);
        mesh.userData.part = part;
        scene.add(mesh);
        hitboxes.push(mesh);
      });

      resolve({ root: model, hitboxes, box });
    }, onProgress, reject);
  });
}

export function pickSkeletonPart(hits) {
  if (!hits.length) return null;
  return hits[0].object.userData.part;
}
