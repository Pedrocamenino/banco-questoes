import type { Item, Skill } from '../core/types';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'literatura';

/* ---------- escolas literárias ---------- */
const ID_ESC = `${S}.escolas`;

const escolas: Item[] = [
  order(ID_ESC, 1, {
    stem: 'Ordene as escolas literárias brasileiras.',
    axis: 'mais antiga → mais recente',
    tokens: ['Romantismo', 'Barroco', 'Modernismo', 'Realismo', 'Arcadismo'],
    answer: [1, 4, 0, 3, 2],
    why: 'Barroco (séc. XVII) → Arcadismo (XVIII) → Romantismo (1836) → Realismo (1881) → Modernismo (1922).',
  }),
  classify(ID_ESC, 1, {
    stem: 'Separe cada característica pela escola a que pertence.',
    groups: ['Romantismo', 'Realismo'],
    things: [
      { t: 'Idealização da mulher amada', g: 0 },
      { t: 'Análise crítica das instituições sociais', g: 1 },
      { t: 'Herói nacional idealizado', g: 0 },
      { t: 'Narrador irônico e observador', g: 1 },
      { t: 'Subjetivismo e escapismo', g: 0 },
      { t: 'Determinismo e observação do meio', g: 1 },
    ],
    why: 'O Realismo nasce como resposta ao Romantismo: onde havia idealização, passa a haver análise; onde havia emoção, observação.',
  }),
  classify(ID_ESC, 2, {
    stem: 'Separe as características entre as duas escolas.',
    groups: ['Barroco', 'Arcadismo'],
    things: [
      { t: 'Cultismo e jogo de palavras', g: 0 },
      { t: 'Ideal de vida simples no campo', g: 1 },
      { t: 'Conflito entre fé e pecado', g: 0 },
      { t: 'Clareza e equilíbrio clássico', g: 1 },
      { t: 'Antíteses e paradoxos', g: 0 },
      { t: 'Pastor como persona poética', g: 1 },
    ],
    why: 'O Barroco é tensão e excesso; o Arcadismo, contenção e razão iluminista — "fugere urbem", "carpe diem", "aurea mediocritas".',
  }),
  mcq(ID_ESC, 2, {
    stem: 'A Semana de Arte Moderna de 1922 propôs:',
    options: [
      'A retomada dos modelos parnasianos.',
      'A ruptura com o academicismo e a busca de uma expressão brasileira.',
      'O retorno ao Romantismo indianista.',
      'O abandono da literatura em favor das artes plásticas.',
    ],
    answer: 1,
    why: 'Verso livre, linguagem coloquial, humor e temas nacionais contra a rigidez parnasiana — a primeira fase modernista é deliberadamente iconoclasta.',
  }),
  order(ID_ESC, 3, {
    stem: 'Sem citar datas: ordene os movimentos pela sua sucessão histórica.',
    axis: 'anterior → posterior',
    tokens: ['Parnasianismo', 'Simbolismo', 'Modernismo — 1ª fase', 'Naturalismo'],
    answer: [3, 0, 1, 2],
    why: 'Naturalismo (1881) e Parnasianismo (1882) convivem no fim do século XIX; o Simbolismo vem em 1893; o Modernismo, em 1922.',
  }),
  mcq(ID_ESC, 3, {
    stem: 'A geração de 1930 na prosa brasileira caracteriza-se por:',
    options: [
      'Romance regionalista e denúncia social, sobretudo do Nordeste.',
      'Poesia pura e formalismo.',
      'Retomada do indianismo romântico.',
      'Recusa de qualquer engajamento político.',
    ],
    answer: 0,
    why: 'Seca, migração, latifúndio e miséria ganham centralidade no romance de 30 — a experimentação de 22 dá lugar à denúncia.',
  }),
];

/* ---------- análise de trechos ---------- */
const ID_TRE = `${S}.trechos`;

const trechos: Item[] = [
  mcq(ID_TRE, 1, {
    stem: 'O trecho pertence a qual momento literário?',
    figure: {
      type: 'text',
      source: 'Castro Alves, O Navio Negreiro (1869) — domínio público',
      body: 'Senhor Deus dos desgraçados!\nDizei-me vós, Senhor Deus!\nSe é loucura... se é verdade\nTanto horror perante os céus?!',
    },
    options: ['Arcadismo', 'Romantismo — terceira geração (condoreira)', 'Parnasianismo', 'Barroco'],
    answer: 1,
    why: 'Tom grandiloquente, apóstrofe e denúncia social: é a poesia condoreira, voltada ao abolicionismo.',
  }),
  mcq(ID_TRE, 2, {
    stem: 'A caracterização do narrador no trecho indica:',
    figure: {
      type: 'text',
      source: 'Machado de Assis, Dom Casmurro (1899) — domínio público',
      body: 'Os olhos de Capitu... traziam não sei que fluido misterioso e enérgico, uma força que arrastava para dentro, como a vaga que se retira da praia, nos dias de ressaca.',
    },
    options: [
      'Um narrador neutro e confiável.',
      'Um narrador em primeira pessoa cuja interpretação dos fatos é parcial.',
      'Um narrador onisciente que revela os pensamentos de Capitu.',
      'Ausência de foco narrativo definido.',
    ],
    answer: 1,
    why: 'Quem descreve é Bentinho — e é sua leitura ciumenta que constrói a imagem de Capitu. O leitor só tem acesso à versão dele: é aí que mora a ambiguidade do romance.',
  }),
  mcq(ID_TRE, 2, {
    stem: 'A descrição do cortiço evidencia qual traço do Naturalismo?',
    figure: {
      type: 'text',
      source: 'Aluísio Azevedo, O Cortiço (1890) — domínio público',
      body: 'E naquela terra encharcada e fumegante, naquela umidade quente e lodosa, começou a minhocar, a esfervilhar, a crescer, um mundo, uma coisa viva, uma geração.',
    },
    options: [
      'Idealização do ambiente popular.',
      'Tratamento da coletividade como organismo determinado pelo meio.',
      'Foco na introspecção psicológica individual.',
      'Uso de linguagem rebuscada e culta.',
    ],
    answer: 1,
    why: 'Verbos de vida animal ("minhocar", "esfervilhar") e o cortiço como ser vivo: o Naturalismo trata o humano como produto do meio e do instinto.',
  }),
  mcq(ID_TRE, 3, {
    stem: 'O trecho sintetiza qual tensão central da obra?',
    figure: {
      type: 'text',
      source: 'Euclides da Cunha, Os Sertões (1902) — domínio público',
      body: 'O sertanejo é, antes de tudo, um forte. Não tem o raquitismo exaustivo dos mestiços neurastênicos do litoral.',
    },
    options: [
      'A convivência entre a admiração pelo sertanejo e o vocabulário determinista da época.',
      'A recusa completa das teorias científicas do século XIX.',
      'A idealização romântica do indígena.',
      'A defesa da campanha militar contra Canudos.',
    ],
    answer: 0,
    why: 'Euclides admira o sertanejo e, ao mesmo tempo, o descreve com as categorias racialistas que herdou. Essa contradição é o que torna o livro um documento do seu tempo.',
  }),
  mcq(ID_TRE, 3, {
    stem: 'Os versos exemplificam qual procedimento simbolista?',
    figure: {
      type: 'text',
      source: 'Cruz e Sousa, Broquéis (1893) — domínio público',
      body: 'Ó Formas alvas, brancas, Formas claras\nDe luares, de neves, de neblinas!...\nÓ Formas vagas, fluidas, cristalinas...\nIncensos dos turíbulos das aras...',
    },
    options: [
      'Musicalidade e sinestesia em lugar da descrição objetiva.',
      'Precisão descritiva parnasiana.',
      'Coloquialidade modernista.',
      'Narrativa em prosa poética.',
    ],
    answer: 0,
    why: 'Aliterações em /l/ e /v/, repetição e imagens que misturam sensações: o Simbolismo busca sugerir estados de alma, não descrever objetos.',
  }),
];

/* ---------- autores e obras ---------- */
const ID_AUT = `${S}.autores`;

const autores: Item[] = [
  pair(ID_AUT, 1, {
    stem: 'Relacione cada autor à sua obra.',
    leftLabel: 'Autor',
    rightLabel: 'Obra',
    left: ['Machado de Assis', 'José de Alencar', 'Aluísio Azevedo', 'Euclides da Cunha'],
    right: ['Iracema', 'Os Sertões', 'Memórias Póstumas de Brás Cubas', 'O Cortiço'],
    answer: [2, 0, 3, 1],
    why: 'Quatro marcos do século XIX: romantismo indianista, realismo machadiano, naturalismo e o relato-ensaio sobre Canudos.',
  }),
  pair(ID_AUT, 2, {
    stem: 'Relacione cada autor ao movimento a que é associado.',
    leftLabel: 'Autor',
    rightLabel: 'Movimento',
    left: ['Gregório de Matos', 'Tomás Antônio Gonzaga', 'Álvares de Azevedo', 'Olavo Bilac'],
    right: ['Romantismo — segunda geração', 'Barroco', 'Parnasianismo', 'Arcadismo'],
    answer: [1, 3, 0, 2],
    why: 'A segunda geração romântica é a ultrarromântica, do mal do século e da morte; o Parnasianismo é o culto à forma.',
  }),
  pair(ID_AUT, 3, {
    stem: 'Relacione cada autor do século XX à sua marca literária.',
    leftLabel: 'Autor',
    rightLabel: 'Marca',
    left: ['Graciliano Ramos', 'Guimarães Rosa', 'Clarice Lispector', 'Lima Barreto'],
    right: ['Invenção vocabular e sertão como território de linguagem', 'Prosa seca e análise impiedosa da miséria', 'Sátira dos subúrbios cariocas e da burocracia', 'Narrativa introspectiva e epifanias do cotidiano'],
    answer: [1, 0, 3, 2],
    why: 'Quatro projetos distintos: economia verbal, experimentação linguística, fluxo de consciência e crítica social irônica.',
  }),
  mcq(ID_AUT, 2, {
    stem: 'Memórias Póstumas de Brás Cubas inaugura o Realismo brasileiro porque:',
    options: [
      'Adota narrador defunto e ironia corrosiva sobre a elite.',
      'Idealiza o amor romântico.',
      'Descreve a natureza brasileira com exatidão.',
      'Narra a Guerra do Paraguai.',
    ],
    answer: 0,
    why: 'O defunto-autor liberta a narrativa do compromisso social e permite a ironia sobre a própria classe que narra.',
  }),
];

/* ---------- movimentos e contexto ---------- */
const ID_MOV = `${S}.movimentos`;

const movimentos: Item[] = [
  mcq(ID_MOV, 1, {
    stem: 'A Antropofagia modernista propunha:',
    options: [
      'Devorar criticamente a cultura estrangeira e reelaborá-la em chave brasileira.',
      'Rejeitar toda influência externa.',
      'Copiar fielmente os modelos europeus.',
      'Abandonar a língua portuguesa.',
    ],
    answer: 0,
    why: 'Nem cópia nem recusa: deglutição. O estrangeiro entra como alimento e sai transformado em matéria própria.',
  }),
  mcq(ID_MOV, 2, {
    stem: 'O Parnasianismo se define principalmente por:',
    options: [
      'Culto à forma, rigor métrico e objetividade descritiva.',
      'Verso livre e coloquialidade.',
      'Subjetivismo e escapismo.',
      'Denúncia social direta.',
    ],
    answer: 0,
    why: '"Arte pela arte": soneto perfeito, rima rica, vocabulário raro. É justamente o que o Modernismo iria atacar.',
  }),
  mcq(ID_MOV, 2, {
    stem: 'A literatura contemporânea brasileira caracteriza-se, entre outros traços, por:',
    options: [
      'Pluralidade de vozes, inclusive de autores periféricos e indígenas.',
      'Um único estilo dominante.',
      'Retorno integral ao Parnasianismo.',
      'Abandono da prosa.',
    ],
    answer: 0,
    why: 'Não há escola hegemônica: convivem autoficção, literatura marginal, poesia digital e narrativas indígenas e afro-brasileiras.',
  }),
  mcq(ID_MOV, 3, {
    stem: 'Dizer que o Romantismo brasileiro cumpriu função de construção nacional significa que:',
    options: [
      'Forneceu símbolos — indígena, natureza, passado — para a identidade do país recém-independente.',
      'Foi escrito por autores estrangeiros.',
      'Rejeitou qualquer temática nacional.',
      'Só tratou de temas urbanos.',
    ],
    answer: 0,
    why: 'Sem passado medieval para mitificar, o Brasil recém-independente elegeu o indígena como herói fundador — projeto ideológico, não apenas estético.',
  }),
];

export const LITERATURA: Skill[] = [
  skill(S, 'escolas', { name: 'Escolas literárias', blurb: 'Situar cada movimento no tempo e reconhecer suas marcas.', kind: 'classify', game: 'Triagem', bank: escolas }),
  skill(S, 'trechos', { name: 'Análise de trechos', blurb: 'Ler o texto e identificar procedimento, foco narrativo e efeito.', kind: 'mcq', game: 'Leitura', bank: trechos }),
  skill(S, 'autores', { name: 'Autores e obras', blurb: 'Ligar nome, obra e projeto literário.', kind: 'pair', game: 'Conexão', bank: autores }),
  skill(S, 'movimentos', { name: 'Contexto dos movimentos', blurb: 'Por que cada estética nasceu quando nasceu.', kind: 'mcq', game: 'Decisão', bank: movimentos }),
];
