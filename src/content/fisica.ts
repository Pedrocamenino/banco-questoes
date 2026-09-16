import type { Difficulty, Item, Skill } from '../core/types';
import { bars, lines } from './figures';
import { int, mcq, num, pair, pick, skill } from './kit';

const S = 'fisica';

/* ---------- movimento ---------- */
const ID_MOV = `${S}.movimento`;

const movimento = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const v = int(r, 6, 30) * 5;
    const t = int(r, 2, 8);
    return num(ID_MOV, 1, {
      stem: `Um ônibus mantém velocidade constante de ${v} km/h durante ${t} h. Que distância percorre, em km?`,
      answer: v * t,
      why: `Movimento uniforme: d = v · t = ${v} × ${t} = ${v * t} km.`,
      unit: 'km',
    });
  }
  if (d === 2) {
    const kind = pick(['aceleracao', 'queda'] as const, r);
    if (kind === 'aceleracao') {
      const v0 = int(r, 0, 10);
      const a = int(r, 2, 6);
      const t = int(r, 3, 10);
      return num(ID_MOV, 2, {
        stem: `Um carro parte com ${v0} m/s e acelera a ${a} m/s² durante ${t} s. Qual a velocidade final, em m/s?`,
        answer: v0 + a * t,
        why: `v = v₀ + a·t = ${v0} + ${a}·${t} = ${v0 + a * t} m/s.`,
        unit: 'm/s',
      });
    }
    const t = int(r, 2, 5);
    return num(ID_MOV, 2, {
      stem: `Um objeto cai do repouso durante ${t} s. De que altura caiu, em metros? (g = 10 m/s², despreze o ar)`,
      answer: 5 * t * t,
      why: `h = g·t²/2 = 10 × ${t}²/2 = ${5 * t * t} m. A altura cresce com o quadrado do tempo, não proporcionalmente.`,
      unit: 'm',
    });
  }
  const kind = pick(['torricelli', 'relativa'] as const, r);
  if (kind === 'torricelli') {
    const v0 = int(r, 4, 12) * 5;
    const a = -int(r, 2, 5);
    const dist = Math.round((0 - v0 * v0) / (2 * a));
    return num(ID_MOV, 3, {
      stem: `Um veículo a ${v0} m/s freia com desaceleração de ${Math.abs(a)} m/s². Qual a distância até parar, em metros?`,
      answer: dist,
      why: `Torricelli: v² = v₀² + 2aΔs → 0 = ${v0 * v0} − ${2 * Math.abs(a)}·Δs → Δs = ${dist} m. Dobrar a velocidade quadruplica a distância de frenagem.`,
      unit: 'm',
    });
  }
  const va = int(r, 12, 30);
  const vb = int(r, 4, 11);
  return num(ID_MOV, 3, {
    stem: `Dois trens seguem no mesmo sentido, a ${va} m/s e ${vb} m/s. Qual a velocidade relativa entre eles, em m/s?`,
    answer: va - vb,
    why: `Mesmo sentido: subtrai-se (${va} − ${vb} = ${va - vb} m/s). Em sentidos opostos, somaria.`,
    unit: 'm/s',
  });
};

/* ---------- energia ---------- */
const ID_EN = `${S}.energia`;

const energia = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const m = int(r, 2, 20);
    const h = int(r, 2, 15);
    return num(ID_EN, 1, {
      stem: `Qual a energia potencial gravitacional de um corpo de ${m} kg a ${h} m de altura? (g = 10 m/s²)`,
      answer: m * 10 * h,
      why: `E = m·g·h = ${m} × 10 × ${h} = ${m * 10 * h} J.`,
      unit: 'J',
    });
  }
  if (d === 2) {
    const kind = pick(['cinetica', 'potencia'] as const, r);
    if (kind === 'cinetica') {
      const m = int(r, 1, 10) * 2;
      const v = int(r, 2, 12);
      return num(ID_EN, 2, {
        stem: `Qual a energia cinética de um corpo de ${m} kg a ${v} m/s?`,
        answer: (m * v * v) / 2,
        why: `E = m·v²/2 = ${m} × ${v * v} ÷ 2 = ${(m * v * v) / 2} J. Note que a velocidade entra ao quadrado.`,
        unit: 'J',
      });
    }
    const e = int(r, 6, 40) * 100;
    const t = int(r, 2, 10);
    return num(ID_EN, 2, {
      stem: `Um motor realiza ${e} J de trabalho em ${t} s. Qual a potência, em watts?`,
      answer: e / t,
      why: `P = E/t = ${e} ÷ ${t} = ${e / t} W. Potência é energia por tempo, não energia total.`,
      unit: 'W',
    });
  }
  const kind = pick(['conservacao', 'rendimento'] as const, r);
  if (kind === 'conservacao') {
    const h = int(r, 2, 12) * 5;
    const v = Math.round(Math.sqrt(2 * 10 * h));
    return num(ID_EN, 3, {
      stem: `Um corpo é solto de ${h} m. Qual a velocidade ao tocar o solo, em m/s? (g = 10, sem atrito)`,
      answer: v,
      why: `Toda a energia potencial vira cinética: m·g·h = m·v²/2 → v = √(2·10·${h}) ≈ ${v} m/s. A massa se cancela — por isso a queda não depende dela.`,
      unit: 'm/s',
      tol: 1,
    });
  }
  const ent = int(r, 4, 20) * 100;
  const rend = pick([20, 25, 40, 50], r);
  return num(ID_EN, 3, {
    stem: `Uma máquina recebe ${ent} J e tem rendimento de ${rend}%. Quanta energia é dissipada, em joules?`,
    answer: Math.round(ent * (1 - rend / 100)),
    why: `Útil: ${Math.round((ent * rend) / 100)} J. Dissipado: ${ent} − ${Math.round((ent * rend) / 100)} = ${Math.round(ent * (1 - rend / 100))} J. Nenhuma máquina real chega a 100%: a 2ª lei da termodinâmica proíbe.`,
    unit: 'J',
  });
};

/* ---------- eletricidade ---------- */
const ID_ELE = `${S}.eletricidade`;

const eletricidade = (d: Difficulty, r: () => number): Item => {
  if (d === 1) {
    const i = int(r, 2, 10);
    const rr = int(r, 5, 40);
    return num(ID_ELE, 1, {
      stem: `Qual a tensão sobre um resistor de ${rr} Ω percorrido por ${i} A?`,
      answer: i * rr,
      why: `Lei de Ohm: U = R·i = ${rr} × ${i} = ${i * rr} V.`,
      unit: 'V',
    });
  }
  if (d === 2) {
    const kind = pick(['potencia', 'serie'] as const, r);
    if (kind === 'potencia') {
      const u = pick([110, 127, 220], r);
      const i = int(r, 2, 12);
      return num(ID_ELE, 2, {
        stem: `Um aparelho ligado em ${u} V puxa ${i} A. Qual a potência, em watts?`,
        answer: u * i,
        why: `P = U·i = ${u} × ${i} = ${u * i} W.`,
        unit: 'W',
      });
    }
    const a = int(r, 2, 15);
    const b = int(r, 3, 20);
    const c = int(r, 4, 25);
    return num(ID_ELE, 2, {
      stem: `Três resistores de ${a} Ω, ${b} Ω e ${c} Ω estão em série. Qual a resistência equivalente, em ohms?`,
      answer: a + b + c,
      why: `Em série as resistências somam: ${a} + ${b} + ${c} = ${a + b + c} Ω.`,
      unit: 'Ω',
    });
  }
  const kind = pick(['paralelo', 'conta'] as const, r);
  if (kind === 'paralelo') {
    const a = int(r, 2, 10) * 2;
    return num(ID_ELE, 3, {
      stem: `Dois resistores iguais de ${a} Ω são ligados em paralelo. Qual a resistência equivalente, em ohms?`,
      answer: a / 2,
      why: `Resistores iguais em paralelo: R/2 = ${a}/2 = ${a / 2} Ω. Em paralelo o equivalente é sempre menor que o menor deles.`,
      unit: 'Ω',
      decimals: true,
    });
  }
  const p = pick([1000, 1500, 2000, 3500, 5500], r);
  const hDia = pick([0.5, 1, 2], r);
  const dias = 30;
  const kwh = (p / 1000) * hDia * dias;
  return num(ID_ELE, 3, {
    stem: `Um chuveiro de ${p} W é usado ${String(hDia).replace('.', ',')} h por dia. Qual o consumo mensal, em kWh? (30 dias)`,
    answer: Math.round(kwh),
    why: `E = ${p / 1000} kW × ${String(hDia).replace('.', ',')} h × 30 = ${Math.round(kwh)} kWh. A conta de luz cobra energia (kWh), não potência (kW).`,
    unit: 'kWh',
  });
};

/* ---------- gráficos ---------- */
const ID_GRAF = `${S}.graficos`;

const graficos: Item[] = [
  mcq(ID_GRAF, 1, {
    stem: 'No gráfico de posição por tempo, o trecho entre 2 s e 4 s indica que o móvel:',
    figure: { type: 'chart', chart: lines(['0', '1', '2', '3', '4', '5', '6'], [{ name: 'posição (m)', values: [0, 10, 20, 20, 20, 30, 40] }], { title: 'Posição × tempo', xLabel: 's', yLabel: 'm' }) },
    options: ['Acelerou', 'Ficou parado', 'Voltou ao ponto inicial', 'Inverteu o sentido'],
    answer: 1,
    why: 'Trecho horizontal em s × t significa posição constante: o móvel está parado. Inclinação zero é velocidade zero.',
  }),
  mcq(ID_GRAF, 2, {
    stem: 'No gráfico de velocidade por tempo, a área sob a curva entre 0 e 4 s representa:',
    figure: { type: 'chart', chart: lines(['0', '1', '2', '3', '4'], [{ name: 'velocidade (m/s)', values: [0, 5, 10, 15, 20] }], { title: 'Velocidade × tempo', xLabel: 's', yLabel: 'm/s' }) },
    options: ['A aceleração média', 'A distância percorrida', 'A força resultante', 'O tempo de reação'],
    answer: 1,
    why: 'Área em v × t tem unidade (m/s)·s = m: é deslocamento. Aqui, o triângulo dá 4 × 20 ÷ 2 = 40 m. A inclinação, essa sim, é a aceleração (5 m/s²).',
  }),
  mcq(ID_GRAF, 2, {
    stem: 'O gráfico mostra a força aplicada a uma mola em função da deformação. A constante elástica vale:',
    figure: { type: 'chart', chart: lines(['0', '0,1', '0,2', '0,3', '0,4'], [{ name: 'força (N)', values: [0, 20, 40, 60, 80] }], { title: 'Força × deformação', xLabel: 'm', yLabel: 'N' }) },
    options: ['20 N/m', '80 N/m', '200 N/m', '0,005 N/m'],
    answer: 2,
    why: 'Lei de Hooke: k é a inclinação. 80 N ÷ 0,4 m = 200 N/m.',
  }),
  mcq(ID_GRAF, 3, {
    stem: 'A curva de aquecimento de uma substância apresenta um patamar horizontal. Nesse trecho:',
    figure: { type: 'chart', chart: lines(['0', '2', '4', '6', '8', '10', '12'], [{ name: 'temperatura (°C)', values: [20, 60, 100, 100, 100, 120, 140] }], { title: 'Temperatura × tempo de aquecimento', xLabel: 'min', yLabel: '°C' }) },
    options: [
      'A substância parou de receber energia.',
      'A energia recebida está sendo usada na mudança de estado.',
      'A substância esfriou.',
      'O termômetro está com defeito.',
    ],
    answer: 1,
    why: 'Durante a mudança de estado o calor é latente: quebra ligações entre as partículas sem elevar a temperatura. Receber energia e não esquentar é o comportamento esperado.',
  }),
  mcq(ID_GRAF, 3, {
    stem: 'Comparando o consumo dos aparelhos, qual medida reduz mais a conta de energia?',
    figure: { type: 'chart', chart: bars(['Chuveiro', 'Ar-cond.', 'Geladeira', 'TV', 'Lâmpadas'], [95, 78, 62, 14, 9], { title: 'Consumo mensal estimado (kWh)', yLabel: 'kWh/mês' }) },
    options: ['Trocar a TV', 'Reduzir o tempo de banho quente', 'Desligar as lâmpadas do corredor', 'Trocar o controle do ar-condicionado'],
    answer: 1,
    why: 'O chuveiro é o maior consumidor (95 kWh/mês). Atacar o maior item da lista dá mais resultado do que otimizar os menores — o mesmo raciocínio serve para qualquer leitura de gráfico de consumo.',
  }),
];

/* ---------- fenômenos ---------- */
const ID_FEN = `${S}.fenomenos`;

const fenomenos: Item[] = [
  mcq(ID_FEN, 1, {
    stem: 'Ao empurrar uma parede, você sente uma força contrária de mesma intensidade. Isso é explicado pela:',
    options: ['1ª lei de Newton', '2ª lei de Newton', '3ª lei de Newton', 'Lei da gravitação universal'],
    answer: 2,
    why: 'Ação e reação: forças em pares, mesma intensidade, sentidos opostos, aplicadas em corpos diferentes — por isso não se cancelam.',
  }),
  mcq(ID_FEN, 1, {
    stem: 'Um passageiro é jogado para a frente quando o ônibus freia porque:',
    options: [
      'Uma força o empurra para a frente.',
      'Seu corpo tende a manter o movimento que já tinha (inércia).',
      'A gravidade aumenta durante a frenagem.',
      'O atrito desaparece.',
    ],
    answer: 1,
    why: 'Inércia: sem força que o freie junto com o ônibus, o corpo segue em frente. Não existe "força para a frente" nesse caso.',
  }),
  mcq(ID_FEN, 2, {
    stem: 'A colher parece quebrada dentro do copo d\'água por causa da:',
    options: ['Reflexão', 'Refração', 'Difração', 'Polarização'],
    answer: 1,
    why: 'A luz muda de velocidade ao passar da água para o ar e desvia: refração. O cérebro prolonga o raio em linha reta e "quebra" a colher.',
  }),
  pair(ID_FEN, 2, {
    stem: 'Relacione cada situação ao processo de transmissão de calor.',
    leftLabel: 'Situação',
    rightLabel: 'Processo',
    left: ['Cabo metálico da panela esquenta', 'Ar quente sobe e o frio desce na geladeira', 'Sentir o calor do fogo a distância', 'Garrafa térmica com paredes espelhadas'],
    right: ['Convecção', 'Condução', 'Bloqueio da irradiação', 'Irradiação'],
    answer: [1, 0, 3, 2],
    why: 'Condução exige contato; convecção exige fluido em movimento; irradiação não precisa de meio — por isso o calor do Sol chega pelo vácuo.',
  }),
  mcq(ID_FEN, 3, {
    stem: 'O som não se propaga no vácuo porque:',
    options: [
      'É uma onda eletromagnética de baixa frequência.',
      'É uma onda mecânica e precisa de um meio material para se propagar.',
      'Sua velocidade é maior que a da luz.',
      'É absorvido pelo campo gravitacional.',
    ],
    answer: 1,
    why: 'Som é vibração de partículas do meio. Sem partículas, não há o que vibrar. Já a luz, eletromagnética, atravessa o vácuo.',
  }),
  mcq(ID_FEN, 3, {
    stem: 'A sensação de que uma ambulância muda de som ao passar por você é explicada pelo:',
    options: ['Efeito Doppler', 'Efeito fotoelétrico', 'Princípio de Arquimedes', 'Efeito Joule'],
    answer: 0,
    why: 'O movimento relativo comprime as frentes de onda na aproximação (som mais agudo) e as estica no afastamento (mais grave). A fonte emite sempre a mesma frequência.',
  }),
];

export const FISICA: Skill[] = [
  skill(S, 'movimento', { name: 'Movimento', blurb: 'Velocidade, aceleração, queda livre e frenagem.', kind: 'numeric', game: 'Relâmpago', gen: movimento }),
  skill(S, 'energia', { name: 'Energia', blurb: 'Cinética, potencial, potência, conservação e rendimento.', kind: 'numeric', game: 'Relâmpago', gen: energia }),
  skill(S, 'eletricidade', { name: 'Eletricidade', blurb: 'Lei de Ohm, potência, associação de resistores e conta de luz.', kind: 'numeric', game: 'Relâmpago', gen: eletricidade }),
  skill(S, 'graficos', { name: 'Gráficos', blurb: 'Ler inclinação, área e patamar em gráficos da física.', kind: 'mcq', game: 'Leitura', bank: graficos }),
  skill(S, 'fenomenos', { name: 'Interpretação de fenômenos', blurb: 'Explicar o que acontece no cotidiano com o conceito certo.', kind: 'mcq', game: 'Decisão', bank: fenomenos }),
];
