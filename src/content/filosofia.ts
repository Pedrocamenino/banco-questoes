import type { Item, Skill } from '../core/types';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'filosofia';

const ID_CONC = `${S}.conceitos`;

const conceitos: Item[] = [
  pair(ID_CONC, 1, {
    stem: 'Relacione cada conceito à sua definição.',
    leftLabel: 'Conceito',
    rightLabel: 'Definição',
    left: ['Ética', 'Política', 'Epistemologia', 'Metafísica'],
    right: ['Estudo das condições e limites do conhecimento', 'Reflexão sobre os princípios que orientam a ação', 'Investigação sobre a natureza última da realidade', 'Reflexão sobre o poder e a organização da vida em comum'],
    answer: [1, 3, 0, 2],
    why: 'São os grandes campos da filosofia: agir, conviver, conhecer e ser. Situar a pergunta no campo certo já resolve metade da questão.',
  }),
  pair(ID_CONC, 2, {
    stem: 'Relacione cada conceito ao pensador que o formulou.',
    leftLabel: 'Conceito',
    rightLabel: 'Pensador',
    left: ['Mito da caverna', 'Imperativo categórico', 'Contrato social', 'Vontade de potência'],
    right: ['Kant', 'Nietzsche', 'Platão', 'Rousseau'],
    answer: [2, 0, 3, 1],
    why: 'Conceito e autor andam juntos na prova: identificado um, o outro vem junto — e com ele o problema que o conceito tenta resolver.',
  }),
  classify(ID_CONC, 2, {
    stem: 'Separe cada afirmação pela corrente epistemológica.',
    groups: ['Racionalismo', 'Empirismo'],
    things: [
      { t: 'O conhecimento parte da experiência sensível', g: 1 },
      { t: 'A razão possui ideias inatas', g: 0 },
      { t: 'A mente ao nascer é como uma folha em branco', g: 1 },
      { t: 'A dúvida metódica funda o conhecimento seguro', g: 0 },
      { t: 'Só se conhece o que pode ser observado', g: 1 },
      { t: 'A matemática é o modelo do saber verdadeiro', g: 0 },
    ],
    why: 'Descartes e Locke representam os dois polos: a certeza vem da razão ou da experiência? Kant tentará a síntese.',
  }),
  mcq(ID_CONC, 3, {
    stem: 'Para Kant, uma ação é moralmente válida quando:',
    options: [
      'Produz as melhores consequências.',
      'É praticada por dever, segundo uma máxima universalizável.',
      'Agrada à maioria.',
      'Segue a tradição.',
    ],
    answer: 1,
    why: 'Ética deontológica: o valor está na intenção e na forma da máxima, não no resultado. É o contraponto direto ao utilitarismo.',
  }),
  mcq(ID_CONC, 3, {
    stem: 'A distinção entre "ética" e "moral", tal como usada em filosofia, indica que:',
    options: [
      'São exatamente sinônimos.',
      'Moral é o conjunto de normas vigentes; ética é a reflexão crítica sobre essas normas.',
      'Ética se aplica só a profissões.',
      'Moral é individual e ética é religiosa.',
    ],
    answer: 1,
    why: 'A moral é o dado; a ética é o exame do dado. Por isso se pode perguntar se uma moral vigente é justa.',
  }),
];

const ID_AUT = `${S}.autores`;

const autores: Item[] = [
  pair(ID_AUT, 1, {
    stem: 'Relacione cada filósofo à sua tese central.',
    leftLabel: 'Filósofo',
    rightLabel: 'Tese',
    left: ['Sócrates', 'Aristóteles', 'Hobbes', 'Locke'],
    right: ['O ser humano é um animal político', 'O poder legítimo nasce do consentimento e visa preservar direitos naturais', 'Só sei que nada sei: o exame é o caminho', 'Sem Estado, a vida é guerra de todos contra todos'],
    answer: [2, 0, 3, 1],
    why: 'Hobbes e Locke partem do mesmo estado de natureza e chegam a Estados opostos: absoluto num caso, limitado no outro.',
  }),
  order(ID_AUT, 2, {
    stem: 'Ordene os filósofos por período histórico.',
    axis: 'mais antigo → mais recente',
    tokens: ['Kant', 'Platão', 'Santo Agostinho', 'Descartes'],
    answer: [1, 2, 3, 0],
    why: 'Antiguidade (Platão) → Patrística (Agostinho) → Moderna racionalista (Descartes) → Iluminismo (Kant).',
  }),
  pair(ID_AUT, 3, {
    stem: 'Relacione cada pensador contemporâneo à sua contribuição.',
    leftLabel: 'Pensador',
    rightLabel: 'Contribuição',
    left: ['Hannah Arendt', 'Michel Foucault', 'Simone de Beauvoir', 'Jürgen Habermas'],
    right: ['Poder disciplinar e produção dos sujeitos', 'Banalidade do mal e condição humana', 'Ação comunicativa e esfera pública', 'Não se nasce mulher: torna-se'],
    answer: [1, 0, 3, 2],
    why: 'Quatro chaves recorrentes no ENEM para pensar totalitarismo, vigilância, gênero e democracia deliberativa.',
  }),
  mcq(ID_AUT, 2, {
    stem: 'A maiêutica socrática consiste em:',
    options: [
      'Transmitir conhecimento pronto ao discípulo.',
      'Conduzir o interlocutor, por perguntas, a examinar as próprias crenças.',
      'Provar teses por autoridade.',
      'Registrar tratados por escrito.',
      ],
    answer: 1,
    why: 'O "parto das ideias": o saber não é depositado, é extraído pelo exame. Por isso Sócrates nada escreveu.',
  }),
];

const ID_ARG = `${S}.argumentos`;

const argumentos: Item[] = [
  mcq(ID_ARG, 1, {
    stem: 'Identifique a falácia: "Ele não pode falar sobre economia, afinal nem terminou a faculdade."',
    options: ['Ad hominem', 'Falso dilema', 'Apelo à emoção', 'Petição de princípio'],
    answer: 0,
    why: 'Ataca-se a pessoa em vez do argumento. A formação pode ser relevante para avaliar autoridade, mas não refuta o conteúdo do que foi dito.',
  }),
  mcq(ID_ARG, 2, {
    stem: 'Identifique a falácia: "Ou você apoia essa medida, ou é contra o país."',
    options: ['Falso dilema', 'Generalização apressada', 'Ad populum', 'Espantalho'],
    answer: 0,
    why: 'Reduz um leque de posições a duas alternativas extremas. É o recurso retórico mais comum no debate público.',
  }),
  mcq(ID_ARG, 2, {
    stem: 'Identifique a falácia: "Todo mundo pensa assim, logo está certo."',
    options: ['Ad populum', 'Ad hominem', 'Falácia genética', 'Non sequitur'],
    answer: 0,
    why: 'Apelo à maioria. Consenso pode ser indício, nunca prova — muita crença amplamente aceita já se mostrou falsa.',
  }),
  mcq(ID_ARG, 3, {
    stem: 'Um argumento dedutivo válido garante que:',
    options: [
      'A conclusão é verdadeira em qualquer caso.',
      'Se as premissas forem verdadeiras, a conclusão necessariamente será.',
      'As premissas são verdadeiras.',
      'A conclusão é provável.',
    ],
    answer: 1,
    why: 'Validade diz respeito à forma, não ao conteúdo: um argumento válido com premissa falsa pode levar a conclusão falsa. Quando forma e premissas são boas, o argumento é sólido.',
  }),
  mcq(ID_ARG, 3, {
    stem: 'A diferença entre indução e dedução é que:',
    options: [
      'A indução parte de casos particulares e generaliza; a dedução parte de premissas gerais para um caso.',
      'A dedução é usada só nas ciências humanas.',
      'A indução garante conclusões necessárias.',
      'Não há diferença prática entre elas.',
    ],
    answer: 0,
    why: 'A indução amplia o conhecimento ao custo da certeza; a dedução preserva a certeza sem acrescentar informação nova.',
  }),
];

const ID_COMP = `${S}.comparacao`;

const comparacao: Item[] = [
  classify(ID_COMP, 2, {
    stem: 'Separe as teses entre as duas concepções de justiça.',
    groups: ['Utilitarismo', 'Ética kantiana'],
    things: [
      { t: 'A ação certa é a que maximiza o bem-estar geral', g: 0 },
      { t: 'A pessoa nunca deve ser tratada apenas como meio', g: 1 },
      { t: 'As consequências determinam o valor moral', g: 0 },
      { t: 'O dever vale independentemente do resultado', g: 1 },
      { t: 'É legítimo sacrificar poucos por muitos, se o saldo for positivo', g: 0 },
      { t: 'Existem deveres que não admitem exceção por conveniência', g: 1 },
    ],
    why: 'O confronto entre as duas é o roteiro de quase todo dilema moral cobrado na prova — inclusive os dilemas do bonde e da vigilância.',
  }),
  mcq(ID_COMP, 3, {
    stem: 'Comparando Hobbes e Rousseau quanto ao estado de natureza:',
    options: [
      'Ambos o descrevem como estado de guerra.',
      'Hobbes o vê como conflito; Rousseau, como condição originalmente pacífica corrompida pela sociedade.',
      'Rousseau defende a monarquia absoluta.',
      'Nenhum dos dois discute o contrato social.',
    ],
    answer: 1,
    why: 'A mesma ferramenta conceitual sustenta conclusões opostas: para Hobbes o Estado salva do caos; para Rousseau, o Estado precisa recuperar uma liberdade perdida.',
  }),
  mcq(ID_COMP, 3, {
    stem: 'Foucault, ao analisar o poder nas sociedades modernas, sustenta que ele:',
    options: [
      'Concentra-se exclusivamente no Estado.',
      'Circula em instituições e práticas que produzem corpos e comportamentos.',
      'Desapareceu com a democracia.',
      'É exercido apenas pela violência física.',
    ],
    answer: 1,
    why: 'Escola, hospital, prisão e fábrica disciplinam gestos e horários. O poder, aqui, não só reprime: produz sujeitos.',
  }),
];

export const FILOSOFIA: Skill[] = [
  skill(S, 'conceitos', { name: 'Associação de conceitos', blurb: 'Ligar conceito, definição e campo filosófico.', kind: 'pair', game: 'Conexão', bank: conceitos }),
  skill(S, 'autores', { name: 'Autores e teses', blurb: 'Quem disse o quê, quando e contra quem.', kind: 'pair', game: 'Conexão', bank: autores }),
  skill(S, 'argumentos', { name: 'Interpretação de argumentos', blurb: 'Reconhecer falácias, validade e tipos de inferência.', kind: 'mcq', game: 'Decisão', bank: argumentos }),
  skill(S, 'comparacao', { name: 'Comparação entre ideias', blurb: 'Separar teses de correntes que partem do mesmo problema.', kind: 'classify', game: 'Triagem', bank: comparacao }),
];
