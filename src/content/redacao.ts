import type { Item, Skill } from '../core/types';
import { classify, mcq, order, pair, skill } from './kit';

const S = 'redacao';

/* ---------- competências ---------- */
const ID_COMP = `${S}.competencias`;

const competencias: Item[] = [
  classify(ID_COMP, 1, {
    stem: 'Separe cada problema pela competência do ENEM que ele compromete.',
    groups: ['C1 — norma culta', 'C2 — tema e repertório', 'C4 — coesão'],
    things: [
      { t: 'Erros recorrentes de concordância', g: 0 },
      { t: 'Texto que discute assunto vizinho, mas não o tema proposto', g: 1 },
      { t: 'Parágrafos sem conectivos entre si', g: 2 },
      { t: 'Desvios sistemáticos de ortografia', g: 0 },
      { t: 'Ausência de repertório legitimado', g: 1 },
      { t: 'Repetição do mesmo termo sem retomada pronominal', g: 2 },
    ],
    why: 'Saber a qual competência cada erro pertence é o que permite corrigir a redação por prioridade em vez de reescrever tudo no escuro.',
  }),
  pair(ID_COMP, 2, {
    stem: 'Relacione cada competência ao que ela avalia.',
    leftLabel: 'Competência',
    rightLabel: 'Avalia',
    left: ['Competência 1', 'Competência 3', 'Competência 4', 'Competência 5'],
    right: ['Seleção e organização de argumentos em defesa de um ponto de vista', 'Proposta de intervenção detalhada e respeitosa aos direitos humanos', 'Domínio da norma culta escrita', 'Mecanismos linguísticos de coesão'],
    answer: [2, 0, 3, 1],
    why: 'C2 é compreensão do tema e uso de repertório; C3 é projeto argumentativo; C4 é coesão; C5 é intervenção. Cada uma vale 200 pontos.',
  }),
  mcq(ID_COMP, 2, {
    stem: 'Uma redação com excelente argumentação, mas sem proposta de intervenção, perde pontos em:',
    options: ['Competência 1', 'Competência 3', 'Competência 5', 'Competência 2'],
    answer: 2,
    why: 'A C5 é independente das demais: sem proposta, zera-se essa competência ainda que o texto seja bem escrito e bem argumentado.',
  }),
  mcq(ID_COMP, 3, {
    stem: 'Uma redação recebe nota zero quando:',
    options: [
      'Apresenta poucos erros gramaticais.',
      'Foge ao tema, desrespeita os direitos humanos ou não atende ao tipo dissertativo-argumentativo.',
      'Usa repertório pouco comum.',
      'Tem menos de 30 linhas.',
    ],
    answer: 1,
    why: 'Fuga ao tema, tipo textual inadequado, desrespeito aos direitos humanos, texto insuficiente (até 7 linhas) e cópia dos textos motivadores são as situações de anulação.',
  }),
];

/* ---------- tese e projeto de texto ---------- */
const ID_TESE = `${S}.tese`;

const tese: Item[] = [
  mcq(ID_TESE, 1, {
    stem: 'Tema: "Desafios para a democratização do acesso à água potável no Brasil". Qual é a melhor tese?',
    options: [
      'A água é um recurso natural essencial à vida humana.',
      'A desigualdade no acesso à água decorre da ausência de investimento em saneamento e da má gestão hídrica, o que aprofunda vulnerabilidades sociais.',
      'Muitas pessoas não têm água em casa.',
      'A água potável é um assunto muito importante e polêmico.',
    ],
    answer: 1,
    why: 'Tese é posicionamento com direção argumentativa: aponta causas e consequência. As outras alternativas são constatações genéricas que não guiam parágrafo nenhum.',
  }),
  mcq(ID_TESE, 2, {
    stem: 'Tema: "O papel do algoritmo na formação da opinião pública". Qual introdução tem melhor projeto de texto?',
    options: [
      'Desde os primórdios da humanidade, a comunicação sempre foi importante para o ser humano.',
      'O algoritmo é um conjunto de instruções computacionais amplamente utilizado hoje.',
      'Ao priorizar o engajamento sobre a precisão, os sistemas de recomendação estreitam o repertório informativo do usuário e fragilizam o debate público — problema sustentado tanto pelo modelo de negócio das plataformas quanto pela ausência de regulação.',
      'Neste texto, falaremos sobre algoritmos e opinião pública.',
    ],
    answer: 2,
    why: 'Só a terceira anuncia tese e os dois eixos que serão desenvolvidos. "Desde os primórdios" e "neste texto falaremos" são clichês que não organizam nada.',
  }),
  mcq(ID_TESE, 2, {
    stem: 'Um bom parágrafo de desenvolvimento se organiza, tipicamente, como:',
    options: [
      'Tópico frasal → fundamentação (repertório ou dado) → análise → fechamento que liga à tese.',
      'Três exemplos em sequência, sem comentário.',
      'Uma pergunta retórica seguida de outra.',
      'Repetição da introdução com outras palavras.',
    ],
    answer: 0,
    why: 'O erro mais comum é parar na fundamentação: citar um autor e não explicar por que aquilo sustenta a tese. A análise é o que vale ponto na C3.',
  }),
  mcq(ID_TESE, 3, {
    stem: 'Qual trecho apresenta argumento — e não apenas opinião?',
    options: [
      'A educação no Brasil é péssima e todos sabem disso.',
      'A evasão escolar no ensino médio ultrapassa a média das demais etapas, o que indica que o problema se concentra na fase em que o jovem precisa conciliar estudo e trabalho.',
      'Eu acho que a escola deveria ser melhor.',
      'É inadmissível o que acontece nas escolas brasileiras.',
    ],
    answer: 1,
    why: 'Argumento é proposição sustentada por evidência e ligada a uma conclusão. As demais são juízos sem base explicitada.',
  }),
];

/* ---------- repertório ---------- */
const ID_REP = `${S}.repertorio`;

const repertorio: Item[] = [
  pair(ID_REP, 1, {
    stem: 'Relacione cada repertório ao tema em que ele é pertinente.',
    leftLabel: 'Repertório',
    rightLabel: 'Tema',
    left: ['Artigo 5º da Constituição Federal', 'Conceito de indústria cultural (Adorno)', 'Lei Maria da Penha', 'Conceito de fato social (Durkheim)'],
    right: ['Padronização do consumo cultural e mídia', 'Comportamentos coletivos e normas sociais', 'Igualdade formal e direitos fundamentais', 'Violência doméstica contra a mulher'],
    answer: [2, 0, 3, 1],
    why: 'Repertório vale ponto quando é pertinente e produtivo. Citar Durkheim num texto sobre violência doméstica sem articular o conceito é repertório decorativo.',
  }),
  mcq(ID_REP, 2, {
    stem: 'Um repertório é considerado "produtivo" quando:',
    options: [
      'É citado e articulado à discussão, sustentando o argumento.',
      'É apenas mencionado no fim do parágrafo.',
      'Vem de autor pouco conhecido.',
      'É copiado do texto motivador.',
    ],
    answer: 0,
    why: 'Legitimado + pertinente + articulado. Só o terceiro critério separa a nota 160 da 200 na C2.',
  }),
  mcq(ID_REP, 2, {
    stem: 'Usar exclusivamente os textos motivadores como base argumentativa:',
    options: [
      'É a estratégia ideal.',
      'Limita a nota, pois a prova valoriza repertório externo pertinente.',
      'Zera a redação automaticamente.',
      'É obrigatório.',
    ],
    answer: 1,
    why: 'Os textos motivadores contextualizam o tema. Cópia deles é desconsiderada na contagem de linhas, e depender só deles impede a nota alta em C2.',
  }),
  mcq(ID_REP, 3, {
    stem: 'Tema: "Caminhos para conter a desinformação no ambiente digital". O repertório mais produtivo seria:',
    options: [
      'Uma frase motivacional sobre a importância da verdade.',
      'O conceito de esfera pública (Habermas), articulado à degradação do debate racional nas plataformas.',
      'A citação de um provérbio popular.',
      'A menção genérica de que "a internet mudou tudo".',
    ],
    answer: 1,
    why: 'Conceito legitimado, diretamente articulado ao problema e capaz de sustentar a análise — é exatamente o que a C2 pede.',
  }),
];

/* ---------- proposta de intervenção ---------- */
const ID_INT = `${S}.intervencao`;

const intervencao: Item[] = [
  mcq(ID_INT, 1, {
    stem: 'Uma proposta de intervenção completa deve conter:',
    options: [
      'Agente, ação, meio, finalidade e detalhamento.',
      'Apenas a ação desejada.',
      'Uma frase de efeito sobre o futuro.',
      'A repetição da tese.',
    ],
    answer: 0,
    why: 'Os cinco elementos valem ponto na C5. Faltando o detalhamento, a nota máxima já fica fora de alcance.',
  }),
  mcq(ID_INT, 2, {
    stem: 'Qual proposta está mais completa?',
    options: [
      'É preciso que a sociedade reflita sobre o problema.',
      'O Ministério da Educação deve criar, por meio de parceria com as secretarias estaduais, um programa de formação continuada de professores em educação midiática, a fim de capacitar docentes a trabalhar checagem de informação em sala de aula.',
      'O governo deve resolver a questão o quanto antes.',
      'As escolas precisam melhorar.',
    ],
    answer: 1,
    why: 'Agente (MEC), ação (criar programa), meio (parceria com secretarias), finalidade (capacitar docentes) e detalhamento (checagem em sala). As demais não nomeiam sequer o agente.',
  }),
  order(ID_INT, 2, {
    stem: 'Ordene os elementos na sequência em que costumam aparecer numa proposta bem construída.',
    axis: 'primeiro → último',
    tokens: ['Meio ou modo de execução', 'Agente responsável', 'Finalidade', 'Ação a ser executada'],
    answer: [1, 3, 0, 2],
    why: 'Quem faz → o que faz → como faz → para quê. O detalhamento pode se acoplar a qualquer um deles.',
  }),
  mcq(ID_INT, 3, {
    stem: 'Uma proposta que sugere "punir severamente os responsáveis com métodos exemplares e fora da lei":',
    options: [
      'É válida por ser detalhada.',
      'Fere os direitos humanos e compromete a Competência 5 e a nota do texto.',
      'Ganha ponto por ser assertiva.',
      'É neutra.',
    ],
    answer: 1,
    why: 'O respeito aos direitos humanos é critério explícito da C5. Propostas que sugerem violência, tortura ou pena extralegal anulam a competência.',
  }),
  mcq(ID_INT, 3, {
    stem: 'A melhor forma de conectar a proposta ao restante do texto é:',
    options: [
      'Retomar o problema desenvolvido e apresentar a intervenção como resposta a ele.',
      'Introduzir um problema novo na conclusão.',
      'Repetir literalmente a introdução.',
      'Encerrar com pergunta retórica.',
    ],
    answer: 0,
    why: 'A conclusão fecha o projeto de texto: retoma o que foi discutido e converte a análise em ação. Tema novo no fim quebra a C3 e a C4.',
  }),
];

/* ---------- estrutura ---------- */
const ID_EST = `${S}.estrutura`;

const estrutura: Item[] = [
  order(ID_EST, 1, {
    stem: 'Ordene as partes de uma dissertação-argumentativa.',
    axis: 'início → fim',
    tokens: ['Segundo argumento', 'Introdução com tese', 'Conclusão com proposta de intervenção', 'Primeiro argumento'],
    answer: [1, 3, 0, 2],
    why: 'A estrutura em quatro ou cinco parágrafos é convenção, não regra — mas garante que cada função apareça no lugar esperado pelo corretor.',
  }),
  order(ID_EST, 2, {
    stem: 'Ordene as partes internas de um parágrafo de desenvolvimento.',
    axis: 'início → fim',
    tokens: ['Análise que liga a fundamentação à tese', 'Tópico frasal com o argumento do parágrafo', 'Fechamento que prepara o próximo parágrafo', 'Fundamentação: dado, conceito ou fato'],
    answer: [1, 3, 0, 2],
    why: 'Sem tópico frasal, o corretor não identifica o argumento; sem análise, o repertório fica solto. As duas falhas custam pontos na C3.',
  }),
  mcq(ID_EST, 2, {
    stem: 'O uso de primeira pessoa do singular ("eu acho") na dissertação:',
    options: [
      'É recomendado para marcar posicionamento.',
      'Deve ser evitado: a impessoalidade reforça a objetividade exigida pelo gênero.',
      'Zera a redação.',
      'É indiferente.',
    ],
    answer: 1,
    why: 'O posicionamento aparece na força do argumento, não no pronome. "Eu acho" enfraquece a tese ao transformá-la em preferência pessoal.',
  }),
  mcq(ID_EST, 3, {
    stem: 'Em relação à extensão, a orientação mais adequada é:',
    options: [
      'Escrever o máximo de linhas possível.',
      'Desenvolver entre 25 e 30 linhas, com parágrafos equilibrados e nenhum trecho de enchimento.',
      'Escrever exatamente 7 linhas.',
      'A extensão não influencia em nada.',
    ],
    answer: 1,
    why: 'Texto com até 7 linhas é anulado; acima disso, o que conta é densidade. Parágrafo longo cheio de repetição prejudica C3 e C4.',
  }),
];

export const REDACAO: Skill[] = [
  skill(S, 'competencias', { name: 'As cinco competências', blurb: 'Saber o que cada competência mede e onde você perde ponto.', kind: 'classify', game: 'Triagem', bank: competencias }),
  skill(S, 'tese', { name: 'Tese e projeto de texto', blurb: 'Transformar tema em posicionamento com direção argumentativa.', kind: 'mcq', game: 'Decisão', bank: tese }),
  skill(S, 'repertorio', { name: 'Repertório sociocultural', blurb: 'Escolher repertório pertinente e articulá-lo ao argumento.', kind: 'pair', game: 'Conexão', bank: repertorio }),
  skill(S, 'intervencao', { name: 'Proposta de intervenção', blurb: 'Agente, ação, meio, finalidade e detalhamento.', kind: 'mcq', game: 'Decisão', bank: intervencao }),
  skill(S, 'estrutura', { name: 'Estrutura do texto', blurb: 'Montar parágrafo e texto na ordem que o corretor espera.', kind: 'order', game: 'Sequência', bank: estrutura }),
];
