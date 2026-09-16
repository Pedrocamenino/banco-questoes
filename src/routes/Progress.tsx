import { Link } from 'react-router-dom';
import { ALL_SKILLS, SUBJECTS } from '../content';
import { resetProgress, seedDemo, setGoal, setName, useSave } from '../core/store';
import { dayKey, effectiveMastery, levelFromXp, tierOf } from '../core/mastery';
import { weakestSkills } from '../core/session';
import { Arc, HabitGrid, Meter, StatTile } from '../ui/bits';
import { SkillRow } from '../ui/SkillRow';
import { Icon } from '../ui/Icon';
import { SubjectGlyph } from '../ui/SubjectGlyph';

export function Progress() {
  const save = useSave();
  const level = levelFromXp(save.profile.xp);

  const days = Object.entries(save.days);
  const totals = days.reduce(
    (acc, [, d]) => ({ items: acc.items + d.items, correct: acc.correct + d.correct, ms: acc.ms + d.ms }),
    { items: 0, correct: 0, ms: 0 },
  );
  const acc = totals.items ? Math.round((totals.correct / totals.items) * 100) : 0;
  const avgSec = totals.items ? Math.round(totals.ms / totals.items / 1000) : 0;
  const today = save.days[dayKey()]?.items ?? 0;

  const weak = weakestSkills(save.skills, 6);
  const mastered = ALL_SKILLS.filter((s) => effectiveMastery(save.skills[s.id]) >= 65).length;

  return (
    <main className="shell progress">
      <p className="eyebrow rise">Seu progresso</p>
      <h1 className="page-title rise-2">O que você já domina</h1>

      <section className="prof panel facet rise-2">
        <Arc value={(level.into / level.need) * 100} size={106} stroke={6}>
          <div className="prof__ring">
            <span className="num">{level.level}</span>
            <small>nível</small>
          </div>
        </Arc>
        <div className="prof__meta">
          <div className="prof__name">{save.profile.name}</div>
          <p className="faint">
            {level.into.toLocaleString('pt-BR')} / {level.need.toLocaleString('pt-BR')} XP para o próximo nível ·
            {' '}{save.profile.xp.toLocaleString('pt-BR')} XP no total
          </p>
          <div className="prof__chips">
            <span className="chip chip--num"><Icon name="streak" size={14} /> {save.profile.streak} dias seguidos</span>
            <span className="chip chip--num"><Icon name="target" size={14} /> {today}/{save.profile.goal} hoje</span>
          </div>
        </div>
      </section>

      <section className="grid-stats rise-3">
        <StatTile icon="check" label="Acerto geral" value={`${acc}%`} sub={`${totals.correct} de ${totals.items} itens`} />
        <StatTile icon="clock" label="Tempo médio" value={`${avgSec}s`} sub="por item respondido" tone="accent" />
        <StatTile icon="layers" label="Habilidades dominadas" value={`${mastered}`} sub={`de ${ALL_SKILLS.length} no total`} />
        <StatTile icon="bolt" label="XP acumulado" value={save.profile.xp.toLocaleString('pt-BR')} sub={`nível ${level.level}`} tone="xp" />
      </section>

      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Constância</h2>
          <span className="sect__note">últimas 6 semanas</span>
        </div>
        <div className="panel constancy">
          <HabitGrid days={save.days} weeks={6} />
          <p className="faint constancy__note">
            Cada coluna é uma semana e cada quadrado, um dia. A cor cresce com o número de
            itens respondidos — o que importa aqui é a frequência, não o volume de um dia só.
          </p>
        </div>
      </section>

      {weak.length > 0 && (
        <section className="sect">
          <div className="sect__head">
            <h2 className="sect__title">Pontos mais frágeis</h2>
            <span className="sect__note">o que mais vale treinar agora</span>
          </div>
          <div className="skills">
            {weak.map(({ skill, state, m }) => (
              <SkillRow
                key={skill.id}
                skill={skill}
                state={state}
                to={`/jogar?mode=skill&id=${skill.id}&size=8`}
                showSubject
                badge={<span className="chip chip--accent">{tierOf(m).name}</span>}
                facts={<>acerto de {Math.round((state.correct / state.seen) * 100)}% em {state.seen} itens</>}
              />
            ))}
          </div>
        </section>
      )}

      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Domínio por matéria</h2>
        </div>
        <div className="bysub panel">
          {SUBJECTS.map((s) => {
            const vals = s.skills.map((k) => effectiveMastery(save.skills[k.id]));
            const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
            return (
              <Link key={s.id} to={`/materia/${s.id}`} className="bysub__row" data-subject={s.id}>
                <span className="bysub__glyph"><SubjectGlyph subject={s.id} size={17} /></span>
                <span className="bysub__name">{s.name}</span>
                <span className="bysub__meter"><Meter value={avg} /></span>
                <span className="bysub__val num">{Math.round(avg)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Ajustes</h2>
        </div>
        <div className="panel settings">
          <label className="field">
            <span className="eyebrow">Como quer ser chamado</span>
            <input
              className="input"
              value={save.profile.name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
            />
          </label>

          <div className="field">
            <span className="eyebrow">Meta diária de itens</span>
            <div className="goals">
              {[10, 20, 30, 50].map((g) => (
                <button
                  key={g}
                  className={`sizebtn ${save.profile.goal === g ? 'sizebtn--on' : ''}`}
                  onClick={() => setGoal(g)}
                >
                  <span className="num">{g}</span>
                  <small>{g <= 10 ? '≈ 5 min' : g <= 20 ? '≈ 10 min' : g <= 30 ? '≈ 15 min' : '≈ 25 min'}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="eyebrow">Dados</span>
            <div className="row wrap" style={{ gap: 8 }}>
              <button className="btn btn--sm" onClick={() => seedDemo(ALL_SKILLS.map((s) => s.id))}>
                <Icon name="sparkle" size={15} /> Preencher com histórico de exemplo
              </button>
              <button
                className="btn btn--sm btn--ghost"
                onClick={() => { if (confirm('Apagar todo o seu progresso? Isso não pode ser desfeito.')) resetProgress(); }}
              >
                <Icon name="trash" size={15} /> Apagar progresso
              </button>
            </div>
            <p className="faint" style={{ fontSize: 'var(--fs-xs)', marginTop: 8 }}>
              Tudo fica salvo apenas neste navegador. Nada é enviado para nenhum servidor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
