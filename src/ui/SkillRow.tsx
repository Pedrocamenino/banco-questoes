import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Skill, SkillState } from '../core/types';
import { effectiveMastery } from '../core/mastery';
import { GAME_LABEL } from '../games/Game';
import { Icon } from './Icon';
import { Meter } from './bits';
import { SubjectGlyph } from './SubjectGlyph';

interface Props {
  skill: Skill;
  state?: SkillState;
  /** para onde a linha leva — normalmente uma sessão daquela habilidade */
  to: string;
  /** chip com o nome da matéria: útil fora da página da matéria */
  showSubject?: boolean;
  badge?: ReactNode;
  /** linha de estatística; quando ausente, mostra o estado do banco */
  facts?: ReactNode;
  showTier?: boolean;
}

/** A linha de habilidade é a peça mais repetida do produto: matéria,
    revisão e progresso usam exatamente a mesma, só mudando o que anotam. */
export function SkillRow({ skill, state, to, showSubject, badge, facts, showTier = true }: Props) {
  const m = effectiveMastery(state);

  return (
    <Link className="skill" to={to} data-subject={skill.subject}>
      <div className="skill__main">
        <div className="skill__head">
          {showSubject && <SubjectGlyph subject={skill.subject} size={16} />}
          <span className="skill__name">{skill.name}</span>
          <span className="chip">{GAME_LABEL[skill.kind]}</span>
          {badge}
        </div>
        <p className="skill__blurb">{skill.blurb}</p>
        {facts && <p className="skill__facts faint">{facts}</p>}
      </div>

      <div className="skill__meter">
        <Meter value={m} showTier={showTier} />
      </div>

      <span className="skill__go"><Icon name="play" size={16} /></span>
    </Link>
  );
}
