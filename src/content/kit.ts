/* =============================================================
   Ferramenta de autoria dos itens.
   Mantém o banco legível: cada item declara só o que lhe é próprio.
   ============================================================= */

import type {
  BalanceItem, ClassifyItem, Difficulty, Figure, McqItem,
  NumericItem, OrderItem, PairItem, Skill, SubjectId,
} from '../core/types';

let seq = 0;
const nid = (skill: string) => `${skill}.${(++seq).toString(36)}`;

export const mcq = (
  skill: string, d: Difficulty,
  s: { stem: string; options: string[]; answer: number; why: string; figure?: Figure; regionIds?: string[] },
): McqItem => ({ id: nid(skill), skill, d, kind: 'mcq', ...s });

export const order = (
  skill: string, d: Difficulty,
  s: { stem: string; axis: string; tokens: string[]; answer: number[]; why: string; figure?: Figure },
): OrderItem => ({ id: nid(skill), skill, d, kind: 'order', ...s });

export const pair = (
  skill: string, d: Difficulty,
  s: {
    stem: string; left: string[]; right: string[]; answer: number[]; why: string;
    leftLabel?: string; rightLabel?: string; figure?: Figure;
  },
): PairItem => ({ id: nid(skill), skill, d, kind: 'pair', ...s });

export const num = (
  skill: string, d: Difficulty,
  s: {
    stem: string; answer: number; why: string; unit?: string; tol?: number;
    decimals?: boolean; allowNegative?: boolean; figure?: Figure;
  },
): NumericItem => ({ id: nid(skill), skill, d, kind: 'numeric', ...s });

export const classify = (
  skill: string, d: Difficulty,
  s: { stem: string; groups: string[]; things: { t: string; g: number }[]; why: string; figure?: Figure },
): ClassifyItem => ({ id: nid(skill), skill, d, kind: 'classify', ...s });

export const balance = (
  skill: string, d: Difficulty,
  s: { stem: string; left: string[]; right: string[]; answer: number[]; why: string },
): BalanceItem => ({ id: nid(skill), skill, d, kind: 'balance', ...s });

/** Açúcar para declarar uma habilidade sem repetir o id da matéria. */
export function skill(
  subject: SubjectId,
  id: string,
  s: Omit<Skill, 'id' | 'subject'>,
): Skill {
  return { id: `${subject}.${id}`, subject, ...s };
}

/* ---------- apoio a geradores procedurais ---------- */

export const pick = <T,>(arr: readonly T[], r: () => number): T => arr[Math.floor(r() * arr.length)]!;
export const int = (r: () => number, min: number, max: number) => min + Math.floor(r() * (max - min + 1));

/** Embaralha mantendo o gabarito: devolve as opções e o novo índice da resposta. */
export function shuffled(options: string[], answer: number, r: () => number) {
  const idx = options.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [idx[i], idx[j]] = [idx[j]!, idx[i]!];
  }
  return {
    options: idx.map((i) => options[i]!),
    answer: idx.indexOf(answer),
  };
}

/** Distratores numéricos plausíveis, sem repetir e sem negativos bobos. */
export function distractors(correct: number, r: () => number, n = 3): number[] {
  const out = new Set<number>();
  const shifts = [0.5, 2, 1.1, 0.9, 1.25, 0.75];
  let guard = 0;
  while (out.size < n && guard++ < 40) {
    const v = Math.round(correct * pick(shifts, r) + int(r, -2, 2));
    if (v !== correct && v > 0) out.add(v);
  }
  while (out.size < n) out.add(correct + out.size + 1);
  return [...out];
}

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });
