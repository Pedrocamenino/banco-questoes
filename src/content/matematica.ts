import type { Difficulty, Item, Skill } from '../core/types';
import { bars, lines, pie, scatter } from './figures';
import { brl, int, mcq, num, pick, shuffled, skill } from './kit';

const S = 'matematica';

/* ============================================================
   Cálculo mental — banco procedural: nunca repete, sempre calibrado
   ============================================================ */

const ID_MENTAL = `${S}.mental`;

const mental = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const kind = pick(['mult', 'soma', 'porc'] as const, r);
    if (kind === 'mult') {
      const a = int(r, 12, 29);
      const b = int(r, 3, 9);
      const dez = Math.floor(a / 10) * 10;
      const un = a % 10;
      return num(ID_MENTAL, 1, {
        stem: `${a} × ${b}`,
        answer: a * b,
        why: `Quebre o primeiro número: ${dez} × ${b} = ${dez * b} e ${un} × ${b} = ${un * b}. Somando, ${a * b}.`,
      });
    }
    if (kind === 'soma') {
      const a = int(r, 120, 480);
      const b = int(r, 130, 390);
      return num(ID_MENTAL, 1, {
        stem: `${a} + ${b}`,
        answer: a + b,
        why: `Some as centenas e depois o resto: ${Math.floor(a / 100) * 100} + ${Math.floor(b / 100) * 100} = ${(Math.floor(a / 100) + Math.floor(b / 100)) * 100}, e sobra ${a % 100} + ${b % 100} = ${(a % 100) + (b % 100)}.`,
      });
    }
    const p = pick([10, 20, 25, 50], r);
    const n = int(r, 4, 24) * 20;
    return num(ID_MENTAL, 1, {
      stem: `${p}% de ${n}`,
      answer: (n * p) / 100,
      why: `${p}% é ${p === 50 ? 'metade' : p === 25 ? 'um quarto' : p === 20 ? 'um quinto' : 'um décimo'} do total: ${(n * p) / 100}.`,
    });
  }

  if (d === 2) {
    const kind = pick(['fator', 'quadrado', 'produto'] as const, r);
    if (kind === 'fator') {
      const k = int(r, 3, 9);
      const a = int(r, 21, 79);
      return num(ID_MENTAL, 2, {
        stem: `${k} × ${a} + ${k} × ${100 - a}`,
        answer: k * 100,
        why: `Fator comum: ${k} × (${a} + ${100 - a}) = ${k} × 100 = ${k * 100}. Enxergar o 100 evita as duas multiplicações.`,
      });
    }
    if (kind === 'quadrado') {
      const n = int(r, 1, 9);
      const base = 50 + n;
      return num(ID_MENTAL, 2, {
        stem: `${base}²`,
        answer: base * base,
        why: `(50 + ${n})² = 2500 + 2·50·${n} + ${n}² = 2500 + ${100 * n} + ${n * n} = ${base * base}.`,
      });
    }
    const n = int(r, 2, 9);
    return num(ID_MENTAL, 2, {
      stem: `${50 - n} × ${50 + n}`,
      answer: 2500 - n * n,
      why: `Produto notável: (50 − ${n})(50 + ${n}) = 2500 − ${n}² = ${2500 - n * n}.`,
    });
  }

  const kind = pick(['cadeia', 'media', 'divisao'] as const, r);
  if (kind === 'cadeia') {
    const base = int(r, 4, 20) * 50;
    const sobe = pick([10, 20, 25], r);
    const desce = pick([10, 20, 50], r);
    const fim = Math.round(base * (1 + sobe / 100) * (1 - desce / 100));
    return num(ID_MENTAL, 3, {
      stem: `Um preço de ${brl(base)} sobe ${sobe}% e depois cai ${desce}%. Qual o valor final, em reais?`,
      answer: fim,
      why: `Fatores se multiplicam, não se somam: ${base} × ${(1 + sobe / 100).toFixed(2)} × ${(1 - desce / 100).toFixed(2)} = ${fim}. Subir ${sobe}% e cair ${desce}% não volta ao início.`,
      unit: 'R$',
    });
  }
  if (kind === 'media') {
    const a = int(r, 4, 9) * 10;
    const b = a + int(r, 2, 8) * 5;
    const c = b + int(r, 2, 8) * 5;
    return num(ID_MENTAL, 3, {
      stem: `Média de ${a}, ${b} e ${c}`,
      answer: Math.round((a + b + c) / 3),
      why: `Soma ${a + b + c}, dividida por 3, dá ${Math.round((a + b + c) / 3)}.`,
    });
  }
  const div = int(r, 12, 24);
  const q = int(r, 12, 40);
  return num(ID_MENTAL, 3, {
    stem: `${div * q} ÷ ${div}`,
    answer: q,
    why: `${div} × ${q} = ${div * q}, então o quociente é ${q}.`,
  });
};

/* ============================================================
   Porcentagem
   ============================================================ */

const ID_PORC = `${S}.porcentagem`;

const porcentagem = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const p = pick([5, 10, 15, 20, 30], r);
    const n = int(r, 6, 40) * 50;
    return num(ID_PORC, 1, {
      stem: `Um produto de ${brl(n)} tem ${p}% de desconto. Quanto você economiza, em reais?`,
      answer: (n * p) / 100,
      why: `10% de ${n} é ${n / 10}. ${p}% é ${(p / 10).toString().replace('.', ',')} vezes isso: ${(n * p) / 100}.`,
      unit: 'R$',
    });
  }
  if (d === 2) {
    const antes = int(r, 8, 40) * 25;
    const p = pick([12, 16, 24, 32, 40], r);
    const depois = Math.round(antes * (1 + p / 100));
    return num(ID_PORC, 2, {
      stem: `A passagem custava ${brl(antes)} e aumentou ${p}%. Qual o novo preço, em reais?`,
      answer: depois,
      why: `Aumentar ${p}% é multiplicar por ${(1 + p / 100).toFixed(2)}: ${antes} × ${(1 + p / 100).toFixed(2)} = ${depois}.`,
      unit: 'R$',
    });
  }
  const kind = pick(['variacao', 'juros'] as const, r);
  if (kind === 'variacao') {
    const antes = int(r, 4, 20) * 25;
    const razao = pick([1.2, 1.25, 1.4, 1.5, 0.8, 0.75], r);
    const depois = Math.round(antes * razao);
    const varp = Math.round(((depois - antes) / antes) * 100);
    return num(ID_PORC, 3, {
      stem: `Um indicador foi de ${antes} para ${depois}. Qual foi a variação percentual? (use o sinal)`,
      answer: varp,
      why: `Variação = (${depois} − ${antes}) ÷ ${antes} = ${((depois - antes) / antes).toFixed(2)} → ${varp}%. O denominador é sempre o valor inicial.`,
      unit: '%',
      allowNegative: true,
    });
  }
  const c = int(r, 4, 20) * 500;
  const i = pick([10, 20, 25], r);
  const fim = Math.round(c * (1 + i / 100) ** 2);
  return num(ID_PORC, 3, {
    stem: `${brl(c)} aplicados a juros compostos de ${i}% ao mês. Qual o montante após 2 meses, em reais?`,
    answer: fim,
    why: `M = ${c} × (1 + ${i / 100})² = ${c} × ${((1 + i / 100) ** 2).toFixed(4)} = ${fim}. No composto o juro do 1º mês também rende.`,
    unit: 'R$',
  });
};

/* ============================================================
   Funções
   ============================================================ */

const ID_FUNC = `${S}.funcoes`;

const funcoes = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const a = int(r, 2, 9);
    const b = int(r, -8, 12);
    const x = int(r, 2, 9);
    const y = a * x + b;
    return num(ID_FUNC, 1, {
      stem: `Se f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}, quanto vale f(${x})?`,
      answer: y,
      why: `Substitua x por ${x}: ${a}·${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${y}.`,
      allowNegative: true,
    });
  }
  if (d === 2) {
    const a = int(r, 2, 8);
    const raiz = int(r, 2, 9);
    const b = -a * raiz;
    return num(ID_FUNC, 2, {
      stem: `Para quais valores de x a função f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} se anula?`,
      answer: raiz,
      why: `Raiz é onde f(x) = 0: ${a}x = ${Math.abs(b)} → x = ${raiz}. No gráfico, é onde a reta corta o eixo x.`,
      allowNegative: true,
    });
  }
  const kind = pick(['vertice', 'modelo'] as const, r);
  if (kind === 'vertice') {
    const a = pick([1, 2, -1, -2], r);
    const xv = int(r, 1, 6);
    const b = -2 * a * xv;
    const c = int(r, -6, 10);
    const yv = a * xv * xv + b * xv + c;
    return num(ID_FUNC, 3, {
      stem: `A função f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)} tem ${a > 0 ? 'mínimo' : 'máximo'} em qual valor de x?`,
      answer: xv,
      why: `x do vértice = −b/2a = ${-b}/${2 * a} = ${xv}. O valor ${a > 0 ? 'mínimo' : 'máximo'} de f é ${yv}.`,
      allowNegative: true,
    });
  }
  const fixo = int(r, 3, 12) * 10;
  const porKm = int(r, 2, 6);
  const km = int(r, 8, 30);
  return num(ID_FUNC, 3, {
    stem: `Um serviço cobra ${brl(fixo)} fixos mais ${brl(porKm)} por km. Quanto custa uma corrida de ${km} km, em reais?`,
    answer: fixo + porKm * km,
    why: `O modelo é f(x) = ${porKm}x + ${fixo}: a taxa fixa é o coeficiente linear e o preço por km é a inclinação. f(${km}) = ${fixo + porKm * km}.`,
    unit: 'R$',
  });
};

/* ============================================================
   Geometria
   ============================================================ */

const ID_GEO = `${S}.geometria`;

const geometria = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const kind = pick(['retangulo', 'triangulo'] as const, r);
    const b = int(r, 4, 18);
    const h = int(r, 3, 15);
    if (kind === 'retangulo') {
      return num(ID_GEO, 1, {
        stem: `Um terreno retangular tem ${b} m por ${h} m. Qual é a área, em m²?`,
        answer: b * h,
        why: `Área do retângulo = base × altura = ${b} × ${h} = ${b * h} m².`,
        unit: 'm²',
      });
    }
    return num(ID_GEO, 1, {
      stem: `Um triângulo tem base ${b * 2} cm e altura ${h} cm. Qual é a área, em cm²?`,
      answer: b * h,
      why: `Área = (base × altura) ÷ 2 = (${b * 2} × ${h}) ÷ 2 = ${b * h} cm². O triângulo é metade do retângulo de mesma base e altura.`,
      unit: 'cm²',
    });
  }
  if (d === 2) {
    const kind = pick(['circulo', 'bloco'] as const, r);
    if (kind === 'circulo') {
      const raio = int(r, 2, 12);
      return num(ID_GEO, 2, {
        stem: `Qual é a área de um círculo de raio ${raio} m? (use π = 3,14)`,
        answer: Math.round(3.14 * raio * raio * 100) / 100,
        why: `A = πr² = 3,14 × ${raio}² = 3,14 × ${raio * raio} = ${(3.14 * raio * raio).toFixed(2).replace('.', ',')} m².`,
        unit: 'm²',
        decimals: true,
        tol: 0.05,
      });
    }
    const a = int(r, 2, 8);
    const b = int(r, 2, 9);
    const c = int(r, 2, 7);
    return num(ID_GEO, 2, {
      stem: `Uma caixa mede ${a} m × ${b} m × ${c} m. Qual é o volume, em m³?`,
      answer: a * b * c,
      why: `Volume do bloco = ${a} × ${b} × ${c} = ${a * b * c} m³.`,
      unit: 'm³',
    });
  }
  const kind = pick(['pitagoras', 'trapezio', 'cilindro'] as const, r);
  if (kind === 'pitagoras') {
    const [x, y, z] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]], r) as number[];
    const k = int(r, 1, 3);
    return num(ID_GEO, 3, {
      stem: `Uma rampa sobe ${y! * k} m de altura e avança ${x! * k} m na horizontal. Qual é o comprimento da rampa, em metros?`,
      answer: z! * k,
      why: `Pitágoras: ${x! * k}² + ${y! * k}² = ${(x! * k) ** 2 + (y! * k) ** 2} → hipotenusa = ${z! * k} m.`,
      unit: 'm',
    });
  }
  if (kind === 'trapezio') {
    const B = int(r, 8, 20);
    const b = int(r, 3, B - 2);
    const h = int(r, 2, 10) * 2;
    return num(ID_GEO, 3, {
      stem: `Um trapézio tem bases ${B} cm e ${b} cm e altura ${h} cm. Qual é a área, em cm²?`,
      answer: ((B + b) * h) / 2,
      why: `A = (B + b)·h ÷ 2 = (${B} + ${b}) × ${h} ÷ 2 = ${((B + b) * h) / 2} cm².`,
      unit: 'cm²',
    });
  }
  const raio = int(r, 2, 8);
  const alt = int(r, 3, 15);
  return num(ID_GEO, 3, {
    stem: `Um reservatório cilíndrico tem raio ${raio} m e altura ${alt} m. Qual é o volume, em m³? (π = 3)`,
    answer: 3 * raio * raio * alt,
    why: `V = πr²h = 3 × ${raio * raio} × ${alt} = ${3 * raio * raio * alt} m³. Com π = 3 a conta sai de cabeça.`,
    unit: 'm³',
  });
};

/* ============================================================
   Probabilidade e contagem
   ============================================================ */

const ID_PROB = `${S}.probabilidade`;

const probabilidade = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const verm = int(r, 2, 6);
    const azul = int(r, 3, 8);
    const total = verm + azul;
    const certa = `${verm}/${total}`;
    const { options, answer } = shuffled(
      [certa, `${azul}/${total}`, `${verm}/${azul}`, `1/${total}`],
      0, r,
    );
    return mcq(ID_PROB, 1, {
      stem: `Uma urna tem ${verm} bolas vermelhas e ${azul} azuis. Qual a probabilidade de tirar uma vermelha?`,
      options, answer,
      why: `Casos favoráveis sobre casos possíveis: ${verm} de ${total} bolas, ou seja ${certa} (${Math.round((verm / total) * 100)}%).`,
    });
  }
  if (d === 2) {
    const n = int(r, 3, 5);
    const total = [0, 1, 2, 6, 24, 120][n]!;
    const { options, answer } = shuffled(
      [String(total), String(n * n), String(n * 2), String(total * 2)], 0, r,
    );
    return mcq(ID_PROB, 2, {
      stem: `De quantas maneiras ${n} pessoas podem se sentar em ${n} cadeiras em fila?`,
      options, answer,
      why: `É uma permutação: ${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = ${total}.`,
    });
  }
  const kind = pick(['dados', 'condicional'] as const, r);
  if (kind === 'dados') {
    const alvo = pick([5, 6, 7, 8, 9], r);
    const casos = 6 - Math.abs(7 - alvo);
    const { options, answer } = shuffled(
      [`${casos}/36`, `${casos}/12`, `${alvo}/36`, `1/6`], 0, r,
    );
    return mcq(ID_PROB, 3, {
      stem: `Dois dados comuns são lançados. Qual a probabilidade de a soma ser ${alvo}?`,
      options, answer,
      why: `São 36 resultados possíveis e ${casos} deles somam ${alvo}. Logo, ${casos}/36.`,
    });
  }
  const p = pick([20, 25, 40], r);
  const q = pick([50, 60, 80], r);
  const res = Math.round((p * q) / 100);
  const { options, answer } = shuffled(
    [`${res}%`, `${p + q}%`, `${q - p}%`, `${Math.round((p + q) / 2)}%`], 0, r,
  );
  return mcq(ID_PROB, 3, {
    stem: `${p}% dos inscritos fizeram o simulado e, destes, ${q}% acertaram a questão. Que fração do total de inscritos acertou?`,
    options, answer,
    why: `Eventos em sequência multiplicam: ${p}% × ${q}% = ${res}% do total. Somar as porcentagens seria o erro clássico.`,
  });
};

/* ============================================================
   Interpretação de gráficos — banco autoral
   ============================================================ */

const ID_GRAF = `${S}.graficos`;

const graficos: Item[] = [
  mcq(ID_GRAF, 1, {
    stem: 'Segundo o gráfico, em qual mês houve a maior arrecadação?',
    figure: { type: 'chart', chart: bars(['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], [32, 41, 28, 47, 39], { title: 'Arrecadação da feira (R$ mil)', yLabel: 'R$ mil' }) },
    options: ['Fevereiro', 'Abril', 'Maio', 'Janeiro'],
    answer: 1,
    why: 'A barra de abril é a mais alta (47 mil). Comparar alturas resolve sem nenhuma conta.',
  }),
  mcq(ID_GRAF, 1, {
    stem: 'Qual é a diferença entre a maior e a menor produção do período?',
    figure: { type: 'chart', chart: bars(['2019', '2020', '2021', '2022', '2023'], [120, 95, 140, 175, 160], { title: 'Produção anual (toneladas)', yLabel: 't' }) },
    options: ['55 t', '80 t', '35 t', '175 t'],
    answer: 1,
    why: 'Maior: 175 t (2022). Menor: 95 t (2020). A diferença é 80 t.',
  }),
  mcq(ID_GRAF, 2, {
    stem: 'Entre quais anos consecutivos houve a maior queda percentual?',
    figure: { type: 'chart', chart: lines(['2018', '2019', '2020', '2021', '2022'], [{ name: 'Matrículas', values: [800, 760, 500, 540, 590] }], { title: 'Matrículas no curso noturno', yLabel: 'alunos' }) },
    options: ['2018 → 2019', '2019 → 2020', '2020 → 2021', '2021 → 2022'],
    answer: 1,
    why: 'De 2019 para 2020 caiu de 760 para 500, ou seja −34%. A outra queda (2018→2019) foi de apenas −5%. Queda percentual compara com o valor inicial, não com o tamanho do degrau no desenho.',
  }),
  mcq(ID_GRAF, 2, {
    stem: 'O gráfico de setores mostra o destino do orçamento familiar. Se a renda é de R$ 4.000, quanto vai para moradia?',
    figure: { type: 'chart', chart: pie([{ label: 'Moradia', value: 35 }, { label: 'Alimentação', value: 25 }, { label: 'Transporte', value: 15 }, { label: 'Educação', value: 10 }, { label: 'Outros', value: 15 }], 'Orçamento mensal (%)') },
    options: ['R$ 1.000', 'R$ 1.400', 'R$ 1.600', 'R$ 700'],
    answer: 1,
    why: '35% de 4.000 = 1.400. Em gráfico de setores, o total sempre vale 100%.',
  }),
  mcq(ID_GRAF, 2, {
    stem: 'Em que momento as duas séries se igualam?',
    figure: { type: 'chart', chart: lines(['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], [{ name: 'Plano A', values: [50, 70, 90, 110, 130, 150] }, { name: 'Plano B', values: [110, 118, 126, 134, 142, 150] }], { title: 'Custo acumulado (R$)', yLabel: 'R$' }) },
    options: ['Em março', 'Em abril', 'Em junho', 'Nunca se igualam'],
    answer: 2,
    why: 'As linhas se cruzam em junho, ambas em R$ 150. Até lá o plano A é mais barato; depois do cruzamento a ordem se inverte.',
  }),
  mcq(ID_GRAF, 3, {
    stem: 'Qual afirmação é sustentada pelo gráfico?',
    figure: { type: 'chart', chart: scatter([{ x: 1, y: 22 }, { x: 2, y: 28 }, { x: 3, y: 31 }, { x: 4, y: 39 }, { x: 5, y: 44 }, { x: 6, y: 47 }, { x: 7, y: 55 }], { title: 'Horas de estudo × acertos no simulado', xLabel: 'horas/semana', yLabel: 'acertos' }) },
    options: [
      'Estudar mais causa, necessariamente, mais acertos.',
      'Há associação positiva entre horas de estudo e acertos.',
      'Quem estuda 10 horas acerta 70 questões.',
      'A relação entre as variáveis é inversa.',
    ],
    answer: 1,
    why: 'A nuvem sobe da esquerda para a direita: existe associação positiva. Afirmar causa exige controle de outras variáveis, e prever 10 h é extrapolar fora do intervalo observado.',
  }),
  mcq(ID_GRAF, 3, {
    stem: 'A manchete diz "explosão de casos". O gráfico justifica o termo?',
    figure: { type: 'chart', chart: bars(['S1', 'S2', 'S3', 'S4'], [980, 1010, 1035, 1060], { title: 'Casos por semana', yLabel: 'casos' }) },
    options: [
      'Sim, as barras crescem visivelmente.',
      'Não: o crescimento total é de cerca de 8% em quatro semanas.',
      'Sim, porque o último valor é o maior da série.',
      'Não é possível avaliar sem o gráfico de linha.',
    ],
    answer: 1,
    why: 'De 980 para 1.060 são +8% em quatro semanas. A impressão de explosão vem da escala do eixo, não dos dados — é o erro de leitura mais explorado pelo ENEM.',
  }),
  mcq(ID_GRAF, 3, {
    stem: 'A tabela mostra o consumo de dois aparelhos. Qual conclusão é correta?',
    figure: {
      type: 'table',
      head: ['Aparelho', 'Potência (W)', 'Uso diário (h)'],
      rows: [['Chuveiro', '5.500', '0,5'], ['Geladeira', '150', '24']],
      caption: 'Consumo residencial típico',
    },
    options: [
      'O chuveiro consome mais energia por dia que a geladeira.',
      'A geladeira consome mais energia por dia que o chuveiro.',
      'Os dois consomem a mesma energia por dia.',
      'Falta a tensão da rede para comparar.',
    ],
    answer: 1,
    why: 'Energia = potência × tempo. Chuveiro: 5.500 × 0,5 = 2.750 Wh. Geladeira: 150 × 24 = 3.600 Wh. Potência alta não significa consumo alto se o tempo de uso é curto.',
  }),
];

/* ============================================================
   Problemas contextualizados
   ============================================================ */

const ID_CTX = `${S}.contexto`;

const contexto: Item[] = [
  mcq(ID_CTX, 1, {
    stem: 'Uma receita para 4 pessoas pede 300 g de arroz. Para 10 pessoas, mantendo a proporção, serão necessários:',
    options: ['600 g', '750 g', '700 g', '900 g'],
    answer: 1,
    why: '300 g ÷ 4 = 75 g por pessoa. Para 10 pessoas: 750 g. Regra de três direta.',
  }),
  mcq(ID_CTX, 1, {
    stem: 'Um reservatório com 2.400 L é esvaziado a 40 L por minuto. Em quanto tempo ele se esvazia?',
    options: ['40 minutos', '1 hora', '1 hora e 20 minutos', '2 horas'],
    answer: 1,
    why: '2.400 ÷ 40 = 60 minutos, ou seja 1 hora.',
  }),
  mcq(ID_CTX, 2, {
    stem: 'Três pedreiros levantam um muro em 12 dias. Mantido o ritmo, quantos dias levariam quatro pedreiros?',
    options: ['16 dias', '9 dias', '8 dias', '10 dias'],
    answer: 1,
    why: 'Grandezas inversamente proporcionais: 3 × 12 = 36 dias-pedreiro. Com 4 pedreiros, 36 ÷ 4 = 9 dias.',
  }),
  mcq(ID_CTX, 2, {
    stem: 'Um carro faz 14 km/L e o litro custa R$ 5,60. Qual o custo de uma viagem de 350 km?',
    options: ['R$ 120,00', 'R$ 140,00', 'R$ 196,00', 'R$ 98,00'],
    answer: 1,
    why: '350 ÷ 14 = 25 litros. 25 × 5,60 = R$ 140,00.',
  }),
  mcq(ID_CTX, 2, {
    stem: 'A escala de um mapa é 1:50.000. Dois pontos distam 6 cm no mapa. Qual a distância real?',
    options: ['300 m', '3 km', '30 km', '500 m'],
    answer: 1,
    why: '6 cm × 50.000 = 300.000 cm = 3.000 m = 3 km. Converter a unidade no fim é onde a maioria erra.',
  }),
  mcq(ID_CTX, 3, {
    stem: 'Um plano cobra R$ 60 fixos + R$ 0,50 por minuto; outro cobra R$ 0,90 por minuto, sem taxa. A partir de quantos minutos o primeiro compensa?',
    options: ['100 minutos', '120 minutos', '150 minutos', '200 minutos'],
    answer: 2,
    why: '60 + 0,5m < 0,9m → 60 < 0,4m → m > 150. A partir de 150 minutos o plano com taxa fixa fica mais barato.',
  }),
  mcq(ID_CTX, 3, {
    stem: 'Uma loja aumenta um preço em 20% e depois anuncia 20% de desconto. Em relação ao preço original, o preço final está:',
    options: ['Igual', '4% menor', '4% maior', '2% menor'],
    answer: 1,
    why: '1,20 × 0,80 = 0,96, ou seja 4% abaixo do original. Porcentagens sucessivas se multiplicam — nunca se cancelam.',
  }),
  mcq(ID_CTX, 3, {
    stem: 'Numa turma de 40 alunos, a média foi 6,0. Retirando-se as duas menores notas (2,0 e 3,0), a nova média dos 38 restantes é aproximadamente:',
    options: ['6,0', '6,2', '6,4', '5,8'],
    answer: 1,
    why: 'Soma total = 240. Tirando 5, sobram 235 para 38 alunos: 235 ÷ 38 ≈ 6,18. A média sobe porque saíram valores abaixo dela.',
  }),
];

/* ============================================================ */

export const MATEMATICA: Skill[] = [
  skill(S, 'mental', { name: 'Cálculo mental', blurb: 'Contas de cabeça com atalhos que economizam tempo na prova.', kind: 'numeric', game: 'Relâmpago', gen: mental }),
  skill(S, 'porcentagem', { name: 'Porcentagem', blurb: 'Descontos, aumentos, variação e juros compostos.', kind: 'numeric', game: 'Relâmpago', gen: porcentagem }),
  skill(S, 'graficos', { name: 'Interpretação de gráficos', blurb: 'Ler barras, linhas, setores e dispersão sem cair em pegadinha de escala.', kind: 'mcq', game: 'Leitura', bank: graficos }),
  skill(S, 'funcoes', { name: 'Funções', blurb: 'Valor numérico, raízes, vértice e modelagem de situações.', kind: 'numeric', game: 'Relâmpago', gen: funcoes }),
  skill(S, 'geometria', { name: 'Geometria', blurb: 'Áreas, volumes e Pitágoras aplicados a situações reais.', kind: 'numeric', game: 'Relâmpago', gen: geometria }),
  skill(S, 'probabilidade', { name: 'Probabilidade e contagem', blurb: 'Casos favoráveis, permutações e eventos em sequência.', kind: 'mcq', game: 'Decisão', gen: probabilidade }),
  skill(S, 'contexto', { name: 'Problemas contextualizados', blurb: 'Proporção, escala, custo e média no formato que o ENEM cobra.', kind: 'mcq', game: 'Decisão', bank: contexto }),
];
