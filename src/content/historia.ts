import type { Item, Skill } from '../core/types';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'historia';

/* ---------- linha do tempo ---------- */
const ID_ORDEM = `${S}.ordem`;

const ordem: Item[] = [
  order(ID_ORDEM, 1, {
    stem: 'Coloque os acontecimentos do Brasil colonial em ordem cronológica.',
    axis: 'mais antigo → mais recente',
    tokens: ['Inconfidência Mineira (1789)', 'Chegada dos portugueses ao litoral (1500)', 'Vinda da Família Real (1808)', 'Invasões holandesas em Pernambuco (1630)'],
    answer: [1, 3, 0, 2],
    why: '1500 → 1630 → 1789 → 1808. A vinda da Corte é resposta às Guerras Napoleônicas, já no século XIX.',
  }),
  order(ID_ORDEM, 1, {
    stem: 'Ordene os marcos da Primeira República.',
    axis: 'mais antigo → mais recente',
    tokens: ['Semana de Arte Moderna (1922)', 'Proclamação da República (1889)', 'Revolução de 1930', 'Revolta da Vacina (1904)'],
    answer: [1, 3, 0, 2],
    why: '1889 → 1904 → 1922 → 1930. A Revolução de 1930 encerra a República Velha.',
  }),
  order(ID_ORDEM, 2, {
    stem: 'Ordene os acontecimentos da história do século XX no Brasil.',
    axis: 'mais antigo → mais recente',
    tokens: ['AI-5 (1968)', 'Fim do Estado Novo (1945)', 'Diretas Já (1984)', 'Golpe militar (1964)', 'Suicídio de Vargas (1954)'],
    answer: [1, 4, 3, 0, 2],
    why: '1945 → 1954 → 1964 → 1968 → 1984. O AI-5 marca o endurecimento do regime, quatro anos depois do golpe.',
  }),
  order(ID_ORDEM, 2, {
    stem: 'Ordene os marcos da história mundial moderna e contemporânea.',
    axis: 'mais antigo → mais recente',
    tokens: ['Crise de 1929', 'Revolução Francesa (1789)', 'Queda do Muro de Berlim (1989)', 'Primeira Guerra Mundial (1914)', 'Segunda Guerra Mundial (1939)'],
    answer: [1, 3, 0, 4, 2],
    why: '1789 → 1914 → 1929 → 1939 → 1989. A crise de 1929 está entre as duas guerras e ajuda a explicar a ascensão dos regimes totalitários.',
  }),
  order(ID_ORDEM, 3, {
    stem: 'Sem as datas: ordene as leis do processo de abolição da escravidão no Brasil.',
    axis: 'primeira → última',
    tokens: ['Lei dos Sexagenários', 'Lei Eusébio de Queirós', 'Lei Áurea', 'Lei do Ventre Livre'],
    answer: [1, 3, 0, 2],
    why: 'Eusébio de Queirós (1850, fim do tráfico) → Ventre Livre (1871) → Sexagenários (1885) → Áurea (1888). A sequência mostra a abolição como processo lento e negociado pela elite, não como gesto único.',
  }),
  order(ID_ORDEM, 3, {
    stem: 'Sem as datas: ordene os processos da transição da Idade Média para a Moderna.',
    axis: 'mais antigo → mais recente',
    tokens: ['Peste Negra na Europa', 'Início das Cruzadas', 'Reforma Protestante', 'Tomada de Constantinopla pelos turcos'],
    answer: [1, 0, 3, 2],
    why: 'Cruzadas (1096) → Peste Negra (1348) → Constantinopla (1453) → Reforma (1517). A crise demográfica do século XIV antecede e ajuda a explicar a expansão marítima.',
  }),
  order(ID_ORDEM, 3, {
    stem: 'Sem as datas: ordene os acontecimentos da redemocratização brasileira.',
    axis: 'primeiro → último',
    tokens: ['Plano Real', 'Constituição Cidadã', 'Impeachment de Collor', 'Eleição indireta de Tancredo Neves'],
    answer: [3, 1, 2, 0],
    why: 'Tancredo (1985) → Constituição (1988) → impeachment de Collor (1992) → Plano Real (1994).',
  }),
];

/* ---------- causa e consequência ---------- */
const ID_CAUSA = `${S}.causa`;

const causa: Item[] = [
  pair(ID_CAUSA, 1, {
    stem: 'Relacione cada processo à sua consequência direta.',
    leftLabel: 'Causa',
    rightLabel: 'Consequência',
    left: ['Peste Negra (século XIV)', 'Invenção da prensa de tipos móveis', 'Bloqueio Continental de Napoleão', 'Corrida do ouro em Minas Gerais'],
    right: ['Difusão rápida das ideias da Reforma', 'Transferência da Corte portuguesa para o Brasil', 'Escassez de mão de obra e crise do feudalismo', 'Deslocamento do eixo econômico para o Centro-Sul'],
    answer: [2, 0, 1, 3],
    why: 'A peste reduziu a população e encareceu o trabalho servil; a prensa barateou a circulação de textos; o bloqueio pressionou Portugal, aliado inglês, a fugir; o ouro puxou a capital de Salvador para o Rio (1763).',
  }),
  pair(ID_CAUSA, 2, {
    stem: 'Relacione cada causa ao seu desdobramento.',
    leftLabel: 'Causa',
    rightLabel: 'Desdobramento',
    left: ['Crise de 1929', 'Tratado de Versalhes', 'Fim do tráfico negreiro (1850)', 'Revolução Industrial inglesa'],
    right: ['Ressentimento alemão e ascensão do nazismo', 'Investimento de capital na lavoura cafeeira e na imigração', 'Êxodo rural e crescimento das cidades industriais', 'Queda das exportações de café e industrialização por substituição'],
    answer: [3, 0, 1, 2],
    why: 'Com o café em crise, o Brasil passou a produzir internamente o que importava; Versalhes impôs reparações que alimentaram a extrema-direita alemã; o capital antes usado no tráfico migrou para café e imigração.',
  }),
  pair(ID_CAUSA, 2, {
    stem: 'Relacione cada política da Era Vargas ao seu efeito.',
    leftLabel: 'Medida',
    rightLabel: 'Efeito',
    left: ['CLT (1943)', 'Criação da Companhia Siderúrgica Nacional', 'Departamento de Imprensa e Propaganda', 'Interventores nos estados após 1930'],
    right: ['Controle da informação e culto à figura do presidente', 'Base industrial pesada sob controle estatal', 'Enfraquecimento das oligarquias regionais', 'Regulação do trabalho urbano e vínculo do trabalhador ao Estado'],
    answer: [3, 1, 0, 2],
    why: 'O varguismo combina concessão social e controle político: direitos vêm do Estado, não da luta sindical autônoma — é o que se chama de trabalhismo tutelado.',
  }),
  pair(ID_CAUSA, 3, {
    stem: 'Relacione cada contexto à revolta popular que ele ajuda a explicar.',
    leftLabel: 'Contexto',
    rightLabel: 'Revolta',
    left: ['Vacinação obrigatória e reforma urbana no Rio', 'Castigos físicos e má alimentação na Marinha', 'Seca, miséria e messianismo no sertão baiano', 'Fim da escravidão sem acesso à terra no interior do Paraná'],
    right: ['Revolta da Chibata', 'Guerra do Contestado', 'Revolta da Vacina', 'Guerra de Canudos'],
    answer: [2, 0, 3, 1],
    why: 'As quatro revoltas do início do século XX têm um traço comum: populações pobres respondendo a uma modernização que as excluiu.',
  }),
  pair(ID_CAUSA, 3, {
    stem: 'Relacione cada elemento da Guerra Fria à sua consequência.',
    leftLabel: 'Elemento',
    rightLabel: 'Consequência',
    left: ['Plano Marshall', 'Doutrina de Segurança Nacional', 'Corrida armamentista nuclear', 'Descolonização afro-asiática'],
    right: ['Golpes militares apoiados pelos EUA na América Latina', 'Equilíbrio pelo terror e coexistência tensa', 'Reconstrução europeia sob influência norte-americana', 'Surgimento do movimento dos não alinhados'],
    answer: [2, 0, 1, 3],
    why: 'A bipolaridade organizou a política mundial: ajuda econômica de um lado, apoio a regimes autoritários de outro, e um terceiro bloco tentando escapar das duas órbitas.',
  }),
];

/* ---------- fontes históricas ---------- */
const ID_FONTE = `${S}.fontes`;

const fontes: Item[] = [
  mcq(ID_FONTE, 1, {
    stem: 'A fonte permite concluir que o autor:',
    figure: {
      type: 'text',
      title: 'Relato de viajante',
      source: 'Texto adaptado de relato europeu do século XVI',
      body: 'A terra é de bons ares e as gentes que nela vivem andam nuas, sem vergonha alguma, e não lavram nem criam. Parece-me gente de tal inocência que, se a doutrinássemos, logo seriam cristãos.',
    },
    options: [
      'Descreve os povos indígenas a partir dos próprios valores europeus.',
      'Registra com neutralidade a organização social indígena.',
      'Defende a autonomia cultural dos povos originários.',
      'Descreve uma sociedade agrícola complexa.',
    ],
    answer: 0,
    why: '"Não lavram nem criam" e "inocência" medem o outro pela régua europeia: agricultura nos moldes conhecidos e catequese. Fonte não é espelho do passado — é ponto de vista situado.',
  }),
  mcq(ID_FONTE, 2, {
    stem: 'O trecho expressa qual projeto político?',
    figure: {
      type: 'text',
      title: 'Discurso político',
      source: 'Texto adaptado de pronunciamento brasileiro da década de 1930',
      body: 'O Estado não reconhece luta de classes. Capital e trabalho colaboram sob a arbitragem de quem representa a nação inteira. Os direitos do trabalhador não são conquista da rua: são concessão da lei.',
    },
    options: [
      'Liberalismo econômico clássico',
      'Corporativismo autoritário',
      'Socialismo revolucionário',
      'Federalismo oligárquico',
    ],
    answer: 1,
    why: 'Negar o conflito de classes e colocar o Estado como árbitro entre capital e trabalho é a definição de corporativismo — matriz do Estado Novo.',
  }),
  mcq(ID_FONTE, 2, {
    stem: 'A charge descrita critica principalmente:',
    figure: {
      type: 'text',
      title: 'Descrição de charge',
      source: 'Charge brasileira do início do século XX (descrição)',
      body: 'Dois fazendeiros, um com um saco de café e outro com um copo de leite, revezam-se sentando na mesma cadeira presidencial enquanto um eleitor observa cercado por capangas armados.',
    },
    options: [
      'A industrialização acelerada do país',
      'O revezamento oligárquico e o voto sob coerção na República Velha',
      'A Abolição sem reforma agrária',
      'A política externa de alinhamento aos EUA',
    ],
    answer: 1,
    why: 'Café e leite, revezamento na cadeira e capangas: é a política dos governadores com voto aberto e curral eleitoral.',
  }),
  mcq(ID_FONTE, 3, {
    stem: 'Comparando as duas fontes, é correto afirmar que:',
    figure: {
      type: 'text',
      title: 'Duas versões de um mesmo episódio',
      source: 'Textos adaptados, século XIX',
      body: 'FONTE I (jornal da Corte): "A ordem foi restabelecida na província graças à firmeza das tropas legalistas contra os desordeiros."\n\nFONTE II (memória de um participante): "Pegamos em armas porque a província pagava impostos e não tinha voz; chamaram-nos de desordeiros os mesmos que nos calaram."',
    },
    options: [
      'A Fonte I é mais confiável por ser um documento oficial da imprensa.',
      'As duas se anulam, e nada pode ser afirmado sobre o episódio.',
      'A divergência revela disputas de poder e de memória sobre o mesmo fato.',
      'A Fonte II é mais confiável por ser um relato de quem viveu o fato.',
    ],
    answer: 2,
    why: 'Nem hierarquia automática entre tipos de fonte, nem empate que impede o conhecimento: o trabalho do historiador é confrontar versões e explicar de onde cada uma fala.',
  }),
  mcq(ID_FONTE, 3, {
    stem: 'A tabela de registros de entrada de imigrantes sustenta qual afirmação?',
    figure: {
      type: 'table',
      head: ['Década', 'Italianos', 'Portugueses', 'Japoneses'],
      rows: [['1880', '277.000', '104.000', '—'], ['1890', '690.000', '219.000', '—'], ['1900', '221.000', '195.000', '861'], ['1910', '138.000', '318.000', '27.432']],
      caption: 'Entrada de imigrantes no Brasil (dados aproximados)',
    },
    options: [
      'A imigração japonesa foi majoritária no período.',
      'O pico italiano coincide com a expansão cafeeira e recua nas décadas seguintes.',
      'A imigração portuguesa cessou após 1900.',
      'Os três fluxos cresceram de forma contínua.',
    ],
    answer: 1,
    why: 'O pico italiano está na década de 1890, no auge do café paulista e logo após a Abolição; depois recua, inclusive por restrições do governo italiano à emigração subsidiada.',
  }),
];

/* ---------- contexto histórico ---------- */
const ID_CTX = `${S}.contexto`;

const contexto: Item[] = [
  mcq(ID_CTX, 1, {
    stem: 'A expressão "política do café com leite" designa:',
    options: [
      'O acordo de alternância entre as elites de São Paulo e Minas Gerais na Primeira República.',
      'O programa de merenda escolar do Estado Novo.',
      'A aliança entre Brasil e Argentina no Mercosul.',
      'O plano de produção agrícola do governo militar.',
    ],
    answer: 0,
    why: 'São Paulo (café) e Minas (leite) revezavam a presidência e sustentavam-se pela política dos governadores.',
  }),
  mcq(ID_CTX, 1, {
    stem: 'O Renascimento europeu caracteriza-se principalmente por:',
    options: [
      'A valorização do humano e da razão, com retomada da cultura clássica.',
      'A recusa integral da herança greco-romana.',
      'A centralidade absoluta do pensamento teológico medieval.',
      'A rejeição das artes visuais como forma de conhecimento.',
    ],
    answer: 0,
    why: 'Antropocentrismo, racionalismo e retomada dos clássicos, financiados pelo mecenato urbano-mercantil.',
  }),
  mcq(ID_CTX, 2, {
    stem: 'A Revolução de 1930 pode ser compreendida como:',
    options: [
      'A vitória de uma revolução socialista no Brasil.',
      'A ruptura do arranjo oligárquico e a centralização do poder no Executivo federal.',
      'A restauração da monarquia sob nova dinastia.',
      'A primeira eleição direta com voto feminino.',
    ],
    answer: 1,
    why: 'Quebrou o revezamento oligárquico, nomeou interventores e ampliou o papel do Estado na economia e no trabalho — sem qualquer conteúdo socialista.',
  }),
  mcq(ID_CTX, 2, {
    stem: 'A Guerra Fria estruturou-se como:',
    options: [
      'Um conflito armado direto e contínuo entre EUA e URSS.',
      'Uma disputa de modelos econômicos e políticos travada por meios indiretos.',
      'Uma aliança militar entre os dois blocos contra a descolonização.',
      'Um período sem intervenções externas na América Latina.',
    ],
    answer: 1,
    why: 'Sem confronto direto entre as superpotências, mas com guerras periféricas, golpes apoiados, corrida armamentista e disputa ideológica.',
  }),
  mcq(ID_CTX, 3, {
    stem: 'O conceito de "modernização conservadora", aplicado ao Brasil, descreve:',
    options: [
      'Mudanças econômicas e técnicas sem alteração da estrutura de poder e da concentração de terra.',
      'A adoção integral do modelo político europeu.',
      'A reforma agrária conduzida pelos governos militares.',
      'A recusa de qualquer industrialização.',
    ],
    answer: 0,
    why: 'Moderniza-se a produção — maquinário, crédito, exportação — preservando latifúndio e hierarquias sociais. Vale para a Abolição, para o varguismo e para o "milagre" dos anos 1970.',
  }),
  mcq(ID_CTX, 3, {
    stem: 'Sobre a escravidão no Brasil, a historiografia recente enfatiza que os escravizados:',
    options: [
      'Foram agentes históricos, com estratégias de resistência, negociação e reconstrução cultural.',
      'Aceitaram passivamente a condição imposta.',
      'Eram minoria numérica na economia colonial.',
      'Foram libertados por iniciativa exclusiva da Coroa, sem participação própria.',
    ],
    answer: 0,
    why: 'Quilombos, fugas, ações judiciais por alforria, irmandades e revoltas como a dos Malês mostram protagonismo — a leitura de "escravo coisificado" foi superada.',
  }),
];

/* ---------- comparar processos ---------- */
const ID_COMP = `${S}.comparar`;

const comparar: Item[] = [
  classify(ID_COMP, 1, {
    stem: 'Separe cada característica pelo processo de independência a que pertence.',
    groups: ['Independência do Brasil', 'Independência dos EUA'],
    things: [
      { t: 'Ruptura conduzida por um herdeiro da própria dinastia', g: 0 },
      { t: 'Manutenção da escravidão após a emancipação', g: 0 },
      { t: 'Guerra prolongada contra a metrópole', g: 1 },
      { t: 'Adoção imediata da forma republicana', g: 1 },
      { t: 'Monarquia centralizada como forma de governo', g: 0 },
      { t: 'Declaração inspirada no iluminismo e no direito natural', g: 1 },
    ],
    why: 'Nos dois casos a elite local rompe com a metrópole, mas o Brasil mantém monarquia, escravidão e continuidade dinástica; os EUA rompem com guerra e fundam uma república federativa.',
  }),
  classify(ID_COMP, 2, {
    stem: 'Separe as características entre os dois regimes autoritários brasileiros.',
    groups: ['Estado Novo (1937–45)', 'Regime militar (1964–85)'],
    things: [
      { t: 'Atos Institucionais como instrumento jurídico', g: 1 },
      { t: 'Bipartidarismo imposto (Arena e MDB)', g: 1 },
      { t: 'Constituição outorgada apelidada de "Polaca"', g: 0 },
      { t: 'DIP como órgão central de propaganda', g: 0 },
      { t: 'Milagre econômico e endividamento externo', g: 1 },
      { t: 'Culto à figura do presidente como "pai dos pobres"', g: 0 },
    ],
    why: 'Os dois suprimem direitos, mas com gramáticas distintas: o Estado Novo é personalista e corporativo; o regime militar é institucional e tecnocrático.',
  }),
  mcq(ID_COMP, 2, {
    stem: 'Comparando a Revolução Francesa e a Revolução Industrial, é correto afirmar que:',
    options: [
      'Ambas foram processos políticos de tomada do poder.',
      'A primeira é uma ruptura política; a segunda, uma transformação socioeconômica de longa duração.',
      'As duas ocorreram no mesmo país e pelo mesmo grupo social.',
      'Nenhuma delas teve relação com a ascensão da burguesia.',
    ],
    answer: 1,
    why: 'Uma derruba a ordem absolutista em anos; a outra reorganiza produção, trabalho e cidades ao longo de décadas. As duas expressam a ascensão burguesa, mas em ritmos e terrenos diferentes.',
  }),
  mcq(ID_COMP, 3, {
    stem: 'Canudos e Contestado guardam em comum:',
    options: [
      'A defesa da restauração monárquica como programa central.',
      'Comunidades pobres, liderança religiosa e repressão militar republicana.',
      'A origem urbana e operária dos participantes.',
      'O apoio das oligarquias regionais aos revoltosos.',
    ],
    answer: 1,
    why: 'Nos dois casos, populações expulsas da terra se organizam em torno de líderes messiânicos e são esmagadas por tropas federais que as classificam como ameaça à República.',
  }),
  mcq(ID_COMP, 3, {
    stem: 'Ao comparar o feudalismo europeu com a colonização portuguesa na América, deve-se evitar:',
    options: [
      'Reconhecer a existência de trabalho compulsório em ambos.',
      'Transpor o conceito de servidão para a escravidão colonial como se fossem equivalentes.',
      'Analisar as duas formações a partir de suas relações de produção.',
      'Considerar o papel da Igreja nos dois contextos.',
    ],
    answer: 1,
    why: 'Servo e escravizado não são a mesma coisa: o servo tem vínculo com a terra e direitos costumeiros; o escravizado é juridicamente propriedade. Comparar é útil; igualar é anacronismo.',
  }),
];

export const HISTORIA: Skill[] = [
  skill(S, 'ordem', { name: 'Linha do tempo', blurb: 'Colocar acontecimentos em ordem — com e sem as datas à mostra.', kind: 'order', game: 'Sequência', bank: ordem }),
  skill(S, 'causa', { name: 'Causa e consequência', blurb: 'Ligar processos aos seus desdobramentos históricos.', kind: 'pair', game: 'Conexão', bank: causa }),
  skill(S, 'fontes', { name: 'Interpretação de fontes', blurb: 'Ler documentos, charges e tabelas como pontos de vista situados.', kind: 'mcq', game: 'Leitura', bank: fontes }),
  skill(S, 'contexto', { name: 'Contexto histórico', blurb: 'Identificar o período e a lógica por trás de conceitos e eventos.', kind: 'mcq', game: 'Decisão', bank: contexto }),
  skill(S, 'comparar', { name: 'Comparar processos', blurb: 'Separar semelhanças reais de anacronismos entre processos distintos.', kind: 'classify', game: 'Triagem', bank: comparar }),
];
