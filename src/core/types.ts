/* =============================================================
   Modelo de domínio
   Um item é sempre: enunciado + (opcional) figura + gabarito + porquê.
   O `kind` do item determina qual engine de minijogo o renderiza.
   ============================================================= */

export type Difficulty = 1 | 2 | 3;

export type Kind = 'mcq' | 'order' | 'pair' | 'numeric' | 'classify' | 'balance';

/* ---------- figuras ---------- */

export interface ChartSeries {
  name: string;
  points: { x: string | number; y: number }[];
}

export interface ChartSpec {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title?: string;
  xLabel?: string;
  yLabel?: string;
  series: ChartSeries[];
  /** rótulos do eixo x quando as séries usam índices */
  categories?: string[];
}

export interface MapRegion {
  id: string;
  label: string;
  /** caminho SVG no viewBox 0 0 300 320 */
  d: string;
  /** âncora do rótulo */
  at: [number, number];
}

export interface MapSpec {
  title?: string;
  /** conjunto de regiões pré-definido, ver content/figures.ts */
  regions: MapRegion[];
}

export type Figure =
  | { type: 'chart'; chart: ChartSpec }
  | { type: 'text'; title?: string; source?: string; body: string }
  | { type: 'map'; map: MapSpec }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'formula'; lines: string[]; caption?: string };

/* ---------- itens ---------- */

interface ItemBase {
  id: string;
  skill: string;
  /** 1 = base, 2 = intermediário, 3 = desafio */
  d: Difficulty;
  stem: string;
  figure?: Figure;
  /** explicação mostrada no feedback — obrigatória, é o que ensina */
  why: string;
}

export interface McqItem extends ItemBase {
  kind: 'mcq';
  options: string[];
  answer: number;
  /** quando a figura é um mapa, cada opção corresponde a um id de região */
  regionIds?: string[];
}

export interface OrderItem extends ItemBase {
  kind: 'order';
  /** rótulo do eixo, ex.: "mais antigo → mais recente" */
  axis: string;
  tokens: string[];
  /** índices de `tokens` na ordem correta */
  answer: number[];
}

export interface PairItem extends ItemBase {
  kind: 'pair';
  left: string[];
  right: string[];
  /** answer[i] = índice em `right` que corresponde a left[i] */
  answer: number[];
  leftLabel?: string;
  rightLabel?: string;
}

export interface NumericItem extends ItemBase {
  kind: 'numeric';
  answer: number;
  /** tolerância absoluta aceita */
  tol?: number;
  unit?: string;
  decimals?: boolean;
  allowNegative?: boolean;
}

export interface ClassifyItem extends ItemBase {
  kind: 'classify';
  groups: string[];
  things: { t: string; g: number }[];
}

export interface BalanceItem extends ItemBase {
  kind: 'balance';
  left: string[];
  right: string[];
  /** coeficientes na ordem: left…, right… */
  answer: number[];
}

export type Item =
  | McqItem
  | OrderItem
  | PairItem
  | NumericItem
  | ClassifyItem
  | BalanceItem;

/* ---------- habilidades e matérias ---------- */

export type AreaId = 'matematica' | 'natureza' | 'humanas' | 'linguagens';

export interface Skill {
  id: string;
  subject: SubjectId;
  name: string;
  blurb: string;
  kind: Kind;
  /** nome do minijogo, aparece no card — cada habilidade tem seu formato */
  game: string;
  bank?: Item[];
  /** geradores procedurais: banco infinito para habilidades calculáveis */
  gen?: (d: Difficulty, rand: () => number) => Item;
}

export type SubjectId =
  | 'matematica' | 'fisica' | 'quimica' | 'biologia'
  | 'geografia' | 'historia' | 'filosofia' | 'sociologia'
  | 'portugues' | 'literatura' | 'ingles' | 'redacao';

export interface Subject {
  id: SubjectId;
  name: string;
  area: AreaId;
  tagline: string;
  skills: Skill[];
}

/* ---------- progresso ---------- */

export interface SkillState {
  /** domínio 0–100 no momento da última atualização */
  m: number;
  seen: number;
  correct: number;
  /** melhor sequência de acertos já feita nesta habilidade */
  best: number;
  /** epoch ms da última resposta */
  lastAt: number;
  /** caixa de repetição espaçada (0–5) */
  box: number;
  /** epoch ms em que a revisão vence */
  due: number;
  /** tempo médio de resposta em ms */
  avgMs: number;
  /** últimos 8 resultados, mais recente primeiro */
  recent: boolean[];
}

export interface DayLog {
  items: number;
  correct: number;
  xp: number;
  ms: number;
}

export interface Profile {
  name: string;
  xp: number;
  /** dias consecutivos com pelo menos uma sessão */
  streak: number;
  lastDay: string;
  goal: number;
  createdAt: number;
}

export interface Save {
  v: 1;
  profile: Profile;
  skills: Record<string, SkillState>;
  days: Record<string, DayLog>;
  /** id da última habilidade jogada, para o card "continuar" */
  lastSkill?: string;
  seenIntro: boolean;
}

/* ---------- execução de sessão ---------- */

export type SessionMode = 'skill' | 'subject' | 'review' | 'daily';

export interface SessionPlan {
  mode: SessionMode;
  title: string;
  subtitle: string;
  subject?: SubjectId;
  skillIds: string[];
  size: number;
}

export interface Answered {
  item: Item;
  correct: boolean;
  ms: number;
  xp: number;
  /** domínio antes → depois */
  from: number;
  to: number;
}
