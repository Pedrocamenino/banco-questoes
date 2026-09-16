import type { Difficulty, Item, Skill } from '../core/types';
import { balance, classify, int, mcq, num, pair, pick, skill } from './kit';

const S = 'quimica';

/* ---------- balanceamento ---------- */
const ID_BAL = `${S}.balanceamento`;

const balanceamento: Item[] = [
  balance(ID_BAL, 1, {
    stem: 'Ajuste os coeficientes da síntese da água.',
    left: ['H₂', 'O₂'], right: ['H₂O'], answer: [2, 1, 2],
    why: 'Comece pelo oxigênio: o O₂ traz 2 átomos, então são precisas 2 moléculas de H₂O. Isso pede 4 H, ou seja, 2 H₂.',
  }),
  balance(ID_BAL, 1, {
    stem: 'Ajuste os coeficientes da síntese da amônia.',
    left: ['N₂', 'H₂'], right: ['NH₃'], answer: [1, 3, 2],
    why: 'Um N₂ fornece 2 N → 2 NH₃, que exigem 6 H → 3 H₂. É a reação de Haber-Bosch, base da produção de fertilizantes.',
  }),
  balance(ID_BAL, 2, {
    stem: 'Ajuste a combustão completa do metano.',
    left: ['CH₄', 'O₂'], right: ['CO₂', 'H₂O'], answer: [1, 2, 1, 2],
    why: 'Em combustão, deixe o O₂ por último: 1 C → 1 CO₂; 4 H → 2 H₂O; total de 4 O do lado direito → 2 O₂.',
  }),
  balance(ID_BAL, 2, {
    stem: 'Ajuste a formação da ferrugem.',
    left: ['Fe', 'O₂'], right: ['Fe₂O₃'], answer: [4, 3, 2],
    why: 'Use 2 Fe₂O₃ para ter 6 O (= 3 O₂) e 4 Fe. Quando o número de átomos fica ímpar, dobrar o produto resolve.',
  }),
  balance(ID_BAL, 2, {
    stem: 'Ajuste a decomposição do clorato de potássio.',
    left: ['KClO₃'], right: ['KCl', 'O₂'], answer: [2, 2, 3],
    why: '2 KClO₃ trazem 6 O, que formam 3 O₂. K e Cl acompanham com coeficiente 2.',
  }),
  balance(ID_BAL, 3, {
    stem: 'Ajuste a combustão completa do propano.',
    left: ['C₃H₈', 'O₂'], right: ['CO₂', 'H₂O'], answer: [1, 5, 3, 4],
    why: '3 C → 3 CO₂ (6 O); 8 H → 4 H₂O (4 O). Total 10 O → 5 O₂.',
  }),
  balance(ID_BAL, 3, {
    stem: 'Ajuste a reação do alumínio com ácido clorídrico.',
    left: ['Al', 'HCl'], right: ['AlCl₃', 'H₂'], answer: [2, 6, 2, 3],
    why: '2 Al → 2 AlCl₃ exigem 6 Cl, logo 6 HCl, cujos 6 H formam 3 H₂.',
  }),
  balance(ID_BAL, 3, {
    stem: 'Ajuste a neutralização entre hidróxido de sódio e ácido sulfúrico.',
    left: ['NaOH', 'H₂SO₄'], right: ['Na₂SO₄', 'H₂O'], answer: [2, 1, 1, 2],
    why: 'O sulfato exige 2 Na, então 2 NaOH. Os 2 H do ácido mais as 2 hidroxilas formam 2 H₂O.',
  }),
  balance(ID_BAL, 3, {
    stem: 'Ajuste a reação do calcário com ácido clorídrico.',
    left: ['CaCO₃', 'HCl'], right: ['CaCl₂', 'H₂O', 'CO₂'], answer: [1, 2, 1, 1, 1],
    why: 'O CaCl₂ pede 2 Cl → 2 HCl; os 2 H formam 1 H₂O e o carbonato libera 1 CO₂. É a efervescência do calcário em ácido.',
  }),
];

/* ---------- tabela periódica ---------- */
const ID_TAB = `${S}.tabela`;

const tabela: Item[] = [
  classify(ID_TAB, 1, {
    stem: 'Separe os elementos por família.',
    groups: ['Metais alcalinos', 'Halogênios', 'Gases nobres'],
    things: [
      { t: 'Sódio (Na)', g: 0 }, { t: 'Cloro (Cl)', g: 1 }, { t: 'Argônio (Ar)', g: 2 },
      { t: 'Potássio (K)', g: 0 }, { t: 'Flúor (F)', g: 1 }, { t: 'Neônio (Ne)', g: 2 },
    ],
    why: 'A coluna define a família e o número de elétrons na camada de valência: alcalinos têm 1, halogênios 7 e gases nobres 8 (exceto o hélio, com 2).',
  }),
  pair(ID_TAB, 2, {
    stem: 'Relacione cada elemento à sua principal aplicação ou característica.',
    leftLabel: 'Elemento',
    rightLabel: 'Característica',
    left: ['Carbono', 'Silício', 'Ferro', 'Hélio'],
    right: ['Base dos semicondutores', 'Gás nobre menos denso que o ar', 'Forma cadeias e sustenta a química da vida', 'Principal metal das ligas estruturais'],
    answer: [2, 0, 3, 1],
    why: 'Carbono e silício são ambos tetravalentes, mas só o carbono forma cadeias longas e estáveis — por isso a vida é de carbono e a eletrônica é de silício.',
  }),
  mcq(ID_TAB, 2, {
    stem: 'Ao descer em uma mesma família da tabela periódica, o raio atômico:',
    options: ['Aumenta, pela adição de camadas eletrônicas.', 'Diminui, pela maior carga nuclear.', 'Não se altera.', 'Varia de forma aleatória.'],
    answer: 0,
    why: 'Cada período acrescenta uma camada: o elétron mais externo fica mais longe do núcleo. Já ao longo de um período, o raio diminui porque a carga nuclear puxa a mesma camada com mais força.',
  }),
  mcq(ID_TAB, 3, {
    stem: 'Um elemento com alta eletronegatividade e alta energia de ionização tende a:',
    options: ['Perder elétrons formando cátions.', 'Receber elétrons formando ânions.', 'Não formar ligações.', 'Conduzir eletricidade no estado sólido.'],
    answer: 1,
    why: 'Custa caro arrancar um elétron dele (ionização alta) e ele atrai elétrons alheios (eletronegatividade alta): comportamento de ametal, que ganha elétrons.',
  }),
  mcq(ID_TAB, 3, {
    stem: 'A distribuição eletrônica 1s² 2s² 2p⁶ 3s² 3p⁵ corresponde a um elemento que:',
    options: [
      'É um halogênio e forma ânion de carga −1.',
      'É um metal alcalino e forma cátion +1.',
      'É um gás nobre estável.',
      'Pertence à família dos alcalinoterrosos.',
    ],
    answer: 0,
    why: 'São 7 elétrons na camada de valência (3s² 3p⁵): falta 1 para o octeto. É o cloro, que forma Cl⁻.',
  }),
];

/* ---------- estequiometria ---------- */
const ID_EST = `${S}.estequiometria`;

const MASSAS: [string, string, number][] = [
  ['água', 'H₂O', 18], ['gás carbônico', 'CO₂', 44], ['glicose', 'C₆H₁₂O₆', 180],
  ['cloreto de sódio', 'NaCl', 58.5], ['oxigênio', 'O₂', 32], ['metano', 'CH₄', 16],
];

const estequiometria = (d: Difficulty, r: () => number): Item => {
  const [nome, formula, M] = pick(MASSAS, r);
  if (d === 1) {
    const mols = int(r, 2, 9);
    return num(ID_EST, 1, {
      stem: `Qual a massa de ${mols} mol de ${nome} (${formula}), em gramas? (M = ${String(M).replace('.', ',')} g/mol)`,
      answer: Math.round(mols * M * 10) / 10,
      why: `m = n · M = ${mols} × ${String(M).replace('.', ',')} = ${String(Math.round(mols * M * 10) / 10).replace('.', ',')} g.`,
      unit: 'g',
      decimals: true,
      tol: 0.2,
    });
  }
  if (d === 2) {
    const mols = int(r, 1, 6);
    const massa = Math.round(mols * M);
    return num(ID_EST, 2, {
      stem: `Quantos mols há em ${massa} g de ${nome} (${formula})? (M = ${String(M).replace('.', ',')} g/mol)`,
      answer: Math.round((massa / M) * 100) / 100,
      why: `n = m / M = ${massa} ÷ ${String(M).replace('.', ',')} ≈ ${String(Math.round((massa / M) * 100) / 100).replace('.', ',')} mol.`,
      unit: 'mol',
      decimals: true,
      tol: 0.08,
    });
  }
  const kind = pick(['combustao', 'particulas'] as const, r);
  if (kind === 'combustao') {
    const molsCH4 = int(r, 1, 5);
    return num(ID_EST, 3, {
      stem: `Na combustão completa CH₄ + 2 O₂ → CO₂ + 2 H₂O, quantos gramas de CO₂ são produzidos a partir de ${molsCH4} mol de metano? (M do CO₂ = 44 g/mol)`,
      answer: molsCH4 * 44,
      why: `A proporção é 1:1 entre CH₄ e CO₂, então ${molsCH4} mol de CO₂ × 44 g/mol = ${molsCH4 * 44} g. A estequiometria se faz sempre em mols, nunca direto em gramas.`,
      unit: 'g',
    });
  }
  const mols = int(r, 1, 5);
  return num(ID_EST, 3, {
    stem: `Quantas moléculas há em ${mols} mol de ${nome}? Responda em unidades de 10²³. (Nₐ = 6 × 10²³)`,
    answer: mols * 6,
    why: `${mols} × 6 × 10²³ = ${mols * 6} × 10²³ moléculas. O mol é só um "pacote" com 6 × 10²³ unidades.`,
    unit: '× 10²³',
  });
};

/* ---------- química orgânica ---------- */
const ID_ORG = `${S}.organica`;

const organica: Item[] = [
  pair(ID_ORG, 1, {
    stem: 'Relacione cada função orgânica ao seu grupo característico.',
    leftLabel: 'Função',
    rightLabel: 'Grupo',
    left: ['Álcool', 'Ácido carboxílico', 'Cetona', 'Amina'],
    right: ['—COOH', '—NH₂', '—OH ligado a carbono saturado', 'C=O entre dois carbonos'],
    answer: [2, 0, 3, 1],
    why: 'Identificar a função pelo grupo é o primeiro passo para prever solubilidade, acidez e ponto de ebulição.',
  }),
  classify(ID_ORG, 2, {
    stem: 'Separe os compostos por tipo.',
    groups: ['Hidrocarboneto', 'Composto oxigenado', 'Composto nitrogenado'],
    things: [
      { t: 'Etanol', g: 1 }, { t: 'Metano', g: 0 }, { t: 'Ureia', g: 2 },
      { t: 'Benzeno', g: 0 }, { t: 'Ácido acético', g: 1 }, { t: 'Anilina', g: 2 },
    ],
    why: 'Hidrocarbonetos só têm C e H. A presença de O ou N muda polaridade e reatividade — e é isso que o ENEM cobra ao falar de biocombustível, agrotóxico ou medicamento.',
  }),
  mcq(ID_ORG, 2, {
    stem: 'O etanol é miscível em água porque:',
    options: [
      'É apolar, como a água.',
      'Possui hidroxila capaz de fazer ligações de hidrogênio com a água.',
      'Tem cadeia longa.',
      'É um hidrocarboneto.',
    ],
    answer: 1,
    why: 'A parte —OH faz ligação de hidrogênio. Em álcoois de cadeia longa a parte apolar domina e a solubilidade em água despenca.',
  }),
  mcq(ID_ORG, 3, {
    stem: 'A transesterificação de óleos vegetais com álcool produz:',
    options: ['Etanol de segunda geração', 'Biodiesel', 'Gás natural', 'Polietileno'],
    answer: 1,
    why: 'Triglicerídeo + álcool, com catalisador básico, dá ésteres (biodiesel) e glicerol. É a rota industrial padrão do biodiesel brasileiro.',
  }),
  mcq(ID_ORG, 3, {
    stem: 'Dois compostos de mesma fórmula molecular e propriedades diferentes são:',
    options: ['Alótropos', 'Isótopos', 'Isômeros', 'Polímeros'],
    answer: 2,
    why: 'Isomeria: mesma fórmula, arranjos distintos. Butano e metilpropano são C₄H₁₀ e fervem em temperaturas diferentes.',
  }),
];

/* ---------- propriedades da matéria ---------- */
const ID_PROP = `${S}.propriedades`;

const propriedades: Item[] = [
  classify(ID_PROP, 1, {
    stem: 'Separe cada transformação por natureza.',
    groups: ['Física', 'Química'],
    things: [
      { t: 'Derreter gelo', g: 0 }, { t: 'Queimar papel', g: 1 },
      { t: 'Dissolver açúcar em água', g: 0 }, { t: 'Enferrujar um prego', g: 1 },
      { t: 'Amassar uma lata', g: 0 }, { t: 'Azedar o leite', g: 1 },
    ],
    why: 'Na transformação química surge substância nova, com propriedades novas. Mudança de estado, forma ou dissolução não cria substância: é física.',
  }),
  mcq(ID_PROP, 1, {
    stem: 'Durante a ebulição de uma substância pura, a temperatura:',
    options: ['Aumenta continuamente', 'Permanece constante', 'Diminui', 'Oscila de forma aleatória'],
    answer: 1,
    why: 'Substância pura muda de estado a temperatura constante; misturas, em geral, variam ao longo da faixa. É assim que se distingue pura de mistura num gráfico.',
  }),
  classify(ID_PROP, 2, {
    stem: 'Separe cada sistema pelo tipo.',
    groups: ['Substância pura', 'Mistura homogênea', 'Mistura heterogênea'],
    things: [
      { t: 'Água destilada', g: 0 }, { t: 'Ar filtrado', g: 1 }, { t: 'Água e óleo', g: 2 },
      { t: 'Gás oxigênio', g: 0 }, { t: 'Aço (liga)', g: 1 }, { t: 'Granito', g: 2 },
    ],
    why: 'Homogênea tem uma só fase visível, mesmo com vários componentes (ar, aço, soro). Heterogênea tem mais de uma fase.',
  }),
  mcq(ID_PROP, 2, {
    stem: 'Para separar sal dissolvido em água, o método adequado é:',
    options: ['Filtração', 'Decantação', 'Destilação', 'Catação'],
    answer: 2,
    why: 'O sal está dissolvido: não fica retido no filtro. A destilação evapora e recondensa a água, deixando o sal.',
  }),
  mcq(ID_PROP, 3, {
    stem: 'A água tem ponto de ebulição muito mais alto que o esperado para sua massa molar por causa:',
    options: ['Das ligações de hidrogênio entre suas moléculas.', 'Da sua alta massa molar.', 'Do seu caráter apolar.', 'Da sua baixa densidade no estado sólido.'],
    answer: 0,
    why: 'Uma rede de ligações de hidrogênio segura as moléculas. É a mesma razão do gelo flutuar e da água ser excelente solvente de compostos polares.',
  }),
];

/* ---------- experimentos ---------- */
const ID_EXP = `${S}.experimentos`;

const experimentos: Item[] = [
  mcq(ID_EXP, 1, {
    stem: 'Na tabela, qual amostra é a mais ácida?',
    figure: {
      type: 'table',
      head: ['Amostra', 'pH'],
      rows: [['Suco de limão', '2,4'], ['Café', '5,0'], ['Água pura', '7,0'], ['Leite de magnésia', '10,5']],
      caption: 'Medidas de pH a 25 °C',
    },
    options: ['Leite de magnésia', 'Café', 'Suco de limão', 'Água pura'],
    answer: 2,
    why: 'Quanto menor o pH, maior a concentração de H⁺. A escala é logarítmica: pH 2,4 é cerca de 400 vezes mais ácido que pH 5.',
  }),
  mcq(ID_EXP, 2, {
    stem: 'Em um experimento com a mesma reação, a variação da temperatura produziu os tempos abaixo. A conclusão correta é:',
    figure: {
      type: 'table',
      head: ['Temperatura', 'Tempo até o fim da reação'],
      rows: [['20 °C', '120 s'], ['30 °C', '62 s'], ['40 °C', '31 s'], ['50 °C', '16 s']],
    },
    options: [
      'A temperatura não influencia a velocidade da reação.',
      'A velocidade aproximadamente dobra a cada 10 °C de aumento.',
      'A reação só ocorre acima de 40 °C.',
      'O tempo cresce com a temperatura.',
    ],
    answer: 1,
    why: 'O tempo cai pela metade a cada 10 °C: mais temperatura, mais colisões eficazes. É o efeito cinético clássico.',
  }),
  mcq(ID_EXP, 2, {
    stem: 'Um grupo testa se a luz afeta a decomposição da água oxigenada. O grupo de controle deve ser:',
    options: [
      'Uma amostra idêntica mantida no escuro.',
      'Uma amostra com concentração diferente sob luz.',
      'Nenhuma amostra adicional.',
      'Uma amostra de outra substância sob luz.',
    ],
    answer: 0,
    why: 'Controle é a amostra igual em tudo menos na variável testada. Mudar dois fatores ao mesmo tempo torna o resultado inconclusivo.',
  }),
  mcq(ID_EXP, 3, {
    stem: 'Ao dissolver NaOH em água, o frasco esquenta. Isso indica que o processo é:',
    options: ['Endotérmico, com ΔH > 0', 'Exotérmico, com ΔH < 0', 'Isotérmico', 'Impossível de classificar'],
    answer: 1,
    why: 'O sistema libera calor para o ambiente: exotérmico, ΔH negativo. Sensação de frio no frasco indicaria absorção de calor.',
  }),
  mcq(ID_EXP, 3, {
    stem: 'Em um equilíbrio químico exotérmico, o aumento da temperatura:',
    options: [
      'Desloca o equilíbrio no sentido dos reagentes.',
      'Desloca o equilíbrio no sentido dos produtos.',
      'Não altera o equilíbrio.',
      'Interrompe a reação.',
    ],
    answer: 0,
    why: 'Princípio de Le Chatelier: fornecer calor a um processo que libera calor favorece o sentido inverso, consumindo o excesso.',
  }),
];

export const QUIMICA: Skill[] = [
  skill(S, 'balanceamento', { name: 'Balanceamento', blurb: 'Ajustar coeficientes até os dois lados fecharem.', kind: 'balance', game: 'Equilíbrio', bank: balanceamento }),
  skill(S, 'tabela', { name: 'Tabela periódica', blurb: 'Famílias, propriedades periódicas e distribuição eletrônica.', kind: 'classify', game: 'Triagem', bank: tabela }),
  skill(S, 'estequiometria', { name: 'Estequiometria', blurb: 'Mol, massa molar, proporções e número de Avogadro.', kind: 'numeric', game: 'Relâmpago', gen: estequiometria }),
  skill(S, 'organica', { name: 'Química orgânica', blurb: 'Funções, grupos característicos, isomeria e biocombustíveis.', kind: 'pair', game: 'Conexão', bank: organica }),
  skill(S, 'propriedades', { name: 'Propriedades da matéria', blurb: 'Transformações, misturas, separação e ligações.', kind: 'classify', game: 'Triagem', bank: propriedades }),
  skill(S, 'experimentos', { name: 'Interpretação de experimentos', blurb: 'Ler tabelas de laboratório, controles e variáveis.', kind: 'mcq', game: 'Leitura', bank: experimentos }),
];
