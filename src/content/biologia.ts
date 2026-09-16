import type { Item, Skill } from '../core/types';
import { bars, lines } from './figures';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'biologia';

/* ---------- genética ---------- */
const ID_GEN = `${S}.genetica`;

const genetica: Item[] = [
  mcq(ID_GEN, 1, {
    stem: 'No cruzamento entre dois indivíduos heterozigotos (Aa × Aa), a proporção fenotípica esperada é:',
    options: ['1 dominante : 1 recessivo', '3 dominantes : 1 recessivo', '9 : 3 : 3 : 1', '100% dominante'],
    answer: 1,
    why: 'O quadro de Punnett dá AA, Aa, Aa, aa. Como A domina, três aparecem com o fenótipo dominante e um com o recessivo.',
  }),
  mcq(ID_GEN, 1, {
    stem: 'Um casal Rh⁺ heterozigoto pode ter filho Rh⁻ porque:',
    options: [
      'O alelo recessivo pode se manifestar quando vem dos dois lados.',
      'O tipo sanguíneo muda ao longo da vida.',
      'O Rh não é hereditário.',
      'Houve mutação obrigatória.',
    ],
    answer: 0,
    why: 'Cada heterozigoto carrega um alelo recessivo silencioso; a chance de o filho receber os dois é de 25%.',
  }),
  mcq(ID_GEN, 2, {
    stem: 'Uma mulher portadora de daltonismo (X^d X) com homem de visão normal (X Y) terá:',
    options: [
      '50% dos filhos homens daltônicos e nenhuma filha daltônica.',
      'Todos os filhos daltônicos.',
      '50% das filhas daltônicas.',
      'Nenhum descendente afetado.',
    ],
    answer: 0,
    why: 'Herança ligada ao X: o menino recebe um único X, o da mãe — metade deles vem com o alelo. As meninas recebem o X normal do pai e no máximo serão portadoras.',
  }),
  mcq(ID_GEN, 2, {
    stem: 'A técnica de PCR é usada para:',
    options: ['Amplificar sequências específicas de DNA', 'Sequenciar proteínas', 'Clonar organismos inteiros', 'Medir a taxa de fotossíntese'],
    answer: 0,
    why: 'A PCR multiplica uma região-alvo do DNA em milhões de cópias, o que viabiliza diagnóstico, teste de paternidade e perícia.',
  }),
  mcq(ID_GEN, 3, {
    stem: 'Em uma população em equilíbrio de Hardy-Weinberg, 16% dos indivíduos são recessivos (aa). A frequência do alelo "a" é:',
    options: ['0,16', '0,40', '0,84', '0,04'],
    answer: 1,
    why: 'q² = 0,16 → q = 0,4. Consequentemente p = 0,6 e os heterozigotos são 2pq = 48% da população.',
  }),
  mcq(ID_GEN, 3, {
    stem: 'Duas células do mesmo organismo têm o mesmo DNA, mas funções diferentes. Isso se explica por:',
    options: [
      'Perda de genes durante a diferenciação.',
      'Expressão diferencial dos genes, com regulação epigenética.',
      'Mutações distintas em cada célula.',
      'Diferença no número de cromossomos.',
    ],
    answer: 1,
    why: 'Todas guardam o mesmo genoma; o que muda é quais genes são lidos. Metilação e modificação de histonas ligam e desligam trechos sem alterar a sequência.',
  }),
];

/* ---------- ecologia ---------- */
const ID_ECO = `${S}.ecologia`;

const ecologia: Item[] = [
  classify(ID_ECO, 1, {
    stem: 'Separe cada organismo pelo seu papel na cadeia alimentar.',
    groups: ['Produtor', 'Consumidor', 'Decompositor'],
    things: [
      { t: 'Alga microscópica', g: 0 }, { t: 'Onça-pintada', g: 1 }, { t: 'Fungo do solo', g: 2 },
      { t: 'Capim', g: 0 }, { t: 'Gafanhoto', g: 1 }, { t: 'Bactéria da matéria orgânica', g: 2 },
    ],
    why: 'Produtores fixam energia luminosa; consumidores obtêm energia de outros seres; decompositores devolvem a matéria ao ambiente, fechando o ciclo.',
  }),
  pair(ID_ECO, 2, {
    stem: 'Relacione cada relação ecológica ao seu exemplo.',
    leftLabel: 'Relação',
    rightLabel: 'Exemplo',
    left: ['Mutualismo', 'Parasitismo', 'Comensalismo', 'Predatismo'],
    right: ['Rêmora que se fixa no tubarão e aproveita restos', 'Líquen: alga e fungo em benefício mútuo', 'Onça que captura a capivara', 'Carrapato no cão'],
    answer: [1, 3, 0, 2],
    why: 'O critério é quem ganha e quem perde: mutualismo (+/+), comensalismo (+/0), parasitismo e predatismo (+/−), separados pela morte imediata ou não da presa.',
  }),
  mcq(ID_ECO, 2, {
    stem: 'A pirâmide de energia é sempre decrescente porque:',
    options: [
      'Parte da energia é dissipada como calor a cada nível trófico.',
      'Os predadores são sempre menores.',
      'A matéria desaparece.',
      'Só o primeiro nível respira.',
    ],
    answer: 0,
    why: 'Cerca de 90% da energia se perde em cada transferência, sobretudo como calor da respiração celular. Por isso as cadeias raramente passam de 4 ou 5 níveis.',
  }),
  mcq(ID_ECO, 2, {
    stem: 'A bioacumulação de mercúrio atinge mais intensamente:',
    options: ['Produtores', 'Consumidores primários', 'Predadores de topo', 'Decompositores'],
    answer: 2,
    why: 'Substâncias que não são excretadas se concentram a cada nível: quem come muitos organismos contaminados acumula mais — daí o alerta sobre peixes grandes em rios com garimpo.',
  }),
  mcq(ID_ECO, 3, {
    stem: 'O gráfico mostra a população de duas espécies. A relação mais provável é:',
    figure: { type: 'chart', chart: lines(['t1', 't2', 't3', 't4', 't5', 't6'], [{ name: 'Espécie A', values: [50, 80, 120, 70, 40, 60] }, { name: 'Espécie B', values: [10, 20, 45, 60, 25, 15] }], { title: 'Tamanho populacional', yLabel: 'indivíduos' }) },
    options: ['Competição', 'Presa e predador', 'Mutualismo', 'Comensalismo'],
    answer: 1,
    why: 'A curva de B sobe logo após a de A e cai quando A cai: é o atraso típico da dinâmica presa-predador.',
  }),
  mcq(ID_ECO, 3, {
    stem: 'A eutrofização de um lago começa com:',
    options: [
      'Excesso de nutrientes, que provoca proliferação de algas e queda do oxigênio dissolvido.',
      'Falta de nutrientes no corpo d\'água.',
      'Aumento da salinidade.',
      'Resfriamento da água.',
    ],
    answer: 0,
    why: 'Esgoto e fertilizante fornecem nitrogênio e fósforo; a floração de algas bloqueia luz e, ao se decompor, consome o oxigênio — daí a mortandade de peixes.',
  }),
];

/* ---------- fisiologia ---------- */
const ID_FIS = `${S}.fisiologia`;

const fisiologia: Item[] = [
  pair(ID_FIS, 1, {
    stem: 'Relacione cada órgão à sua função principal.',
    leftLabel: 'Órgão',
    rightLabel: 'Função',
    left: ['Pulmão', 'Rim', 'Fígado', 'Pâncreas'],
    right: ['Filtra o sangue e regula a água do corpo', 'Troca gasosa entre ar e sangue', 'Produz insulina e enzimas digestivas', 'Metaboliza nutrientes e neutraliza toxinas'],
    answer: [1, 0, 3, 2],
    why: 'Funções que costumam ser trocadas na prova: filtração é do rim; detoxificação é do fígado; insulina vem do pâncreas.',
  }),
  order(ID_FIS, 2, {
    stem: 'Ordene o trajeto do alimento no sistema digestório.',
    axis: 'entrada → saída',
    tokens: ['Intestino delgado', 'Boca', 'Estômago', 'Esôfago', 'Intestino grosso'],
    answer: [1, 3, 2, 0, 4],
    why: 'Boca → esôfago → estômago → intestino delgado (onde ocorre a maior parte da absorção) → intestino grosso (absorção de água).',
  }),
  mcq(ID_FIS, 2, {
    stem: 'A insulina atua no organismo:',
    options: [
      'Elevando a glicemia',
      'Facilitando a entrada de glicose nas células e reduzindo a glicemia',
      'Digerindo proteínas no estômago',
      'Transportando oxigênio',
    ],
    answer: 1,
    why: 'É o hormônio hipoglicemiante. Sua falta ou a resistência a ela caracterizam os diabetes tipo 1 e tipo 2.',
  }),
  mcq(ID_FIS, 3, {
    stem: 'Durante exercício intenso, a respiração acelera principalmente em resposta a:',
    options: [
      'Queda de oxigênio percebida pelo cérebro.',
      'Aumento do CO₂ e da acidez do sangue detectado por quimiorreceptores.',
      'Aumento da temperatura da pele.',
      'Redução da frequência cardíaca.',
    ],
    answer: 1,
    why: 'O gatilho principal é o gás carbônico, não a falta de oxigênio: mais CO₂ significa sangue mais ácido, e o bulbo aumenta a ventilação para eliminá-lo.',
  }),
  mcq(ID_FIS, 3, {
    stem: 'A febre, do ponto de vista fisiológico, é:',
    options: [
      'Uma falha do sistema imune.',
      'Um ajuste do termostato hipotalâmico que dificulta a proliferação de patógenos.',
      'Um efeito colateral sem função.',
      'Sinal exclusivo de infecção bacteriana.',
    ],
    answer: 1,
    why: 'Pirógenos elevam o ponto de ajuste hipotalâmico. A temperatura mais alta prejudica o patógeno e acelera respostas imunes — é defesa, não defeito.',
  }),
];

/* ---------- evolução ---------- */
const ID_EVO = `${S}.evolucao`;

const evolucao: Item[] = [
  mcq(ID_EVO, 1, {
    stem: 'Para Darwin, a evolução ocorre principalmente por:',
    options: ['Uso e desuso dos órgãos', 'Seleção natural sobre a variação existente', 'Vontade dos indivíduos', 'Herança de caracteres adquiridos'],
    answer: 1,
    why: 'A variação já existe na população; o ambiente seleciona quem deixa mais descendentes. Uso e desuso é a explicação lamarckista, superada.',
  }),
  mcq(ID_EVO, 2, {
    stem: 'A resistência bacteriana a antibióticos surge porque:',
    options: [
      'As bactérias decidem se adaptar ao medicamento.',
      'Bactérias resistentes já presentes sobrevivem e se multiplicam.',
      'O antibiótico cria a mutação.',
      'As bactérias ensinam umas às outras.',
    ],
    answer: 1,
    why: 'Seleção, não indução: o antibiótico elimina as sensíveis e deixa campo livre para as que já tinham a mutação. Por isso interromper o tratamento antes do fim seleciona resistentes.',
  }),
  pair(ID_EVO, 2, {
    stem: 'Relacione cada evidência ao que ela demonstra.',
    leftLabel: 'Evidência',
    rightLabel: 'Demonstra',
    left: ['Órgãos homólogos', 'Órgãos análogos', 'Fósseis em camadas datadas', 'Semelhança de DNA entre espécies'],
    right: ['Convergência adaptativa por pressão semelhante', 'Ancestralidade comum com origem embrionária igual', 'Grau de parentesco mensurável', 'Sucessão temporal das formas de vida'],
    answer: [1, 0, 3, 2],
    why: 'Homologia (asa de morcego e braço humano) aponta ancestral comum; analogia (asa de inseto e de ave) aponta pressão seletiva parecida em linhagens distintas.',
  }),
  mcq(ID_EVO, 3, {
    stem: 'O gráfico mostra a frequência de uma variante em uma população após aplicação de inseticida. A explicação evolutiva é:',
    figure: { type: 'chart', chart: bars(['Geração 1', 'Geração 3', 'Geração 5', 'Geração 7'], [4, 18, 52, 87], { title: 'Frequência da variante resistente (%)', yLabel: '%' }) },
    options: [
      'Mutação dirigida pelo inseticida',
      'Seleção direcional a favor da variante resistente',
      'Deriva genética aleatória',
      'Especiação alopátrica',
    ],
    answer: 1,
    why: 'A pressão seletiva favorece um extremo da variação e a frequência sobe geração após geração: seleção direcional, o mesmo mecanismo da resistência bacteriana.',
  }),
  mcq(ID_EVO, 3, {
    stem: 'A especiação alopátrica exige:',
    options: [
      'Isolamento geográfico seguido de isolamento reprodutivo.',
      'Mudança simultânea em todos os indivíduos.',
      'Hibridização entre gêneros diferentes.',
      'Ausência total de mutações.',
    ],
    answer: 0,
    why: 'Uma barreira separa as populações, que acumulam diferenças até não mais se cruzarem — mesmo que a barreira desapareça.',
  }),
];

/* ---------- experimentos ---------- */
const ID_EXP = `${S}.experimentos`;

const experimentos: Item[] = [
  mcq(ID_EXP, 1, {
    stem: 'A tabela mostra a produção de oxigênio por uma planta aquática sob diferentes intensidades luminosas. Conclui-se que:',
    figure: {
      type: 'table',
      head: ['Luz (unidades)', 'Bolhas de O₂ por minuto'],
      rows: [['0', '0'], ['2', '9'], ['4', '18'], ['6', '26'], ['8', '27'], ['10', '27']],
    },
    options: [
      'A fotossíntese cresce com a luz até atingir um ponto de saturação.',
      'A luz não influencia a fotossíntese.',
      'A planta respira mais no escuro.',
      'A produção de O₂ é sempre proporcional à luz.',
    ],
    answer: 0,
    why: 'Cresce até cerca de 6 unidades e estabiliza: a partir daí outro fator (CO₂, temperatura, enzimas) passa a ser o limitante.',
  }),
  mcq(ID_EXP, 2, {
    stem: 'Em um teste de nova vacina, o grupo placebo serve para:',
    options: [
      'Aumentar o número de vacinados.',
      'Permitir comparação com um grupo semelhante que não recebeu o princípio ativo.',
      'Reduzir o custo da pesquisa.',
      'Garantir que todos fiquem imunes.',
    ],
    answer: 1,
    why: 'Sem grupo de comparação não é possível separar o efeito da vacina do curso natural da doença e do efeito placebo.',
  }),
  mcq(ID_EXP, 2, {
    stem: 'Um experimento com sementes em estufa deve manter constantes:',
    options: [
      'Todas as variáveis, exceto a que está sendo testada.',
      'Nenhuma variável, para simular o ambiente natural.',
      'Apenas a temperatura.',
      'Somente o número de sementes.',
    ],
    answer: 0,
    why: 'Isolar a variável independente é o que torna a conclusão atribuível a ela. Duas mudanças simultâneas tornam o resultado ambíguo.',
  }),
  mcq(ID_EXP, 3, {
    stem: 'Um estudo observou que pessoas que tomam mais café têm mais infartos. Antes de concluir causalidade, é preciso:',
    options: [
      'Nada: a associação já prova a causa.',
      'Controlar fatores de confusão, como tabagismo e estresse.',
      'Aumentar apenas o tamanho da amostra.',
      'Repetir o estudo com os mesmos participantes.',
    ],
    answer: 1,
    why: 'Quem toma muito café frequentemente fuma ou dorme pouco. Sem controlar essas variáveis, a associação pode ser inteiramente espúria.',
  }),
  mcq(ID_EXP, 3, {
    stem: 'Em um experimento com enzimas, a atividade cai bruscamente acima de 50 °C porque:',
    options: [
      'As enzimas são consumidas na reação.',
      'A estrutura tridimensional se desnatura e o sítio ativo se perde.',
      'O substrato evapora.',
      'A reação passa a ser espontânea.',
    ],
    answer: 1,
    why: 'Enzima é proteína: calor rompe as interações que sustentam sua forma. Sem o encaixe do sítio ativo, não há catálise — e o processo geralmente é irreversível.',
  }),
];

export const BIOLOGIA: Skill[] = [
  skill(S, 'genetica', { name: 'Genética', blurb: 'Cruzamentos, herança ligada ao sexo, Hardy-Weinberg e epigenética.', kind: 'mcq', game: 'Decisão', bank: genetica }),
  skill(S, 'ecologia', { name: 'Ecologia', blurb: 'Cadeias, relações ecológicas, pirâmides e impactos.', kind: 'classify', game: 'Triagem', bank: ecologia }),
  skill(S, 'fisiologia', { name: 'Fisiologia', blurb: 'Órgãos, hormônios e regulação do corpo humano.', kind: 'pair', game: 'Conexão', bank: fisiologia }),
  skill(S, 'evolucao', { name: 'Evolução', blurb: 'Seleção natural, evidências e especiação.', kind: 'mcq', game: 'Decisão', bank: evolucao }),
  skill(S, 'experimentos', { name: 'Interpretação de experimentos', blurb: 'Controles, variáveis, causalidade e leitura de dados.', kind: 'mcq', game: 'Leitura', bank: experimentos }),
];
