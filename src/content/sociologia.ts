import type { Item, Skill } from '../core/types';
import { bars, lines } from './figures';
import { classify, mcq, pair, skill } from './kit';

const S = 'sociologia';

const ID_CONC = `${S}.conceitos`;

const conceitos: Item[] = [
  pair(ID_CONC, 1, {
    stem: 'Relacione cada conceito à sua definição.',
    leftLabel: 'Conceito',
    rightLabel: 'Definição',
    left: ['Socialização', 'Estratificação social', 'Anomia', 'Mobilidade social'],
    right: ['Divisão da sociedade em camadas com acesso desigual a recursos', 'Processo de internalização de normas e valores do grupo', 'Deslocamento de indivíduos entre posições sociais', 'Enfraquecimento das normas que regulam a conduta'],
    answer: [1, 0, 3, 2],
    why: 'São ferramentas de leitura da desigualdade: como se aprende a viver em sociedade, como ela se organiza em camadas e o que acontece quando as normas falham.',
  }),
  classify(ID_CONC, 2, {
    stem: 'Separe cada exemplo pelo tipo de instituição social.',
    groups: ['Instituição primária', 'Instituição secundária'],
    things: [
      { t: 'Família', g: 0 }, { t: 'Empresa', g: 1 },
      { t: 'Grupo de amigos de infância', g: 0 }, { t: 'Sindicato', g: 1 },
      { t: 'Vizinhança próxima', g: 0 }, { t: 'Partido político', g: 1 },
    ],
    why: 'Grupos primários têm vínculo afetivo e contato direto; os secundários são formais, instrumentais e organizados por objetivos.',
  }),
  mcq(ID_CONC, 2, {
    stem: 'O conceito de "fato social" em Durkheim designa:',
    options: [
      'Qualquer acontecimento noticiado.',
      'Formas de agir e pensar exteriores ao indivíduo e dotadas de poder coercitivo.',
      'Escolhas puramente individuais.',
      'Fenômenos biológicos.',
    ],
    answer: 1,
    why: 'Exterioridade, coerção e generalidade são os três traços. A língua que falamos é o exemplo mais claro: não a escolhemos e não podemos ignorá-la.',
  }),
  mcq(ID_CONC, 3, {
    stem: 'A noção de "capital cultural", de Bourdieu, ajuda a explicar que:',
    options: [
      'A escola reproduz desigualdades ao premiar repertórios já trazidos de casa.',
      'A escola é integralmente meritocrática.',
      'A cultura não influencia a trajetória escolar.',
      'O capital cultural se compra diretamente.',
    ],
    answer: 0,
    why: 'Quem chega com leitura, museu e vocabulário legitimado é recompensado como se fosse mérito individual — o ponto de partida desigual permanece invisível.',
  }),
];

const ID_AUT = `${S}.autores`;

const autores: Item[] = [
  pair(ID_AUT, 1, {
    stem: 'Relacione cada clássico da sociologia ao seu conceito central.',
    leftLabel: 'Autor',
    rightLabel: 'Conceito',
    left: ['Durkheim', 'Weber', 'Marx', 'Bourdieu'],
    right: ['Luta de classes e mais-valia', 'Fato social e solidariedade', 'Habitus e capital cultural', 'Ação social e tipos de dominação'],
    answer: [1, 3, 0, 2],
    why: 'Os três clássicos partem de perguntas diferentes: o que mantém a sociedade unida (Durkheim), o que move o indivíduo (Weber), o que produz o conflito (Marx).',
  }),
  pair(ID_AUT, 2, {
    stem: 'Relacione cada intérprete do Brasil à sua tese.',
    leftLabel: 'Autor',
    rightLabel: 'Tese',
    left: ['Gilberto Freyre', 'Sérgio Buarque de Holanda', 'Florestan Fernandes', 'Darcy Ribeiro'],
    right: ['O "homem cordial" e a confusão entre público e privado', 'Formação do povo brasileiro como novo gênero de gente', 'Miscigenação como chave da formação social brasileira', 'A ordem racial persistente após a abolição'],
    answer: [2, 0, 3, 1],
    why: 'Quatro leituras em disputa sobre a mesma sociedade — e Florestan é quem desmonta a ideia de democracia racial.',
  }),
  mcq(ID_AUT, 2, {
    stem: 'Para Weber, a dominação racional-legal se legitima:',
    options: [
      'Pela tradição herdada.',
      'Por regras impessoais e cargos definidos em lei.',
      'Pelo carisma de um líder.',
      'Pela força física apenas.',
    ],
    answer: 1,
    why: 'É o tipo puro da burocracia moderna: obedece-se ao cargo, não à pessoa. Os outros dois tipos são a dominação tradicional e a carismática.',
  }),
  mcq(ID_AUT, 3, {
    stem: 'A crítica de Florestan Fernandes à "democracia racial" sustenta que:',
    options: [
      'O Brasil superou o racismo com a abolição.',
      'A ausência de leis segregacionistas convive com desigualdade racial estrutural.',
      'Não houve escravidão no Brasil.',
      'A raça não tem relevância sociológica.',
    ],
    answer: 1,
    why: 'Sem apartheid legal, o mito da convivência harmoniosa encobriu a exclusão do negro do mercado de trabalho livre — desigualdade que os dados seguem confirmando.',
  }),
];

const ID_BR = `${S}.brasil`;

const brasil: Item[] = [
  mcq(ID_BR, 1, {
    stem: 'O gráfico sustenta qual afirmação?',
    figure: { type: 'chart', chart: bars(['Branca', 'Preta', 'Parda', 'Indígena'], [3.1, 6.4, 6.1, 5.8], { title: 'Taxa de desocupação por cor/raça (%) — dados ilustrativos', yLabel: '%' }) },
    options: [
      'A desocupação atinge os grupos de forma desigual.',
      'Não há diferença entre os grupos.',
      'A desocupação é maior entre pessoas brancas.',
      'O gráfico mede escolaridade.',
    ],
    answer: 0,
    why: 'A taxa entre pretos e pardos é cerca do dobro da observada entre brancos — desigualdade estrutural, não variação aleatória.',
  }),
  mcq(ID_BR, 2, {
    stem: 'As políticas de ação afirmativa se justificam sociologicamente por:',
    options: [
      'Reconhecer que a igualdade formal não corrige desigualdades históricas acumuladas.',
      'Substituir o mérito por sorteio.',
      'Ignorar dados sobre desigualdade.',
      'Reduzir o número de vagas nas universidades.',
    ],
    answer: 0,
    why: 'Tratar como iguais quem parte de posições desiguais preserva a desigualdade. A cota é mecanismo de correção do ponto de partida.',
  }),
  mcq(ID_BR, 2, {
    stem: 'A "cidadania regulada", conceito aplicado ao Brasil varguista, indica que:',
    options: [
      'Os direitos estavam vinculados à ocupação reconhecida em lei.',
      'Todos os cidadãos tinham direitos iguais.',
      'Os direitos políticos precediam os sociais.',
      'Não havia legislação trabalhista.',
    ],
    answer: 0,
    why: 'Quem tinha carteira assinada em profissão regulamentada era cidadão pleno; trabalhador rural e informal ficava fora. Direito virava privilégio de categoria.',
  }),
  mcq(ID_BR, 3, {
    stem: 'O gráfico mostra a evolução da população urbana brasileira. A principal consequência social do processo foi:',
    figure: { type: 'chart', chart: lines(['1940', '1960', '1980', '2000', '2020'], [{ name: 'População urbana (%)', values: [31, 45, 67, 81, 87] }], { title: 'Taxa de urbanização (%) — dados aproximados', yLabel: '%' }) },
    options: [
      'Crescimento das periferias sem infraestrutura proporcional.',
      'Queda da população total do país.',
      'Fim da desigualdade regional.',
      'Redução da demanda por transporte público.',
    ],
    answer: 0,
    why: 'A urbanização brasileira foi rápida e sem planejamento habitacional: em 80 anos o país inverteu sua composição, e a cidade que cresceu foi majoritariamente a informal.',
  }),
  mcq(ID_BR, 3, {
    stem: 'Chamar a violência urbana de fenômeno "multicausal" significa reconhecer que:',
    options: [
      'Ela decorre da combinação de desigualdade, ausência do Estado, mercados ilegais e fatores institucionais.',
      'Ela tem causa única e biológica.',
      'Ela não pode ser estudada cientificamente.',
      'Ela independe de política pública.',
    ],
    answer: 0,
    why: 'Explicações de causa única — pobreza sozinha, ou caráter individual — não sustentam os dados. O enfrentamento eficaz também é multicausal.',
  }),
];

const ID_ARG = `${S}.argumentos`;

const argumentos: Item[] = [
  mcq(ID_ARG, 2, {
    stem: 'Um pesquisador conclui que "morar em periferia causa baixo desempenho escolar". O principal problema desse enunciado é:',
    options: [
      'Confundir correlação com causalidade e ignorar variáveis como oferta escolar e renda.',
      'Usar dados quantitativos.',
      'Estudar periferias.',
      'Ter amostra grande demais.',
    ],
    answer: 0,
    why: 'O território concentra outras carências. Sem controlá-las, atribui-se ao endereço o efeito de um conjunto de privações.',
  }),
  classify(ID_ARG, 2, {
    stem: 'Separe cada instrumento pela abordagem de pesquisa.',
    groups: ['Quantitativa', 'Qualitativa'],
    things: [
      { t: 'Survey com amostra representativa', g: 0 },
      { t: 'Entrevista em profundidade', g: 1 },
      { t: 'Censo demográfico', g: 0 },
      { t: 'Observação participante', g: 1 },
      { t: 'Análise estatística de séries históricas', g: 0 },
      { t: 'História de vida', g: 1 },
    ],
    why: 'A quantitativa mede extensão e permite generalizar; a qualitativa capta sentido e profundidade. Boas pesquisas frequentemente combinam as duas.',
  }),
  mcq(ID_ARG, 3, {
    stem: 'O "estranhamento" e a "desnaturalização", como posturas sociológicas, exigem:',
    options: [
      'Tratar como problema aquilo que parece óbvio e natural no cotidiano.',
      'Rejeitar toda teoria prévia.',
      'Estudar apenas sociedades distantes.',
      'Evitar o trabalho de campo.',
    ],
    answer: 0,
    why: 'Perguntar por que a divisão do trabalho doméstico é "natural", por exemplo, é transformar o hábito em objeto de análise.',
  }),
  mcq(ID_ARG, 3, {
    stem: 'A crítica ao etnocentrismo defende que:',
    options: [
      'Toda prática cultural deve ser compreendida em seu próprio contexto, o que não impede a crítica a violações de direitos.',
      'Todas as práticas são igualmente aceitáveis, sem exceção.',
      'A própria cultura é sempre superior.',
      'Não se deve estudar outras culturas.',
    ],
    answer: 0,
    why: 'Relativizar é método de compreensão, não renúncia ao juízo. Compreender o contexto e sustentar direitos humanos não são posições incompatíveis.',
  }),
];

export const SOCIOLOGIA: Skill[] = [
  skill(S, 'conceitos', { name: 'Associação de conceitos', blurb: 'Fato social, estratificação, habitus e instituições.', kind: 'pair', game: 'Conexão', bank: conceitos }),
  skill(S, 'autores', { name: 'Autores e intérpretes', blurb: 'Clássicos e intérpretes do Brasil, cada um com sua pergunta.', kind: 'pair', game: 'Conexão', bank: autores }),
  skill(S, 'brasil', { name: 'Sociedade brasileira', blurb: 'Desigualdade, cidadania, urbanização e políticas públicas.', kind: 'mcq', game: 'Leitura', bank: brasil }),
  skill(S, 'argumentos', { name: 'Interpretação de argumentos', blurb: 'Método, causalidade e desnaturalização do óbvio.', kind: 'mcq', game: 'Decisão', bank: argumentos }),
];
