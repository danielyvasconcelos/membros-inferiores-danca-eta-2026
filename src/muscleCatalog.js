// Dicionário Object_ID -> nome anatômico + curiosidade.
// O modelo "Myology" não traz nomes internos, só Object_2..Object_284.
// Use o modo inspetor (botão "inspetor (d)" na aba Músculos): clique numa
// estrutura, veja o Object_ID e o material no painel, use "copiar Object_ID"
// e cole aqui a entrada correspondente.
//
// Exemplo:
// 'Object_142': {
//   name: 'Bíceps braquial',
//   fact: 'Flexiona o cotovelo e supina o antebraço — no ballet e nas danças de salão, ajuda a sustentar o port de bras.'
// },

// As entradas abaixo foram identificadas por geometria (posição, tamanho,
// lado, profundidade frente/trás), sem confirmação visual ainda. Onde a
// confiança não era alta, o nome ficou marcado como "(candidato)" — se ao
// conferir no app o objeto for outro músculo, é só corrigir aqui.

const isquiotibiaisFact = 'Localizados na parte posterior da coxa (bíceps femoral, semitendíneo e semimembranoso), fazem a flexão do joelho e a extensão do quadril. Junto com o quadríceps, atuam no amortecimento da queda dos saltos, protegendo joelhos e tornozelos — o equilíbrio entre os dois grupos previne lesões comuns em bailarinos, como as no LCA (ligamento cruzado anterior).';

const gluteoMedioMinimoFact = 'Os glúteos médio e mínimo abduzem o quadril e estabilizam a pelve. Junto com os adutores, mantêm o alinhamento do corpo em apoios unipodais (sobre uma perna só) — essenciais em giros e posições como o attitude.';

const adutoresFact = 'Localizados na face interna da coxa (grácil, pectíneo, adutor longo, curto e magno), aproximam a perna em direção à linha média do corpo. São estabilizadores essenciais em giros e apoios unipodais, e sua flexibilidade permite maior amplitude em posições como o grand écart (espacate).';

export const MUSCLE_CATALOG = {
  // --- Gastrocnêmio — par identificado com alta confiança (posterior,
  // altura da panturrilha, simetria quase perfeita entre os dois lados) ---
  'Object_219': {
    name: 'Gastrocnêmio (lado B)',
    fact: 'O gastrocnêmio é o principal músculo da panturrilha, responsável pela flexão plantar do pé — o movimento de empinar-se na ponta dos pés (relevé). Junto com o quadríceps, é fundamental na fase de impulsão dos saltos, e sua explosão de força define a altura e a leveza do salto na dança.'
  },
  'Object_207': {
    name: 'Gastrocnêmio (lado A)',
    fact: 'O gastrocnêmio é o principal músculo da panturrilha, responsável pela flexão plantar do pé — o movimento de empinar-se na ponta dos pés (relevé). Junto com o quadríceps, é fundamental na fase de impulsão dos saltos, e sua explosão de força define a altura e a leveza do salto na dança.'
  },

  // --- Tibial anterior — só um lado identificado com confiança razoável ---
  'Object_200': {
    name: 'Tibial anterior (candidato)',
    fact: 'O tibial anterior fica na parte frontal da perna (canela) e faz a dorsiflexão do pé — levantar a ponta do pé do chão. Em giros e apoios, ajuda a controlar o contato do pé com o solo e a estabilidade do tornozelo.'
  },

  // --- Glúteos ---
  'Object_156': {
    name: 'Glúteo máximo',
    fact: 'O glúteo máximo é o maior e mais potente músculo do corpo, responsável pela extensão do quadril. Na dança, sustenta o peso do corpo em posições estáticas e dinâmicas como o plié e o relevé, e atua com os isquiotibiais e o core para manter o alinhamento da pelve e da coluna durante o movimento.'
  },
  'Object_135': {
    name: 'Glúteo médio (candidato)',
    fact: gluteoMedioMinimoFact
  },
  'Object_112': {
    name: 'Glúteo mínimo (candidato)',
    fact: gluteoMedioMinimoFact
  },

  // --- Adutores ---
  'Object_199': {
    name: 'Adutores da coxa (candidato)',
    fact: adutoresFact
  },
  'Object_130': {
    name: 'Adutores da coxa — próximo à virilha (candidato)',
    fact: adutoresFact
  },

  // --- Isquiotibiais ---
  'Object_124': {
    name: 'Isquiotibiais (grupo, candidato)',
    fact: isquiotibiaisFact
  },
  'Object_117': {
    name: 'Bíceps femoral (candidato — porção lateral dos isquiotibiais)',
    fact: isquiotibiaisFact
  },

  // --- Quadríceps — porção de maior volume identificada entre a região
  // anterior da coxa (par mais confiável dentre ~8 candidatos na mesma
  // faixa de altura; os demais não entraram no catálogo por falta de
  // confiança — ver README/histórico da análise para a lista completa:
  // Object_203/204, 211/212, 105/122, 103/120, 104/121, 106/123, 176/177) ---
  'Object_101': {
    name: 'Quadríceps femoral (candidato)',
    fact: 'O quadríceps é formado por quatro músculos na parte frontal da coxa (reto femoral, vasto lateral, vasto medial e vasto intermédio) e faz a extensão do joelho. É fundamental na fase de impulsão dos saltos e, junto aos isquiotibiais, no amortecimento da queda — a base de sustentação do plié e do relevé.'
  },
  'Object_118': {
    name: 'Quadríceps femoral (candidato)',
    fact: 'O quadríceps é formado por quatro músculos na parte frontal da coxa (reto femoral, vasto lateral, vasto medial e vasto intermédio) e faz a extensão do joelho. É fundamental na fase de impulsão dos saltos e, junto aos isquiotibiais, no amortecimento da queda — a base de sustentação do plié e do relevé.'
  },
};
