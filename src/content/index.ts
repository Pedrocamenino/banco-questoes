/* =============================================================
   Catálogo: junta as matérias e dá acesso rápido a habilidades.
   ============================================================= */

import type { AreaId, Skill, Subject, SubjectId } from '../core/types';
import { MATEMATICA } from './matematica';
import { FISICA } from './fisica';
import { QUIMICA } from './quimica';
import { BIOLOGIA } from './biologia';
import { GEOGRAFIA } from './geografia';
import { HISTORIA } from './historia';
import { FILOSOFIA } from './filosofia';
import { SOCIOLOGIA } from './sociologia';
import { PORTUGUES } from './portugues';
import { LITERATURA } from './literatura';
import { INGLES } from './ingles';
import { REDACAO } from './redacao';

export interface Area {
  id: AreaId;
  name: string;
  short: string;
}

export const AREAS: Area[] = [
  { id: 'linguagens', name: 'Linguagens e Códigos', short: 'Linguagens' },
  { id: 'humanas', name: 'Ciências Humanas', short: 'Humanas' },
  { id: 'natureza', name: 'Ciências da Natureza', short: 'Natureza' },
  { id: 'matematica', name: 'Matemática', short: 'Matemática' },
];

export const SUBJECTS: Subject[] = [
  { id: 'matematica', name: 'Matemática', area: 'matematica', tagline: 'Contas rápidas, gráficos e problemas do mundo real.', skills: MATEMATICA },
  { id: 'fisica', name: 'Física', area: 'natureza', tagline: 'Movimento, energia e os fenômenos do dia a dia.', skills: FISICA },
  { id: 'quimica', name: 'Química', area: 'natureza', tagline: 'Reações, proporções e a matéria por dentro.', skills: QUIMICA },
  { id: 'biologia', name: 'Biologia', area: 'natureza', tagline: 'Da célula ao ecossistema, passando pela evolução.', skills: BIOLOGIA },
  { id: 'geografia', name: 'Geografia', area: 'humanas', tagline: 'Mapas, clima, população e disputas por território.', skills: GEOGRAFIA },
  { id: 'historia', name: 'História', area: 'humanas', tagline: 'Tempo, fontes e processos que explicam o presente.', skills: HISTORIA },
  { id: 'filosofia', name: 'Filosofia', area: 'humanas', tagline: 'Conceitos, argumentos e as perguntas que não envelhecem.', skills: FILOSOFIA },
  { id: 'sociologia', name: 'Sociologia', area: 'humanas', tagline: 'Desigualdade, instituições e o Brasil visto de perto.', skills: SOCIOLOGIA },
  { id: 'portugues', name: 'Português', area: 'linguagens', tagline: 'Leitura, sentido e os efeitos da linguagem.', skills: PORTUGUES },
  { id: 'literatura', name: 'Literatura', area: 'linguagens', tagline: 'Escolas, trechos e o que cada estética queria dizer.', skills: LITERATURA },
  { id: 'ingles', name: 'Inglês', area: 'linguagens', tagline: 'Ler rápido, inferir sentido e não cair em falso cognato.', skills: INGLES },
  { id: 'redacao', name: 'Redação', area: 'linguagens', tagline: 'Tese, repertório, coesão e proposta de intervenção.', skills: REDACAO },
];

export const ALL_SKILLS: Skill[] = SUBJECTS.flatMap((s) => s.skills);

const SUBJECT_MAP = new Map(SUBJECTS.map((s) => [s.id, s]));
const SKILL_MAP = new Map(ALL_SKILLS.map((s) => [s.id, s]));

export const subjectById = (id: string): Subject | undefined => SUBJECT_MAP.get(id as SubjectId);
export const skillById = (id: string): Skill | undefined => SKILL_MAP.get(id);

export const subjectsByArea = (area: AreaId): Subject[] => SUBJECTS.filter((s) => s.area === area);

/** Quantos itens distintos existem por habilidade (geradores contam como infinitos). */
export function bankSize(skill: Skill): number | 'infinito' {
  if (skill.gen) return 'infinito';
  return skill.bank?.length ?? 0;
}
