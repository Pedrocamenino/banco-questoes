import type { Item, Skill } from '../core/types';
import { classify, mcq, pair, skill } from './kit';

const S = 'ingles';

const ID_LEI = `${S}.leitura`;

const leitura: Item[] = [
  mcq(ID_LEI, 1, {
    stem: 'O objetivo principal do texto é:',
    figure: {
      type: 'text',
      title: 'Public notice',
      body: 'Please note that the library will close at 4 p.m. on Friday for staff training. Books due that day may be returned on Monday without any late fee.',
    },
    options: ['Divulgar um novo acervo', 'Informar mudança de horário e suas consequências', 'Convidar para um curso', 'Cobrar multas atrasadas'],
    answer: 1,
    why: 'O aviso informa o fechamento antecipado e o que isso muda para quem tem devolução marcada. "Without any late fee" é a informação-chave.',
  }),
  mcq(ID_LEI, 1, {
    stem: 'A expressão "make ends meet" no texto significa:',
    figure: {
      type: 'text',
      title: 'Newspaper excerpt',
      body: 'With rising rents and stagnant wages, many young workers now take a second job just to make ends meet.',
    },
    options: ['Encontrar amigos', 'Conseguir pagar as contas com o que se ganha', 'Terminar um projeto', 'Fazer reuniões'],
    answer: 1,
    why: 'O contexto — aluguel subindo e salário parado — indica dificuldade financeira. Idiomatismos se deduzem do entorno, não do dicionário palavra por palavra.',
  }),
  mcq(ID_LEI, 2, {
    stem: 'De acordo com o texto, a autora sustenta que:',
    figure: {
      type: 'text',
      title: 'Opinion column',
      body: 'Technology alone will not fix education. A tablet in every classroom is useless if teachers are underpaid, overworked and given no time to plan. Tools follow teaching; they do not replace it.',
    },
    options: [
      'A tecnologia deve substituir os professores.',
      'A tecnologia só ajuda quando as condições de trabalho docente são adequadas.',
      'Tablets são prejudiciais à aprendizagem.',
      'A educação não precisa de investimento.',
    ],
    answer: 1,
    why: '"Tools follow teaching; they do not replace it" sintetiza a tese. O tablet não é condenado — é posto em seu lugar.',
  }),
  mcq(ID_LEI, 2, {
    stem: 'O tom do texto pode ser descrito como:',
    figure: {
      type: 'text',
      title: 'Social media post',
      body: 'Sure, I love waking up at 5 a.m. to spend two hours in traffic. Nothing says "quality of life" like a bus that never comes.',
    },
    options: ['Entusiasmado', 'Irônico', 'Neutro', 'Formal'],
    answer: 1,
    why: '"Sure, I love..." seguido de uma situação desagradável e do uso de aspas em "quality of life" marca a ironia.',
  }),
  mcq(ID_LEI, 3, {
    stem: 'A conclusão que o texto permite tirar é:',
    figure: {
      type: 'text',
      title: 'Science news',
      body: 'Researchers found that students who slept less than six hours performed worse on memory tasks. However, the study could not determine whether poor sleep caused the decline or whether anxious students both slept less and scored lower.',
    },
    options: [
      'Dormir pouco causa perda de memória.',
      'Há associação entre sono curto e pior desempenho, mas a causalidade não foi estabelecida.',
      'A ansiedade não influencia o sono.',
      'O estudo não encontrou nenhuma relação.',
    ],
    answer: 1,
    why: 'O "however" introduz exatamente a ressalva: associação observada, causa indefinida. Ler o conectivo é ler o argumento.',
  }),
  mcq(ID_LEI, 3, {
    stem: 'A palavra "yet", no trecho, indica:',
    figure: {
      type: 'text',
      title: 'Report excerpt',
      body: 'Access to the internet has expanded rapidly across the region. Yet nearly a third of rural households still rely on a single mobile connection shared by the whole family.',
    },
    options: ['Adição', 'Contraste', 'Conclusão', 'Exemplificação'],
    answer: 1,
    why: '"Yet" opõe o avanço geral ao dado que o relativiza — mesma função de "however" e "nevertheless".',
  }),
];

const ID_VOC = `${S}.vocabulario`;

const vocabulario: Item[] = [
  classify(ID_VOC, 1, {
    stem: 'Separe as palavras entre cognatos verdadeiros e falsos cognatos.',
    groups: ['Cognato verdadeiro', 'Falso cognato'],
    things: [
      { t: 'important', g: 0 }, { t: 'pretend (fingir)', g: 1 },
      { t: 'possible', g: 0 }, { t: 'actually (na verdade)', g: 1 },
      { t: 'construction', g: 0 }, { t: 'parents (pais)', g: 1 },
    ],
    why: 'Falsos cognatos derrubam a leitura por parecerem óbvios. "Actually" não é "atualmente" (currently) e "parents" não é "parentes" (relatives).',
  }),
  pair(ID_VOC, 2, {
    stem: 'Relacione cada phrasal verb ao seu sentido.',
    leftLabel: 'Expressão',
    rightLabel: 'Sentido',
    left: ['give up', 'find out', 'look after', 'come up with'],
    right: ['descobrir', 'desistir', 'apresentar uma ideia', 'cuidar de'],
    answer: [1, 0, 3, 2],
    why: 'Phrasal verbs mudam completamente de sentido com a partícula: "look after" (cuidar) não tem relação com "look for" (procurar).',
  }),
  pair(ID_VOC, 2, {
    stem: 'Relacione cada conectivo à relação lógica que estabelece.',
    leftLabel: 'Conectivo',
    rightLabel: 'Relação',
    left: ['however', 'therefore', 'moreover', 'although'],
    right: ['adição', 'contraste', 'concessão', 'conclusão'],
    answer: [1, 3, 0, 2],
    why: 'Mapear conectivos é a forma mais rápida de entender a estrutura de um texto em inglês sem traduzi-lo inteiro.',
  }),
  mcq(ID_VOC, 3, {
    stem: 'Em "the policy was rolled out last year", a expressão significa que a política foi:',
    options: ['Cancelada', 'Implementada gradualmente', 'Debatida', 'Rejeitada'],
    answer: 1,
    why: '"Roll out" é colocar em operação por etapas. O contexto administrativo confirma a leitura.',
  }),
];

const ID_EST = `${S}.estrategias`;

const estrategias: Item[] = [
  mcq(ID_EST, 1, {
    stem: 'Ao ler um texto longo em inglês na prova, a estratégia mais eficiente é:',
    options: [
      'Traduzir palavra por palavra do início ao fim.',
      'Ler o enunciado primeiro e procurar no texto a informação pedida.',
      'Ler apenas a última frase.',
      'Ignorar títulos e legendas.',
    ],
    answer: 1,
    why: 'A questão dirige a leitura (scanning). Traduzir tudo consome o tempo que faltará nas demais questões.',
  }),
  mcq(ID_EST, 2, {
    stem: 'Reconhecer o gênero textual antes de ler ajuda porque:',
    options: [
      'Permite prever a estrutura e a intenção do texto.',
      'Dispensa a leitura.',
      'Garante a tradução literal.',
      'Elimina os falsos cognatos.',
    ],
    answer: 0,
    why: 'Saber que é anúncio, carta ou artigo científico já cria expectativa sobre onde estão tese, dado e conclusão.',
  }),
  mcq(ID_EST, 2, {
    stem: 'Em "unpredictable", a análise dos afixos indica:',
    options: [
      'Prefixo de negação + raiz "predict" + sufixo de adjetivo: "não previsível".',
      'Uma palavra sem relação com "predict".',
      'Um substantivo plural.',
      'Um verbo no passado.',
    ],
    answer: 0,
    why: 'Decompor afixos permite inferir o sentido de palavras nunca vistas — un-, dis-, -able, -tion e -ly resolvem boa parte do vocabulário de prova.',
  }),
  mcq(ID_EST, 3, {
    stem: 'Em um texto com dados, a leitura de gráficos e legendas serve para:',
    options: [
      'Confirmar ou refutar a interpretação construída a partir do corpo do texto.',
      'Substituir a leitura do texto.',
      'Apenas ilustrar visualmente.',
      'Indicar a fonte da tradução.',
    ],
    answer: 0,
    why: 'Texto e figura se sustentam: quando a alternativa contradiz o gráfico, ela é falsa por mais bem escrita que pareça.',
  }),
];

const ID_GRA = `${S}.gramatica`;

const gramatica: Item[] = [
  mcq(ID_GRA, 1, {
    stem: 'Complete: "She ____ to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    answer: 1,
    why: 'Presente simples na terceira pessoa do singular pede -s: she goes.',
  }),
  mcq(ID_GRA, 2, {
    stem: 'Em "If it rains, the game will be cancelled", a estrutura indica:',
    options: ['Condição real e provável no futuro', 'Situação impossível', 'Fato passado', 'Ordem direta'],
    answer: 0,
    why: 'First conditional: if + presente, will + verbo. Trata de possibilidade concreta, não de hipótese irreal.',
  }),
  mcq(ID_GRA, 2, {
    stem: 'A frase "The report was written by the committee" está na:',
    options: ['Voz passiva', 'Voz ativa', 'Forma imperativa', 'Forma interrogativa'],
    answer: 0,
    why: 'Verbo to be + particípio + by: o foco passa para o que sofreu a ação, recurso comum em textos científicos e jornalísticos.',
  }),
  mcq(ID_GRA, 3, {
    stem: 'Em "She has lived here since 2015", o present perfect indica:',
    options: [
      'Ação iniciada no passado e que continua no presente.',
      'Ação concluída e sem relação com o presente.',
      'Ação futura.',
      'Hipótese irreal.',
    ],
    answer: 0,
    why: 'Present perfect com "since" ou "for" liga passado e presente — diferença que o português resolve com "mora desde", no presente.',
  }),
];

export const INGLES: Skill[] = [
  skill(S, 'leitura', { name: 'Compreensão de texto', blurb: 'Tese, tom, ressalva e conclusão em textos autênticos.', kind: 'mcq', game: 'Leitura', bank: leitura }),
  skill(S, 'vocabulario', { name: 'Vocabulário em contexto', blurb: 'Falsos cognatos, phrasal verbs e conectivos.', kind: 'classify', game: 'Triagem', bank: vocabulario }),
  skill(S, 'estrategias', { name: 'Estratégias de leitura', blurb: 'Scanning, gênero e inferência por afixos.', kind: 'mcq', game: 'Decisão', bank: estrategias }),
  skill(S, 'gramatica', { name: 'Gramática em contexto', blurb: 'Tempos verbais e vozes a serviço do sentido.', kind: 'mcq', game: 'Decisão', bank: gramatica }),
];
