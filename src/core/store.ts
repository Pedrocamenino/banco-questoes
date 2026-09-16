/* =============================================================
   Estado persistido do aluno.
   Store minúscula em cima de useSyncExternalStore: sem dependência
   externa, sem provider, sem re-render em cascata.
   ============================================================= */

import { useSyncExternalStore } from 'react';
import type { Answered, Difficulty, Save, SkillState } from './types';
import { applyAnswer, dayKey, emptySkillState, xpFor } from './mastery';

const KEY = 'prisma.save.v1';

const blank = (): Save => ({
  v: 1,
  profile: {
    name: 'Estudante',
    xp: 0,
    streak: 0,
    lastDay: '',
    goal: 20,
    createdAt: Date.now(),
  },
  skills: {},
  days: {},
  seenIntro: false,
});

function load(): Save {
  if (typeof localStorage === 'undefined') return blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw) as Save;
    if (parsed?.v !== 1) return blank();
    return { ...blank(), ...parsed, profile: { ...blank().profile, ...parsed.profile } };
  } catch {
    return blank();
  }
}

let state: Save = load();
const listeners = new Set<() => void>();

function commit(next: Save) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* modo privado / cota cheia: o app continua funcionando na memória */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const snapshot = () => state;

export function useSave(): Save {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

export function useSkillState(id: string): SkillState | undefined {
  return useSave().skills[id];
}

export const getSave = (): Save => state;

/* ---------- ações ---------- */

export function recordAnswer(input: {
  skill: string;
  correct: boolean;
  d: Difficulty;
  ms: number;
  runStreak: number;
}): Pick<Answered, 'xp' | 'from' | 'to'> {
  const now = Date.now();
  const { next, from, to } = applyAnswer(state.skills[input.skill], {
    correct: input.correct,
    d: input.d,
    ms: input.ms,
    runStreak: input.runStreak,
    now,
  });
  const xp = xpFor(input.correct, input.d, input.runStreak);
  const key = dayKey(now);
  const day = state.days[key] ?? { items: 0, correct: 0, xp: 0, ms: 0 };

  commit({
    ...state,
    profile: { ...state.profile, xp: state.profile.xp + xp },
    skills: { ...state.skills, [input.skill]: next },
    days: {
      ...state.days,
      [key]: {
        items: day.items + 1,
        correct: day.correct + (input.correct ? 1 : 0),
        xp: day.xp + xp,
        ms: day.ms + input.ms,
      },
    },
    lastSkill: input.skill,
  });

  return { xp, from, to };
}

/** Chamado ao abrir uma sessão: mantém a ofensiva honesta (só conta dia jogado). */
export function touchStreak() {
  const today = dayKey();
  const p = state.profile;
  if (p.lastDay === today) return;

  const yesterday = dayKey(Date.now() - 86_400_000);
  const streak = p.lastDay === yesterday ? p.streak + 1 : 1;
  commit({ ...state, profile: { ...p, streak, lastDay: today } });
}

export function setGoal(goal: number) {
  commit({ ...state, profile: { ...state.profile, goal } });
}

export function setName(name: string) {
  commit({ ...state, profile: { ...state.profile, name: name.trim() || 'Estudante' } });
}

export function dismissIntro() {
  commit({ ...state, seenIntro: true });
}

export function resetProgress() {
  commit(blank());
}

/** Semeia um histórico plausível para inspecionar as telas com dados reais. */
export function seedDemo(skillIds: string[]) {
  const now = Date.now();
  const skills: Record<string, SkillState> = {};
  skillIds.forEach((id, i) => {
    if (i % 3 === 2) return; // um terço das habilidades continua intocado
    const m = [8, 22, 34, 47, 58, 71, 83, 92][(i * 5) % 8]!;
    const seen = 6 + ((i * 7) % 26);
    const daysAgo = [0, 1, 2, 4, 9, 14][(i * 3) % 6]!;
    skills[id] = {
      ...emptySkillState(),
      m,
      seen,
      correct: Math.round(seen * (0.42 + m / 220)),
      best: 2 + (i % 7),
      lastAt: now - daysAgo * 86_400_000,
      box: m > 60 ? 3 : 1,
      due: now - (i % 4 === 0 ? 2 : -3) * 86_400_000,
      avgMs: 9000 + ((i * 1300) % 11000),
      recent: Array.from({ length: 6 }, (_, k) => (i + k) % 3 !== 0),
    };
  });

  const days: Record<string, import('./types').DayLog> = {};
  for (let i = 0; i < 21; i++) {
    if (i % 5 === 3) continue; // dias em branco: constância real não é perfeita
    const items = 8 + ((i * 11) % 24);
    days[dayKey(now - i * 86_400_000)] = {
      items,
      correct: Math.round(items * (0.55 + ((i % 5) * 0.06))),
      xp: items * 14,
      ms: items * 11_000,
    };
  }

  commit({
    ...state,
    profile: { ...state.profile, xp: 4820, streak: 3, lastDay: dayKey(now) },
    skills,
    days,
    lastSkill: skillIds[1],
    seenIntro: true,
  });
}
