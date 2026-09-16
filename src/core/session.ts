/* =============================================================
   Montagem de sessões e escolha adaptativa do próximo item.
   O item nunca é sorteado de antemão: ele é escolhido no momento,
   com base no domínio atual e no que acabou de acontecer na partida.
   ============================================================= */

import { ALL_SKILLS, skillById, subjectById } from '../content';
import type { Difficulty, Item, SessionPlan, Skill, SkillState, SubjectId } from './types';
import { effectiveMastery, isDue, pickDifficulty, reviewUrgency } from './mastery';

export const SESSION_SIZES = [
  { id: 'rapida', size: 8, label: 'Rápida', minutes: '≈ 5 min' },
  { id: 'padrao', size: 14, label: 'Padrão', minutes: '≈ 10 min' },
  { id: 'longa', size: 20, label: 'Longa', minutes: '≈ 15 min' },
] as const;

const rand = () => Math.random();

/* ---------- escolha do próximo item ---------- */

export interface PickContext {
  skills: Record<string, SkillState>;
  runStreak: number;
  recentWrong: number;
  used: Set<string>;
}

function fromBank(skill: Skill, d: Difficulty, used: Set<string>): Item | null {
  const bank = skill.bank ?? [];
  const tryLevels: Difficulty[] = d === 1 ? [1, 2, 3] : d === 2 ? [2, 1, 3] : [3, 2, 1];

  for (const level of tryLevels) {
    const pool = bank.filter((i) => i.d === level && !used.has(i.id));
    if (pool.length) return pool[Math.floor(rand() * pool.length)]!;
  }
  // banco esgotado nesta sessão: repete o item mais distante na fila
  const pool = bank.filter((i) => i.d === d);
  const fallback = pool.length ? pool : bank;
  return fallback.length ? fallback[Math.floor(rand() * fallback.length)]! : null;
}

export function nextItem(skillId: string, ctx: PickContext): Item | null {
  const skill = skillById(skillId);
  if (!skill) return null;

  const m = effectiveMastery(ctx.skills[skillId]);
  const d = pickDifficulty(m, ctx.runStreak, ctx.recentWrong);

  if (skill.gen) {
    // geradores nunca repetem: a assinatura do enunciado basta para variar
    return skill.gen(d, rand);
  }
  return fromBank(skill, d, ctx.used);
}

/* ---------- planos de sessão ---------- */

export function planSkill(skillId: string, size: number): SessionPlan | null {
  const skill = skillById(skillId);
  if (!skill) return null;
  const subject = subjectById(skill.subject);
  return {
    mode: 'skill',
    title: skill.name,
    subtitle: subject?.name ?? '',
    subject: skill.subject,
    skillIds: [skillId],
    size,
  };
}

/** Desafio da matéria: mistura as habilidades, priorizando as mais fracas. */
export function planSubject(
  subjectId: SubjectId,
  size: number,
  skills: Record<string, SkillState>,
): SessionPlan | null {
  const subject = subjectById(subjectId);
  if (!subject) return null;

  const ordered = [...subject.skills].sort(
    (a, b) => effectiveMastery(skills[a.id]) - effectiveMastery(skills[b.id]),
  );
  // as duas mais fracas entram com peso dobrado
  const weighted = [...ordered, ...ordered.slice(0, 2)];

  return {
    mode: 'subject',
    title: `Desafio de ${subject.name}`,
    subtitle: 'Todas as habilidades da matéria, com peso maior nas mais frágeis',
    subject: subjectId,
    skillIds: weighted.map((s) => s.id),
    size,
  };
}

/** Revisão: só o que está vencido na repetição espaçada, do mais urgente ao menos. */
export function planReview(size: number, skills: Record<string, SkillState>): SessionPlan | null {
  const due = dueSkills(skills);
  if (!due.length) return null;

  return {
    mode: 'review',
    title: 'Revisão do dia',
    subtitle: `${due.length} ${due.length === 1 ? 'assunto vencido' : 'assuntos vencidos'} na repetição espaçada`,
    skillIds: due.map((d) => d.skill.id),
    size: Math.min(size, Math.max(6, due.length * 3)),
  };
}

/** Treino livre: mistura tudo, com viés para o que está mais fraco e para o inédito. */
export function planDaily(size: number, skills: Record<string, SkillState>): SessionPlan {
  const scored = ALL_SKILLS.map((skill) => {
    const st = skills[skill.id];
    const m = effectiveMastery(st);
    const novelty = st?.seen ? 0 : 25;
    return { skill, score: 100 - m + novelty };
  }).sort((a, b) => b.score - a.score);

  return {
    mode: 'daily',
    title: 'Treino do dia',
    subtitle: 'Mistura das 12 matérias, priorizando o que está mais frágil',
    skillIds: scored.slice(0, 12).map((s) => s.skill.id),
    size,
  };
}

/* ---------- consultas de apoio ---------- */

export interface DueSkill {
  skill: Skill;
  state: SkillState;
  urgency: number;
}

export function dueSkills(skills: Record<string, SkillState>, now = Date.now()): DueSkill[] {
  return ALL_SKILLS.flatMap((skill) => {
    const state = skills[skill.id];
    if (!state || !isDue(state, now)) return [];
    return [{ skill, state, urgency: reviewUrgency(state, now) }];
  }).sort((a, b) => b.urgency - a.urgency);
}

/** Habilidades mais frágeis já praticadas — alimenta a tela de progresso. */
export function weakestSkills(skills: Record<string, SkillState>, n = 5) {
  return ALL_SKILLS.flatMap((skill) => {
    const state = skills[skill.id];
    if (!state || state.seen < 3) return [];
    return [{ skill, state, m: effectiveMastery(state) }];
  })
    .sort((a, b) => a.m - b.m)
    .slice(0, n);
}

/** Percorre os ids do plano em rodízio, para a sessão alternar habilidades. */
export function skillAt(plan: SessionPlan, index: number): string {
  return plan.skillIds[index % plan.skillIds.length]!;
}
