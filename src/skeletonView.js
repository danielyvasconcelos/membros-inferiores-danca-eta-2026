import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Malha única, sem divisão por osso — detecção de clique via caixas
// invisíveis (hitboxes) posicionadas por fração da altura total do modelo.
// Ajuste yFrom/yTo usando o modo inspetor (tecla "d") se necessário.
//
// `group` junta os pares esquerdo/direito (e partes "both") pros botões de
// atalho na aba Esqueleto — ver SKELETON_GROUPS em index.html.

const ARTICULACAO_QUADRIL_FACT = 'A articulação coxofemoral é do tipo esfera e soquete — a cabeça do fêmur encaixa no acetábulo da pelve. É a segunda articulação mais móvel do corpo (depois do ombro), permitindo flexão, extensão, rotação, abdução e adução.';
const ARTICULACAO_QUADRIL_DANCE = 'No ballet, é a amplitude de rotação externa dessa articulação que define o turnout (en dehors); em battements e développés, é ela que sustenta a perna em extensões altas.';

const FEMUR_FACT = 'O fêmur é o osso mais longo e mais resistente do corpo humano, movido pelo quadríceps (extensão do joelho) e pelos isquiotibiais (flexão do joelho e extensão do quadril).';
const FEMUR_DANCE = 'É a base da força nas pernas: nos battements do ballet, nos saltos e nos power moves do breaking, é a coxa que gera potência, amplitude e impulsão.';

const JOELHO_FACT = 'O joelho é a maior articulação do corpo — a tíbio-femoral (entre fêmur e tíbia) e a patelar (entre fêmur e patela) trabalhando juntas. A patela, maior osso sesamoide do corpo, se forma dentro de um tendão pra proteger a articulação.';
const JOELHO_DANCE = 'Sua flexão e extensão sustentam o plié do ballet, os giros e os saltos: é aqui que o corpo absorve o impacto e gera o impulso para voos e quedas controladas.';

const PERNA_FACT = 'A tíbia sustenta a maior parte do peso do corpo, enquanto a fíbula, mais fina, estabiliza o tornozelo.';
const PERNA_DANCE = 'Juntas garantem a firmeza e a agilidade dos passos: no frevo, permitem a rapidez das pernas; na catira, resistem às batidas marcadas dos pés; no forró, sustentam a ginga e os deslocamentos laterais.';

const TORNOZELO_FACT = 'O tornozelo é formado por tíbia, fíbula e tálus, permitindo a flexão dorsal e plantar do pé.';
const TORNOZELO_DANCE = 'É essencial para a fluidez do movimento: no zouk e nas danças de salão, garante ondas e conexão; no ballet, sustenta o trabalho de ponta e a elevação do corpo.';

const PE_FACT = 'Cada pé tem 26 ossos — tarso, metatarso e falanges —, somando mais de um quarto de todos os ossos do corpo humano, além de 33 articulações.';
const PE_DANCE = 'É a base de apoio, equilíbrio e impulsão da dança: no frevo e na catira, os pés marcam o ritmo com agilidade e precisão; em qualquer estilo, é dali que nasce o salto e o giro.';

function danceCard(text) {
  return { label: 'Na dança', points: [{ h: null, t: text }] };
}

function danceImageCard(src, caption) {
  return { type: 'image', label: 'Na dança', src, caption };
}

export const PARTS = [
  {
    id: 'quadril', name: 'Quadril (pelve)', side: 'both', group: 'quadril',
    yFrom: 0.53, yTo: 0.62,
    fact: 'A cintura pélvica é formada pela fusão de ílio, ísquio e púbis, unidos ao sacro e ao cóccix — a base que sustenta o tronco e transmite força aos membros inferiores.',
    cards: [
      {
        label: 'Na dança',
        points: [
          { h: null, t: 'É o centro de força, equilíbrio e expressão do movimento: no samba de roda e no afro, o jogo de cintura e os isolamentos pélvicos nascem aqui; no ballet, o plié exige rotação externa do quadril; no hip hop e no dancehall, os isolamentos e quebras pélvicas dão ritmo e atitude à dança.' }
        ]
      },
      {
        type: 'image',
        label: 'Na dança',
        src: './assets/images/plie.png',
        caption: 'Plié — rotação externa do quadril, em cinco posições dos pés'
      },
      {
        type: 'image',
        label: 'Anatomia',
        src: './assets/images/quadril.png',
        caption: 'Estrutura da cintura pélvica — clique para ampliar'
      }
    ]
  },
  {
    id: 'articulacao-quadril-esq', name: 'Articulação do quadril — esquerda (coxofemoral)', side: 'left', group: 'articulacao-quadril',
    yFrom: 0.48, yTo: 0.53,
    fact: ARTICULACAO_QUADRIL_FACT,
    cards: [danceCard(ARTICULACAO_QUADRIL_DANCE), danceImageCard('./assets/images/articulacao-quadril-danca.png', 'Articulação do quadril em ação')]
  },
  {
    id: 'articulacao-quadril-dir', name: 'Articulação do quadril — direita (coxofemoral)', side: 'right', group: 'articulacao-quadril',
    yFrom: 0.48, yTo: 0.53,
    fact: ARTICULACAO_QUADRIL_FACT,
    cards: [danceCard(ARTICULACAO_QUADRIL_DANCE), danceImageCard('./assets/images/articulacao-quadril-danca.png', 'Articulação do quadril em ação')]
  },
  {
    id: 'femur-esq', name: 'Fêmur (coxa) — esquerdo', side: 'left', group: 'femur',
    yFrom: 0.335, yTo: 0.48,
    fact: FEMUR_FACT,
    cards: [danceCard(FEMUR_DANCE), danceImageCard('./assets/images/femur-danca.png', 'Força do fêmur em ação')]
  },
  {
    id: 'femur-dir', name: 'Fêmur (coxa) — direito', side: 'right', group: 'femur',
    yFrom: 0.335, yTo: 0.48,
    fact: FEMUR_FACT,
    cards: [danceCard(FEMUR_DANCE), danceImageCard('./assets/images/femur-danca.png', 'Força do fêmur em ação')]
  },
  {
    id: 'joelho-esq', name: 'Articulação do joelho — esquerda (tíbio-femoral e patelar)', side: 'left', group: 'joelho',
    yFrom: 0.27, yTo: 0.335,
    fact: JOELHO_FACT,
    cards: [danceCard(JOELHO_DANCE), danceImageCard('./assets/images/articulacao-joelho-danca.png', 'Articulação do joelho em ação')]
  },
  {
    id: 'joelho-dir', name: 'Articulação do joelho — direita (tíbio-femoral e patelar)', side: 'right', group: 'joelho',
    yFrom: 0.27, yTo: 0.335,
    fact: JOELHO_FACT,
    cards: [danceCard(JOELHO_DANCE), danceImageCard('./assets/images/articulacao-joelho-danca.png', 'Articulação do joelho em ação')]
  },
  {
    id: 'perna-esq', name: 'Tíbia e fíbula — esquerda', side: 'left', group: 'perna',
    yFrom: 0.06, yTo: 0.27,
    fact: PERNA_FACT,
    cards: [danceCard(PERNA_DANCE)]
  },
  {
    id: 'perna-dir', name: 'Tíbia e fíbula — direita', side: 'right', group: 'perna',
    yFrom: 0.06, yTo: 0.27,
    fact: PERNA_FACT,
    cards: [danceCard(PERNA_DANCE)]
  },
  {
    id: 'tornozelo-esq', name: 'Articulação do pé — esquerda (tíbio-társica)', side: 'left', group: 'tornozelo',
    yFrom: 0.03, yTo: 0.065,
    fact: TORNOZELO_FACT,
    cards: [danceCard(TORNOZELO_DANCE), danceImageCard('./assets/images/pe-tornozelo-danca.png', 'Pé e tornozelo em relevé')]
  },
  {
    id: 'tornozelo-dir', name: 'Articulação do pé — direita (tíbio-társica)', side: 'right', group: 'tornozelo',
    yFrom: 0.03, yTo: 0.065,
    fact: TORNOZELO_FACT,
    cards: [danceCard(TORNOZELO_DANCE), danceImageCard('./assets/images/pe-tornozelo-danca.png', 'Pé e tornozelo em relevé')]
  },
  {
    id: 'pe-esq', name: 'Pé — esquerdo', side: 'left', group: 'pe',
    yFrom: 0.0, yTo: 0.035,
    fact: PE_FACT,
    cards: [danceCard(PE_DANCE)]
  },
  {
    id: 'pe-dir', name: 'Pé — direito', side: 'right', group: 'pe',
    yFrom: 0.0, yTo: 0.035,
    fact: PE_FACT,
    cards: [danceCard(PE_DANCE)]
  },
  {
    id: 'coluna-lombar', name: 'Coluna lombar', side: 'both', group: 'coluna-lombar',
    yFrom: 0.58, yTo: 0.665,
    fact: 'A coluna lombar tem 5 vértebras e sustenta a maior parte do peso da parte superior do corpo — por isso é a região mais comum de dores nas costas.'
  },
  {
    id: 'caixa-toracica', name: 'Caixa torácica e coluna torácica', side: 'both', group: 'caixa-toracica',
    yFrom: 0.665, yTo: 0.83,
    fact: 'A caixa torácica é formada por 12 pares de costelas presas à coluna torácica e, na maioria dos casos, ao esterno na frente. Ela protege o coração e os pulmões.'
  },
  {
    id: 'mao-esq', name: 'Mão — esquerda', side: 'left', group: 'mao',
    yFrom: 0.47, yTo: 0.545,
    fact: 'Cada mão tem 27 ossos — mais do que qualquer outra parte do corpo em relação ao tamanho. Isso permite a incrível variedade de movimentos finos que os dedos conseguem fazer.'
  },
  {
    id: 'mao-dir', name: 'Mão — direita', side: 'right', group: 'mao',
    yFrom: 0.47, yTo: 0.545,
    fact: 'Cada mão tem 27 ossos — mais do que qualquer outra parte do corpo em relação ao tamanho. Isso permite a incrível variedade de movimentos finos que os dedos conseguem fazer.'
  },
  {
    id: 'antebraco-esq', name: 'Antebraço (rádio e ulna) — esquerdo', side: 'left', group: 'antebraco',
    yFrom: 0.545, yTo: 0.68,
    fact: 'O antebraço tem dois ossos, rádio e ulna, que giram um sobre o outro — é esse movimento que permite virar a palma da mão pra cima ou pra baixo (pronação e supinação).'
  },
  {
    id: 'antebraco-dir', name: 'Antebraço (rádio e ulna) — direito', side: 'right', group: 'antebraco',
    yFrom: 0.545, yTo: 0.68,
    fact: 'O antebraço tem dois ossos, rádio e ulna, que giram um sobre o outro — é esse movimento que permite virar a palma da mão pra cima ou pra baixo (pronação e supinação).'
  },
  {
    id: 'braco-esq', name: 'Braço (úmero) — esquerdo', side: 'left', group: 'braco',
    yFrom: 0.68, yTo: 0.815,
    fact: 'O úmero é o osso do braço e o terceiro mais longo do corpo. Seu extremo superior encaixa no ombro numa articulação esférica, a mais móvel do corpo humano.'
  },
  {
    id: 'braco-dir', name: 'Braço (úmero) — direito', side: 'right', group: 'braco',
    yFrom: 0.68, yTo: 0.815,
    fact: 'O úmero é o osso do braço e o terceiro mais longo do corpo. Seu extremo superior encaixa no ombro numa articulação esférica, a mais móvel do corpo humano.'
  },
  {
    id: 'ombros', name: 'Ombros (clavícula e escápula)', side: 'both', group: 'ombros',
    yFrom: 0.795, yTo: 0.845,
    fact: 'A clavícula é o único osso longo do corpo que fica quase na horizontal, e é também o osso mais frequentemente fraturado — comum em quedas ou impactos no ombro.'
  },
  {
    id: 'pescoco', name: 'Pescoço (vértebras cervicais)', side: 'both', group: 'pescoco',
    yFrom: 0.845, yTo: 0.885,
    fact: 'O pescoço tem 7 vértebras cervicais — a mesma quantidade que uma girafa tem, só que muito maiores nela. É a região mais móvel da coluna.'
  },
  {
    id: 'cranio', name: 'Crânio', side: 'both', group: 'cranio',
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

// Botões de atalho por grupo (ex.: "Fêmur" pega femur-esq + femur-dir de
// uma vez). Como o esqueleto é malha única, não dá pra "pintar" a região —
// o atalho abre o painel de info/cards e leva a câmera até lá.
export function findHitboxesByGroup(hitboxes, group) {
  return hitboxes.filter((h) => h.userData.part.group === group);
}

export function getSkeletonGroupInfo(group) {
  const part = PARTS.find((p) => p.group === group);
  return part ? { name: part.name.replace(/ — (esquerd|direit)[ao].*$/i, ''), fact: part.fact, cards: part.cards } : null;
}
