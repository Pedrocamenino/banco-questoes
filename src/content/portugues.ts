import type { Item, Skill } from '../core/types';
import { classify, mcq, pair, skill } from './kit';

const S = 'portugues';

/* ---------- interpretação textual ---------- */
const ID_INT = `${S}.interpretacao`;

const interpretacao: Item[] = [
  mcq(ID_INT, 1, {
    stem: 'A finalidade principal do texto é:',
    figure: {
      type: 'text',
      title: 'Aviso em mural de condomínio',
      body: 'Prezados moradores: a manutenção dos elevadores ocorrerá na terça-feira, das 8h às 14h. Durante o período, apenas o elevador social estará em operação. Pedimos que programem entregas e mudanças para outro dia.',
    },
    options: ['Convencer o leitor a mudar de opinião', 'Informar e orientar uma conduta', 'Narrar um acontecimento', 'Comover o leitor'],
    answer: 1,
    why: 'O texto informa a data e orienta o que fazer ("pedimos que programem"). Função referencial com traço apelativo, sem argumentação nem narrativa.',
  }),
  mcq(ID_INT, 1, {
    stem: 'A palavra "lá", no poema, refere-se a:',
    figure: {
      type: 'text',
      title: 'Canção do exílio',
      source: 'Gonçalves Dias (1843) — domínio público',
      body: 'Minha terra tem palmeiras,\nOnde canta o Sabiá;\nAs aves, que aqui gorjeiam,\nNão gorjeiam como lá.',
    },
    options: ['Ao lugar onde o eu lírico está', 'À terra natal, de onde o eu lírico está distante', 'A um lugar imaginário', 'Ao futuro'],
    answer: 1,
    why: 'O par aqui/lá organiza o poema: "aqui" é o exílio, "lá" é a terra natal idealizada. É dêixis — o sentido depende de quem fala e de onde.',
  }),
  mcq(ID_INT, 2, {
    stem: 'A ironia do trecho está em:',
    figure: {
      type: 'text',
      title: 'Crônica',
      source: 'Texto autoral',
      body: 'A cidade resolveu enfim combater o trânsito. Construiu mais duas faixas, alargou a avenida, derrubou vinte árvores e, três meses depois, comemorou: agora o congestionamento cabe confortavelmente em seis faixas em vez de quatro.',
    },
    options: [
      'Na descrição técnica das obras.',
      'No contraste entre a solução anunciada e o resultado obtido.',
      'No uso de linguagem regional.',
      'Na citação de dados estatísticos.',
    ],
    answer: 1,
    why: 'Ironia é dizer o contrário do que se quer significar: "comemorou" e "confortavelmente" expõem o fracasso da medida sem precisar afirmá-lo.',
  }),
  mcq(ID_INT, 2, {
    stem: 'A tese defendida pelo autor é:',
    figure: {
      type: 'text',
      title: 'Artigo de opinião',
      source: 'Texto autoral',
      body: 'Dizem que o brasileiro não lê. Mas o brasileiro lê o dia inteiro: lê mensagem, legenda, manchete, contrato de aluguel. O que falta não é o hábito de decifrar palavras — é o tempo, o silêncio e o acesso ao livro. Culpar o leitor é a forma mais barata de não discutir política pública.',
    },
    options: [
      'O brasileiro não tem interesse pela leitura.',
      'A baixa leitura de livros decorre de condições materiais, não de falta de vontade.',
      'A leitura digital substitui o livro com vantagem.',
      'Ler contratos equivale a ler literatura.',
    ],
    answer: 1,
    why: 'A tese está no penúltimo período: falta tempo, silêncio e acesso. O resto do texto é preparação e refutação do senso comum.',
  }),
  mcq(ID_INT, 3, {
    stem: 'Comparando os dois textos, é correto afirmar que:',
    figure: {
      type: 'text',
      title: 'Dois textos sobre o mesmo tema',
      source: 'Textos autorais',
      body: 'TEXTO I: "O aplicativo democratizou o transporte: qualquer pessoa com um carro pode trabalhar quando quiser."\n\nTEXTO II: "Qualquer pessoa com um carro pode trabalhar quando precisar — e precisa doze horas por dia para pagar o combustível, o financiamento e a manutenção que a plataforma não paga."',
    },
    options: [
      'Os dois textos defendem o mesmo ponto de vista.',
      'O Texto II reaproveita a estrutura do Texto I para inverter-lhe o sentido.',
      'O Texto I é narrativo e o II, descritivo.',
      'Nenhum dos dois apresenta posicionamento.',
    ],
    answer: 1,
    why: 'O Texto II repete a construção ("qualquer pessoa com um carro pode trabalhar") e troca "quando quiser" por "quando precisar", desmontando a ideia de liberdade. Retomar a forma do adversário para virá-la é recurso argumentativo clássico.',
  }),
  mcq(ID_INT, 3, {
    stem: 'O efeito de sentido produzido pelo último período é:',
    figure: {
      type: 'text',
      title: 'Notícia',
      source: 'Texto autoral',
      body: 'A prefeitura anunciou a reforma da praça, orçada em R$ 2 milhões. A obra deve durar oito meses. A praça havia sido reformada há dois anos.',
    },
    options: [
      'Reforçar a competência da gestão.',
      'Sugerir crítica por meio da simples justaposição de informações.',
      'Explicar tecnicamente o orçamento.',
      'Encerrar o texto com dado irrelevante.',
    ],
    answer: 1,
    why: 'Nenhuma palavra avaliativa é usada: o julgamento nasce da ordem em que os fatos são colocados. É o implícito construído por justaposição.',
  }),
];

/* ---------- figuras de linguagem ---------- */
const ID_FIG = `${S}.figuras`;

const figuras: Item[] = [
  pair(ID_FIG, 1, {
    stem: 'Relacione cada trecho à figura de linguagem que o caracteriza.',
    leftLabel: 'Trecho',
    rightLabel: 'Figura',
    left: ['"Seus olhos são duas jabuticabas"', '"Morri de rir a noite inteira"', '"O vento sussurrava entre as folhas"', '"Comprei um Machado de Assis"'],
    right: ['Hipérbole', 'Metonímia', 'Metáfora', 'Prosopopeia'],
    answer: [2, 0, 3, 1],
    why: 'Metáfora compara sem conectivo; hipérbole exagera; prosopopeia dá ação humana ao inanimado; metonímia troca a obra pelo autor.',
  }),
  pair(ID_FIG, 2, {
    stem: 'Relacione cada trecho à figura correspondente.',
    leftLabel: 'Trecho',
    rightLabel: 'Figura',
    left: ['"É um silêncio ensurdecedor"', '"Chorou lágrimas de sangue"', '"Vi a cena com meus próprios olhos"', '"Que belo dia para levar uma multa"'],
    right: ['Pleonasmo', 'Ironia', 'Paradoxo', 'Hipérbole'],
    answer: [2, 3, 0, 1],
    why: 'Paradoxo une ideias contraditórias; pleonasmo é redundância enfática; ironia diz o oposto do que significa.',
  }),
  mcq(ID_FIG, 2, {
    stem: 'Em "a praça inteira aplaudiu o discurso", ocorre:',
    options: ['Metáfora', 'Metonímia', 'Eufemismo', 'Anáfora'],
    answer: 1,
    why: 'O lugar substitui as pessoas que nele estavam — relação de contiguidade, marca da metonímia.',
  }),
  mcq(ID_FIG, 3, {
    stem: 'No verso "Ora (direis) ouvir estrelas! Certo / Perdeste o senso!", o recurso central é:',
    figure: { type: 'text', source: 'Olavo Bilac, Via Láctea (1888) — domínio público', body: 'Ora (direis) ouvir estrelas! Certo\nPerdeste o senso! E eu vos direi, no entanto,\nQue, para ouvi-las, muita vez desperto\nE abro as janelas, pálido de espanto...' },
    options: [
      'A incorporação da voz do interlocutor no próprio poema.',
      'A descrição objetiva do céu.',
      'A repetição de sons idênticos.',
      'A inversão da ordem cronológica.',
    ],
    answer: 0,
    why: 'O eu lírico traz para dentro do texto a objeção do outro ("direis") para depois respondê-la. O diálogo com o interlocutor sustenta todo o soneto.',
  }),
  mcq(ID_FIG, 3, {
    stem: 'A expressão "ele nos deixou" para dizer que alguém morreu é exemplo de:',
    options: ['Eufemismo', 'Hipérbole', 'Catacrese', 'Onomatopeia'],
    answer: 0,
    why: 'Eufemismo suaviza uma ideia dura. O oposto, o disfemismo, agrava deliberadamente.',
  }),
];

/* ---------- gêneros textuais ---------- */
const ID_GEN = `${S}.generos`;

const generos: Item[] = [
  classify(ID_GEN, 1, {
    stem: 'Separe cada gênero pela sua esfera de circulação.',
    groups: ['Jornalística', 'Literária', 'Escolar/acadêmica'],
    things: [
      { t: 'Notícia', g: 0 }, { t: 'Conto', g: 1 }, { t: 'Resumo acadêmico', g: 2 },
      { t: 'Editorial', g: 0 }, { t: 'Soneto', g: 1 }, { t: 'Relatório de experimento', g: 2 },
    ],
    why: 'O gênero se define pela situação de comunicação — quem escreve, para quem e com que finalidade —, não apenas pela forma do texto.',
  }),
  classify(ID_GEN, 2, {
    stem: 'Separe os gêneros pela tipologia textual predominante.',
    groups: ['Narrativo', 'Argumentativo', 'Injuntivo'],
    things: [
      { t: 'Crônica', g: 0 }, { t: 'Artigo de opinião', g: 1 }, { t: 'Receita culinária', g: 2 },
      { t: 'Relato pessoal', g: 0 }, { t: 'Carta de leitor', g: 1 }, { t: 'Manual de instruções', g: 2 },
    ],
    why: 'Tipologia é a estrutura interna (narrar, argumentar, instruir); gênero é a forma social concreta. Um mesmo gênero pode combinar tipologias.',
  }),
  mcq(ID_GEN, 2, {
    stem: 'A principal diferença entre notícia e editorial é que:',
    options: [
      'A notícia relata fatos; o editorial expressa a posição do veículo.',
      'A notícia é maior que o editorial.',
      'O editorial não circula em jornais.',
      'A notícia é sempre assinada.',
    ],
    answer: 0,
    why: 'Editorial é o único texto que fala em nome da instituição jornalística — por isso não é assinado por um repórter.',
  }),
  mcq(ID_GEN, 3, {
    stem: 'Um texto publicitário que usa hashtags, emojis e chamada para ação demonstra:',
    options: [
      'Adaptação do gênero ao suporte digital e ao público-alvo.',
      'Empobrecimento da língua portuguesa.',
      'Ausência de intenção comunicativa.',
      'Erro de registro.',
    ],
    answer: 0,
    why: 'O suporte molda o gênero. Avaliar como "erro" é confundir adequação comunicativa com norma gramatical.',
  }),
];

/* ---------- variação linguística ---------- */
const ID_VAR = `${S}.variacao`;

const variacao: Item[] = [
  mcq(ID_VAR, 1, {
    stem: 'A frase "nós vai chegar mais tarde" é um exemplo de:',
    options: [
      'Erro que compromete a comunicação.',
      'Variedade linguística com concordância não padrão, plenamente compreensível.',
      'Estrangeirismo.',
      'Ambiguidade sintática.',
    ],
    answer: 1,
    why: 'A comunicação se realiza integralmente. O que existe é diferença de variedade — adequada em contextos informais, inadequada em contextos que exigem a norma padrão.',
  }),
  mcq(ID_VAR, 2, {
    stem: 'O preconceito linguístico consiste em:',
    options: [
      'Corrigir textos escolares.',
      'Atribuir inferioridade a falantes por causa da variedade que usam.',
      'Ensinar a norma padrão.',
      'Reconhecer diferenças regionais.',
    ],
    answer: 1,
    why: 'O problema não é ensinar a norma — é hierarquizar pessoas pela forma de falar, o que na prática é discriminação social disfarçada de zelo gramatical.',
  }),
  mcq(ID_VAR, 2, {
    stem: 'Em uma entrevista de emprego, o registro mais adequado é:',
    options: ['Formal, por causa da situação e da relação entre os interlocutores.', 'Informal, para parecer espontâneo.', 'Regional, sempre.', 'Técnico, independentemente da área.'],
    answer: 0,
    why: 'Adequação é o critério: não existe registro melhor em abstrato, existe registro ajustado à situação.',
  }),
  mcq(ID_VAR, 3, {
    stem: 'A variação diacrônica é aquela que ocorre:',
    options: ['Entre regiões', 'Ao longo do tempo', 'Entre classes sociais', 'Entre situações de fala'],
    answer: 1,
    why: 'Diacrônica = tempo; diatópica = espaço; diastrática = grupo social; diafásica = situação. "Vossa mercê" virando "você" é diacronia.',
  }),
];

/* ---------- coesão e sentido ---------- */
const ID_COE = `${S}.coesao`;

const coesao: Item[] = [
  mcq(ID_COE, 1, {
    stem: 'Complete adequadamente: "Estudou muito, ____ não passou."',
    options: ['portanto', 'porque', 'contudo', 'assim'],
    answer: 2,
    why: 'A relação é de oposição entre esforço e resultado: exige conectivo adversativo.',
  }),
  mcq(ID_COE, 2, {
    stem: 'Em "A prefeitura notificou a empresa porque ela descumpriu o prazo", o pronome "ela" retoma:',
    options: ['A prefeitura', 'A empresa', 'O prazo', 'A notificação'],
    answer: 1,
    why: 'Quem descumpriu o prazo foi a notificada. A ambiguidade potencial se resolve pelo sentido — em texto formal, convém reescrever para evitá-la.',
  }),
  mcq(ID_COE, 2, {
    stem: 'O conectivo "à medida que" estabelece relação de:',
    options: ['Proporção', 'Conclusão', 'Concessão', 'Finalidade'],
    answer: 0,
    why: 'Indica progressão simultânea entre dois processos. Não confundir com "na medida em que", que é causal.',
  }),
  mcq(ID_COE, 3, {
    stem: 'Qual reescrita mantém o sentido de "Embora chovesse, a feira aconteceu"?',
    options: [
      'Porque chovia, a feira aconteceu.',
      'A feira aconteceu, apesar da chuva.',
      'Se chovesse, a feira aconteceria.',
      'A feira aconteceu, portanto choveu.',
    ],
    answer: 1,
    why: '"Embora" é concessivo: admite um obstáculo que não impediu o fato. "Apesar de" preserva exatamente essa relação.',
  }),
  mcq(ID_COE, 3, {
    stem: 'A repetição excessiva de "que" e de nomes ao longo de um parágrafo indica problema de:',
    options: ['Coesão referencial e progressão', 'Ortografia', 'Acentuação', 'Regência'],
    answer: 0,
    why: 'Faltam pronomes, sinônimos e elipses para retomar o já dito sem repetir — e é isso que a competência 4 da redação do ENEM avalia.',
  }),
];

export const PORTUGUES: Skill[] = [
  skill(S, 'interpretacao', { name: 'Interpretação textual', blurb: 'Tese, ironia, implícito e comparação entre textos.', kind: 'mcq', game: 'Leitura', bank: interpretacao }),
  skill(S, 'figuras', { name: 'Figuras de linguagem', blurb: 'Reconhecer o efeito, não só decorar o nome.', kind: 'pair', game: 'Conexão', bank: figuras }),
  skill(S, 'generos', { name: 'Gêneros textuais', blurb: 'Esfera de circulação, finalidade e tipologia.', kind: 'classify', game: 'Triagem', bank: generos }),
  skill(S, 'variacao', { name: 'Variação linguística', blurb: 'Registro, adequação e preconceito linguístico.', kind: 'mcq', game: 'Decisão', bank: variacao }),
  skill(S, 'coesao', { name: 'Coesão e sentido', blurb: 'Conectivos, retomadas e reescrita sem perder o sentido.', kind: 'mcq', game: 'Decisão', bank: coesao }),
];
