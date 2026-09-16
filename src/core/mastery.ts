/* =============================================================
   Modelo de progressão
   Regra central: XP mede esforço, Domínio mede aprendizado.
   As duas coisas nunca se contaminam — dá para ganhar XP num dia
   ruim, não dá para ganhar domínio sem acertar item difícil.
   ============================================================= */

import type { Difficulty, SkillState } from './types';

export const DAY = 86_400_000;

/* ---------- faixas de domínio ---------- */

export interface Tier {
  id: number;
  name: string;
  min: number;
  /** o que o aluno consegue fazer nesta faixa — vocabulário de aprendizado, não de RPG */
  meaning: string;
}

export const TIERS: Tier[] = [
  { id: 0, name: 'Contato',      min: 0,  meaning: 'Você começou a ver o assunto.' },
  { id: 1, name: 'Prática',      min: 15, meaning: 'Acerta o básico, ainda tropeça no resto.' },
  { id: 2, name: 'Consistência', min: 40, meaning: 'Resolve a maioria sem travar.' },
  { id: 3, name: 'Domínio',      min: 65, meaning: 'Erra pouco, inclusive nos difíceis.' },
  { id: 4, name: 'Maestria',     min: 85, meaning: 'Resolve rápido e sem hesitar.' },
];

export function tierOf(m: number): Tier {
  let t = TIERS[0]!;
  for (const x of TIERS) if (m >= x.min) t = x;
  return t;
}

/** Progresso dentro da faixa atual (0–1), usado pelas barras. */
export function tierProgress(m: number): number {
  const t = tierOf(m);
  const next = TIERS[t.id + 1];
  if (!next) return 1;
  return clamp01((m - t.min) / (next.min - t.min));
}

export const emptySkillState = (): SkillState => ({
  m: 0, seen: 0, correct: 0, best: 0, lastAt: 0, box: 0, due: 0, avgMs: 0, recent: [],
});

/* ---------- decaimento ---------- */

/**
 * Domínio decai com o tempo parado. Isso não é punição: é o que torna
 * a revisão honesta — o número na tela precisa dizer o que você sabe *hoje*.
 * Há 2 dias de carência, o decaimento é mais lento em faixas altas e existe
 * um piso: nada volta a zero sozinho.
 */
export function effectiveMastery(s: SkillState | undefined, now = Date.now()): number {
  if (!s || !s.lastAt) return s?.m ?? 0;
  const days = (now - s.lastAt) / DAY;
  if (days <= 2) return s.m;
  const rate = s.m >= 85 ? 0.35 : s.m >= 65 ? 0.5 : 0.75;
  const floor = s.m * 0.45;
  return Math.max(floor, round1(s.m - rate * (days - 2)));
}

/* ---------- atualização após uma resposta ---------- */

const GAIN: Record<Difficulty, number> = { 1: 5.5, 2: 9, 3: 13.5 };
const LOSS: Record<Difficulty, number> = { 1: 9, 2: 6.5, 3: 4.5 };
const BOX_DAYS = [1, 3, 7, 16, 35, 60];

export interface ApplyResult {
  next: SkillState;
  from: number;
  to: number;
}

export function applyAnswer(
  prev: SkillState | undefined,
  opts: { correct: boolean; d: Difficulty; ms: number; runStreak: number; now?: number },
): ApplyResult {
  const now = opts.now ?? Date.now();
  const s = prev ? { ...prev } : emptySkillState();
  const from = effectiveMastery(s, now);

  let m = from;
  if (opts.correct) {
    // ganho decresce conforme o domínio sobe: os últimos pontos são os mais caros
    const headroom = 1 - (m / 100) * 0.62;
    // bônus pequeno por resposta rápida, e só em item não-fácil
    const fast = opts.d > 1 && opts.ms < 12_000 ? 1.12 : 1;
    m += GAIN[opts.d] * headroom * fast;
  } else {
    // errar item fácil custa mais do que errar item difícil
    m -= LOSS[opts.d] * (0.6 + (m / 100) * 0.6);
  }
  m = round1(Math.min(100, Math.max(0, m)));

  s.m = m;
  s.seen += 1;
  s.correct += opts.correct ? 1 : 0;
  s.lastAt = now;
  s.avgMs = s.avgMs ? Math.round(s.avgMs * 0.7 + opts.ms * 0.3) : opts.ms;
  s.recent = [opts.correct, ...s.recent].slice(0, 8);
  s.best = Math.max(s.best, opts.runStreak);

  // repetição espaçada: acerto avança de caixa, erro derruba e agenda para já
  if (opts.correct) {
    s.box = Math.min(BOX_DAYS.length - 1, s.box + 1);
    s.due = now + BOX_DAYS[s.box]! * DAY;
  } else {
    s.box = Math.max(0, s.box - 2);
    s.due = now;
  }

  return { next: s, from, to: m };
}

/* ---------- dificuldade adaptativa ---------- */

/**
 * Mantém o aluno na faixa em que ainda erra, mas não trava:
 * o domínio define a base, a sequência recente empurra para cima ou para baixo.
 */
export function pickDifficulty(m: number, runStreak: number, recentWrong: number): Difficulty {
  let d: number = m < 28 ? 1 : m < 62 ? 2 : 3;
  if (runStreak >= 3) d += 1;
  if (recentWrong >= 2) d -= 1;
  return Math.min(3, Math.max(1, d)) as Difficulty;
}

/* ---------- XP e nível do perfil ---------- */

export function xpFor(correct: boolean, d: Difficulty, combo: number): number {
  if (!correct) return 2; // errar também custa tempo e atenção: nunca zero
  const base = 8 + d * 4;
  const bonus = Math.min(combo, 6) * 2;
  return base + bonus;
}

/** Curva suave: cada nível pede ~12% a mais que o anterior. */
export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  let level = 1;
  let need = 160;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level += 1;
    need = Math.round(need * 1.12);
  }
  return { level, into: rest, need };
}

/* ---------- fila de revisão ---------- */

export function isDue(s: SkillState | undefined, now = Date.now()): boolean {
  if (!s || !s.seen) return false;
  return s.due <= now;
}

/** Quanto mais vencido e mais fraco, mais alto na fila. */
export function reviewUrgency(s: SkillState, now = Date.now()): number {
  const late = Math.max(0, (now - s.due) / DAY);
  const weak = (100 - effectiveMastery(s, now)) / 100;
  return late * 1.4 + weak * 3;
}

/* ---------- utilidades ---------- */

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const round1 = (n: number) => Math.round(n * 10) / 10;

export function dayKey(t: number | Date = Date.now()): string {
  const d = new Date(t);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const pad = (n: number) => String(n).padStart(2, '0');
