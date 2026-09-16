import { Link, useParams } from 'react-router-dom';
import { bankSize, subjectById } from '../content';
import { useSave } from '../core/store';
import { effectiveMastery, isDue, tierOf } from '../core/mastery';
import { SESSION_SIZES } from '../core/session';
import { Arc } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { SubjectGlyph } from '../ui/SubjectGlyph';
import { SkillRow } from '../ui/SkillRow';
import { useState } from 'react';

export function SubjectPage() {
  const { id = '' } = useParams();
  const subject = subjectById(id);
  const save = useSave();
  const [size, setSize] = useState(14);

  if (!subject) {
    return (
      <main className="shell empty-state">
        <h1>Matéria não encontrada</h1>
        <Link className="btn btn--primary" to="/">Voltar ao início</Link>
      </main>
    );
  }

  const values = subject.skills.map((s) => effectiveMastery(save.skills[s.id]));
  const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
  const totalSeen = subject.skills.reduce((n, s) => n + (save.skills[s.id]?.seen ?? 0), 0);
  const dueCount = subject.skills.filter((s) => isDue(save.skills[s.id])).length;

  return (
    <main className="shell subject" data-subject={subject.id}>
      <Link className="backlink" to="/">
        <Icon name="arrowLeft" size={16} /> Matérias
      </Link>

      <header className="shead panel facet rise">
        <span className="shead__glyph"><SubjectGlyph subject={subject.id} size={34} /></span>
        <div className="shead__text">
          <h1 className="shead__name">{subject.name}</h1>
          <p className="muted">{subject.tagline}</p>
          <div className="shead__chips">
            <span className="chip chip--accent">{tierOf(avg).name}</span>
            <span className="chip chip--num">{subject.skills.length} habilidades</span>
            <span className="chip chip--num">{totalSeen} itens respondidos</span>
            {dueCount > 0 && <span className="badge-due">{dueCount} para revisar</span>}
          </div>
        </div>
        <div className="shead__arc">
          <Arc value={avg} size={92} stroke={6}>
            <div className="shead__ring">
              <span className="num">{Math.round(avg)}</span>
              <small>domínio</small>
            </div>
          </Arc>
        </div>
      </header>

      <section className="mix rise-2">
        <div className="mix__text">
          <strong>Desafio da matéria</strong>
          <p className="faint">Mistura todas as habilidades, com peso maior nas mais frágeis.</p>
        </div>
        <div className="mix__sizes">
          {SESSION_SIZES.map((s) => (
            <button
              key={s.id}
              className={`sizebtn ${size === s.size ? 'sizebtn--on' : ''}`}
              onClick={() => setSize(s.size)}
            >
              <span>{s.label}</span>
              <small className="num">{s.minutes}</small>
            </button>
          ))}
        </div>
        <Link className="btn btn--primary btn--lg" to={`/jogar?mode=subject&id=${subject.id}&size=${size}`}>
          <Icon name="play" size={18} /> Jogar
        </Link>
      </section>

      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Habilidades</h2>
          <span className="sect__note">o formato do desafio muda conforme a habilidade</span>
        </div>

        <div className="skills">
          {subject.skills.map((s) => {
            const st = save.skills[s.id];
            const total = bankSize(s);
            return (
              <SkillRow
                key={s.id}
                skill={s}
                state={st}
                to={`/jogar?mode=skill&id=${s.id}&size=14`}
                badge={isDue(st) ? <span className="badge-due">revisar</span> : null}
                facts={
                  st?.seen
                    ? <>acerto de {Math.round((st.correct / st.seen) * 100)}% em {st.seen} itens · melhor sequência {st.best}</>
                    : <>ainda não jogada · {total === 'infinito' ? 'itens gerados sem repetir' : `${total} itens no banco`}</>
                }
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
