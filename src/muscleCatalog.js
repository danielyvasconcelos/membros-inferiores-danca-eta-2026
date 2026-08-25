// Dicionário Object_ID -> nome anatômico + curiosidade.
// O modelo "Myology" não traz nomes internos, só Object_2..Object_284.
// Use o modo inspetor (botão "inspetor (d)" na aba Músculos): clique numa
// estrutura, veja o Object_ID e o material no painel, use "copiar Object_ID"
// e cole aqui a entrada correspondente.
//
// Exemplo:
// 'Object_142': {
//   name: 'Bíceps braquial',
//   fact: 'Flexiona o cotovelo e supina o antebraço — no ballet e nas danças de salão, ajuda a sustentar o port de bras.',
//   cards: [{ label: 'Na dança', points: [{ h: null, t: '...' }] }]
// },
//
// `cards` segue o mesmo formato usado no quadril do esqueleto: um ou mais
// mini cards, cada um com `label` e uma lista de `points` ({ h, t }, onde
// `h` é um subtítulo em negrito opcional e `t` o texto).

// As entradas abaixo foram identificadas por geometria (posição, tamanho,
// lado, profundidade frente/trás), sem confirmação visual em todas ainda.
// Onde a confiança não era alta, o nome ficou marcado como "(candidato)" —
// se ao conferir no app o objeto for outro músculo, é só corrigir aqui.

const gluteosFact = 'Extensão e rotação do quadril. Dão potência aos saltos e estabilizam a pelve em apoios unipodais. O glúteo é dividido em três partes: máximo, médio e mínimo.';
const gluteosCards = [
  {
    label: 'Importância na Dança',
    points: [
      { h: 'Estabilidade e Postura', t: 'O glúteo ajuda a manter o quadril encaixado e a coluna alinhada.' },
      { h: 'Rotação Externa', t: 'Em estilos como o balé clássico, a contração dos glúteos auxilia na abertura das pernas (en dehors).' }
    ]
  },
  {
    label: 'Impacto e Explosão',
    points: [
      { h: null, t: 'Estilos urbanos, dança do ventre e ritmos latinos exigem contrações isoladas e batidas de quadril que dependem diretamente dessa musculatura.' }
    ]
  },
  {
    label: 'Tonificação',
    points: [
      { h: null, t: 'A prática regular funciona como um exercício funcional, fortalecendo o glúteo máximo, médio e mínimo.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/gluteo.png',
    caption: 'Glúteo máximo, médio e mínimo — clique para ampliar'
  }
];

const adutoresFact = 'Localizados na parte interna da coxa, os adutores aproximam a perna em direção ao eixo do corpo. Fundamentais em passos com pernas cruzadas, giros e alongamentos como o grand écart.';
const adutoresCards = [
  {
    label: 'Importância na Dança',
    points: [
      { h: 'Estabilidade', t: 'Atuam como "seguranças" que evitam o desequilíbrio e mantêm a pelve alinhada.' },
      { h: 'Amplitude', t: 'Auxiliam em movimentos de abertura (como o grand battement ou aberturas de solo) e sustentação das pernas.' },
      { h: 'Prevenção de lesões', t: 'Músculos fortalecidos protegem a virilha e reduzem dores no quadril.' }
    ]
  },
  {
    label: 'Exercícios de Fortalecimento',
    points: [
      { h: 'Posição de borboleta', t: 'Deitado de barriga para cima, una a sola dos pés e abra os joelhos, fazendo leves aberturas.' },
      { h: 'Agachamento sumô', t: 'Promove rotação externa dos quadris e trabalha a força global da coxa.' },
      { h: 'Cadeira adutora', t: 'Ótima para isolar o grupamento muscular e controlar a carga de treino na academia.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/adutor.png',
    caption: 'Adutores da coxa — clique para ampliar'
  }
];

const quadricepsFact = 'Localizado na frente da coxa, o quadríceps estende o joelho. Sustenta agachamentos (plié), saltos e a fase de impulsão/aterrissagem.';
const quadricepsCards = [
  {
    label: 'Importância na Dança — Funções no Movimento',
    points: [
      { h: 'Impulso', t: 'Estica a perna com força para saltar do chão.' },
      { h: 'Aterrissagem', t: 'Controla a flexão do joelho para amortecer o peso do corpo com segurança.' },
      { h: 'Estabilidade', t: 'Mantém o joelho firme em posturas estáticas, giros e subidas em meia-ponta ou ponta.' }
    ]
  },
  {
    label: 'Como Cuidar do Quadríceps',
    points: [
      { h: 'Fortalecimento', t: 'Exercícios como agachamentos e afundos ajudam a dar mais potência e firmeza para as pernas.' },
      { h: 'Alongamento', t: 'Alongar a parte frontal da coxa evita o encurtamento muscular e melhora a mobilidade do quadril.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/quadriceps.png',
    caption: 'Reto femoral, vasto lateral, vasto medial e vasto intermédio — clique para ampliar'
  }
];

const isquiotibiaisFact = 'Localizados na parte posterior da coxa, os isquiotibiais flexionam o joelho e estendem o quadril. Trabalham junto ao quadríceps para equilibrar força e controlar descidas (contração excêntrica), evitando lesões no joelho.';
const isquiotibiaisCards = [
  {
    label: 'Importância na Dança',
    points: [
      { h: 'Estabilidade', t: 'Mantêm o alinhamento da pelve e protegem a articulação do joelho em giros e saltos.' },
      { h: 'Amplitude', t: 'Permitem elevações altas da perna (como développés e grand battements) e aberturas de perna (splits).' }
    ]
  },
  {
    label: 'Riscos e Lesões',
    points: [
      { h: 'Estiramentos', t: 'Acontecem em movimentos rápidos ou de alongamento extremo, comuns em splits forçados.' },
      { h: 'Sintomas', t: 'Dor súbita na parte de trás da coxa, inchaço ou dificuldade para apoiar o pé.' }
    ]
  },
  {
    label: 'Cuidados Essenciais',
    points: [
      { h: 'Fortalecimento', t: 'Exercícios como o stiff ajudam a dar suporte e prevenir lesões.' },
      { h: 'Aquecimento', t: 'Essencial antes de exigir grande amplitude dos músculos.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/isquiotibiais.png',
    caption: 'Isquiotibiais — parte posterior da coxa — clique para ampliar'
  }
];

const gastrocnemioFact = 'É o principal músculo da panturrilha, responsável pela flexão plantar — essencial para ficar na ponta dos pés (relevé) e impulsionar saltos.';
const gastrocnemioCards = [
  {
    label: 'Importância na Dança',
    points: [
      { h: 'Força e impulsão', t: 'Ajuda a empurrar o corpo para o alto em saltos e subidas rápidas.' },
      { h: 'Estabilidade', t: 'Trabalha intensamente em movimentos como o elevé e o relevé.' },
      { h: 'Ativação com joelho esticado', t: 'Funciona melhor quando a perna está reta, diferentemente do músculo sóleo (mais profundo), que atua com o joelho dobrado.' }
    ]
  },
  {
    label: 'Cuidados Importantes',
    points: [
      { h: 'Excesso de uso', t: 'Dançar muitas horas sem descanso pode sobrecarregar a região e machucar o tendão de Aquiles.' },
      { h: 'Alongamento', t: 'É essencial alongar a panturrilha após a aula para evitar dores e lesões.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/gastrocnemio.png',
    caption: 'Gastrocnêmio — cabeças medial e lateral — clique para ampliar'
  }
];

const tibialAnteriorFact = 'Localizado na frente da canela, o tibial anterior faz a flexão dorsal do pé — controla a descida do pé ao chão e ajuda no equilíbrio.';
const tibialAnteriorCards = [
  {
    label: 'Importância na Dança',
    points: [
      { h: 'Amortecimento', t: 'Absorve o impacto ao cair de saltos (allegro no ballet ou aterrissagens no contemporâneo).' },
      { h: 'Estabilidade do Arco', t: 'Ajuda a sustentar o arco plantar quando o pé está enraizado no chão.' },
      { h: 'Controle do Pé', t: 'Evita que o pé "desabe" ou bata no chão de forma brusca durante a passada ou transições.' }
    ]
  },
  {
    label: 'Problemas Comuns',
    points: [
      { h: 'Fadiga e Sobrecarga', t: 'Dançarinos frequentemente sentem dor ou queimação na frente da canela por excesso de ensaios ou pisos duros.' },
      { h: 'Confusão com Canelite', t: 'A dor direta no tibial anterior é fadiga muscular ou inflamação do tecido local, diferente da canelite tradicional (síndrome do estresse tibial medial), que afeta a borda interna da tíbia.' }
    ]
  },
  {
    label: 'Cuidados e Prevenção',
    points: [
      { h: 'Fortalecimento', t: 'Exercícios simples de levantar a ponta do pé contra uma leve resistência ajudam a blindar a região contra lesões.' },
      { h: 'Liberação Miofascial', t: 'Massagens suaves e deslizamentos na frente da tíbia aliviam a tensão acumulada após treinos intensos.' }
    ]
  },
  {
    type: 'image',
    label: 'Anatomia',
    src: './assets/images/tibial.png',
    caption: 'Tibial anterior — clique para ampliar'
  }
];

// `group` liga cada entrada a um botão de seleção em grupo na aba Músculos
// (ver GROUPS em index.html). Vários Object_ID podem compartilhar o mesmo
// group — o botão seleciona/destaca todos de uma vez.
export const MUSCLE_CATALOG = {
  // --- Gastrocnêmio — confirmado por você no app: somente Object_173.
  // (Object_219/207 removidos — eram um palpite geométrico que achei
  // confiável, mas você confirmou que não são o gastrocnêmio.) ---
  'Object_173': {
    name: 'Gastrocnêmio',
    group: 'gastrocnemio',
    fact: gastrocnemioFact,
    cards: gastrocnemioCards
  },

  // --- Tibial anterior — Object_200 CONFIRMADO ERRADO por você (não é o
  // tibial). Substituído por Object_161, que você identificou visualmente.
  // Atenção: a geometria de 161 também é estranha pra tibial anterior (dá
  // como "posterior" e com bounding box gigante, fracZ 0.05-0.81) — pode
  // ser que o mesh tenha geometria extra grudada. Reconfira se puder. ---
  'Object_161': {
    name: 'Tibial anterior (candidato, confirmado por você)',
    group: 'tibial-anterior',
    fact: tibialAnteriorFact,
    cards: tibialAnteriorCards
  },

  // --- Glúteos — máximo e médio confirmados visualmente por você;
  // mínimo é candidato por geometria (objeto pequeno, bilateral, logo
  // acima/profundo ao médio — mesma faixa de altura, volume compatível
  // com o menor dos três) ---
  'Object_115': {
    name: 'Glúteo máximo',
    group: 'gluteos',
    fact: gluteosFact,
    cards: gluteosCards
  },
  'Object_116': {
    name: 'Glúteo médio',
    group: 'gluteos',
    fact: gluteosFact,
    cards: gluteosCards
  },
  // Object_112 (candidato a glúteo mínimo) foi REMOVIDO: você reportou que
  // selecionar o grupo "Glúteos" destacava também os dois antebraços/mãos.
  // Pela altura (fracZ ~0.51-0.65, entrando na faixa do antebraço), esse é
  // o objeto responsável — o mesh dele parece incluir geometria extra além
  // do glúteo. Glúteo mínimo continua sem identificação confiável.

  // --- Adutores — confirmados por você no app. ---
  'Object_137': {
    name: 'Adutores da coxa',
    group: 'adutores',
    fact: adutoresFact,
    cards: adutoresCards
  },
  'Object_147': {
    name: 'Adutores da coxa',
    group: 'adutores',
    fact: adutoresFact,
    cards: adutoresCards
  },
  'Object_124': {
    name: 'Adutores da coxa',
    group: 'adutores',
    fact: adutoresFact,
    cards: adutoresCards
  },

  // --- Isquiotibiais — Object_124/117 REMOVIDOS daqui: você confirmou que
  // um dos dois na verdade destacava um músculo do braço (não deu pra saber
  // qual). Depois vimos que Object_124 é na verdade adutor (ver acima) —
  // Object_117 segue sem identificação. Substituídos pelos dois que você
  // identificou visualmente. ---
  'Object_191': {
    name: 'Isquiotibiais (candidato, confirmado por você)',
    group: 'isquiotibiais',
    fact: isquiotibiaisFact,
    cards: isquiotibiaisCards
  },
  'Object_145': {
    name: 'Isquiotibiais (candidato, confirmado por você)',
    group: 'isquiotibiais',
    fact: isquiotibiaisFact,
    cards: isquiotibiaisCards
  },

  // --- Quadríceps — confirmados por você no app. (A identificação inicial,
  // Object_101/118, estava errada — ficava na altura do peito, não da coxa;
  // foi substituída por esses quatro.) ---
  'Object_217': {
    name: 'Quadríceps femoral — esquerdo',
    group: 'quadriceps',
    fact: quadricepsFact,
    cards: quadricepsCards
  },
  'Object_216': {
    name: 'Quadríceps femoral — direito',
    group: 'quadriceps',
    fact: quadricepsFact,
    cards: quadricepsCards
  },
  'Object_180': {
    name: 'Quadríceps femoral — esquerdo',
    group: 'quadriceps',
    fact: quadricepsFact,
    cards: quadricepsCards
  },
  'Object_199': {
    name: 'Quadríceps femoral — esquerdo',
    group: 'quadriceps',
    fact: quadricepsFact,
    cards: quadricepsCards
  },
};
