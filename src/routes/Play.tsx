import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Answered, Item, SessionPlan, SubjectId } from '../core/types';
import { recordAnswer, touchStreak, useSave } from '../core/store';
import { tierOf } from '../core/mastery';
import { nextItem, planDaily, planReview, planSkill, planSubject, skillAt } from '../core/session';
import { skillById } from '../content';
import { Game, GAME_LABEL } from '../games/Game';
import { Icon } from '../ui/Icon';
import { Arc, Meter, Pips } from '../ui/bits';

type Phase = 'play' | 'done';

export function Play() {
  const [params] = useSearchParams();
  const save = useSave();
  const navigate = useNavigate();

  const mode = params.get('mode') ?? 'skill';
  const id = params.get('id') ?? '';
  const size = Number(params.get('size') ?? 14);

  // o plano é montado uma vez: mudar o domínio no meio não pode remontar a sessão
  const plan = useMemo<SessionPlan | null>(() => {
    if (mode === 'skill') return planSkill(id, size);
    if (mode === 'subject') return planSubject(id as SubjectId, size, save.skills);
    if (mode === 'review') return planReview(size, save.skills);
    return planDaily(size, save.skills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id, size]);

  const [phase, setPhase] = useState<Phase>('play');
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  const [locked, setLocked] = useState(false);
  const [last, setLast] = useState<Answered | null>(null);
  const [log, setLog] = useState<Answered[]>([]);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const used = useRef(new Set<string>());
  const started = useRef(performance.now());
  const results = log.map((a) => a.correct);

  const draw = useCallback(
    (i: number, streak: number, recentWrong: number) => {
      if (!plan) return;
      const skillId = skillAt(plan, i);
      const next = nextItem(skillId, {
        skills: save.skills,
        runStreak: streak,
        recentWrong,
        used: used.current,
      });
      if (next) used.current.add(next.id);
      setItem(next);
      started.current = performance.now();
    },
    // save.skills muda a cada resposta, mas só precisamos do valor no momento do sorteio
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan],
  );

  useEffect(() => {
    if (!plan) return;
    touchStreak();
    draw(0, 0, 0);
  }, [plan, draw]);

  const subjectOf = (it: Item | null) => skillById(it?.skill ?? '')?.subject;

  const onCommit = (correct: boolean) => {
    if (!item || locked) return;
    const ms = Math.round(performance.now() - started.current);
    const streak = correct ? combo + 1 : 0;
    const { xp, from, to } = recordAnswer({
      skill: item.skill,
      correct,
      d: item.d,
      ms,
      runStreak: streak,
    });
    const entry: Answered = { item, correct, ms, xp, from, to };
    setLast(entry);
    setLog((l) => [...l, entry]);
    setCombo(streak);
    setBestCombo((b) => Math.max(b, streak));
    setLocked(true);
  };

  const advance = () => {
    if (!plan) return;
    const i = index + 1;
    setLocked(false);
    setLast(null);
    if (i >= plan.size) {
      setPhase('done');
      return;
    }
    const recentWrong = [...results, ...(last ? [last.correct] : [])].slice(-2).filter((r) => !r).length;
    setIndex(i);
    draw(i, combo, recentWrong);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); advance(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!plan) {
    return (
      <main className="shell empty-state">
        <h1>Nada para jogar agora</h1>
        <p className="muted">Sua fila de revisão está vazia. Escolha uma matéria para continuar.</p>
        <Link className="btn btn--primary" to="/">Voltar ao início</Link>
      </main>
    );
  }

  const subject = subjectOf(item) ?? plan.subject;

  if (phase === 'done') return <Result plan={plan} log={log} bestCombo={bestCombo} />;

  return (
    <div className="play" data-subject={subject}>
      <header className="hud">
        <div className="shell hud__in">
          <button className="hud__exit" onClick={() => navigate(-1)} aria-label="sair da sessão">
            <Icon name="close" size={18} />
          </button>
          <Pips total={plan.size} done={index} results={results} />
          <div className={`combo ${combo >= 2 ? 'combo--on' : ''}`}>
            <Icon name="streak" size={14} />
            <span className="num">{combo}</span>
          </div>
        </div>
      </header>

      <main className="shell play__stage">
        {item && (
          <>
            <div className="play__meta">
              <span className="chip chip--accent">{skillById(item.skill)?.name}</span>
              <span className="chip">{GAME_LABEL[item.kind]}</span>
              <span className="chip lvl" title={`dificuldade ${item.d} de 3`}>
                {[1, 2, 3].map((n) => (
                  <i key={n} className={n <= item.d ? 'lvl__on' : ''} />
                ))}
                nível {item.d}
              </span>
            </div>

            <div key={item.id} className="play__game rise">
              <Game item={item} onCommit={onCommit} locked={locked} />
            </div>
          </>
        )}
      </main>

      {last && (
        <aside className={`verdict verdict--${last.correct ? 'ok' : 'err'}`}>
          <div className="shell verdict__in">
            <div className="verdict__head">
              <span className="verdict__mark">
                <Icon name={last.correct ? 'check' : 'close'} size={18} />
              </span>
              <strong>{last.correct ? verdictWord(combo) : 'Não foi dessa vez'}</strong>
              <span className="verdict__xp num">+{last.xp} XP</span>
            </div>
            <p className="verdict__why">{last.item.why}</p>
            <button className="btn btn--primary btn--block" onClick={advance} autoFocus>
              {index + 1 >= plan.size ? 'Ver resultado' : 'Continuar'}
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

const verdictWord = (combo: number) =>
  combo >= 5 ? 'Emendando!' : combo >= 3 ? 'Três seguidas' : 'Certo';

/* =============================================================
   Resultado
   ============================================================= */

function Result({ plan, log, bestCombo }: { plan: SessionPlan; log: Answered[]; bestCombo: number }) {
  const save = useSave();
  const total = log.length;
  const hits = log.filter((a) => a.correct).length;
  const acc = total ? Math.round((hits / total) * 100) : 0;
  const xp = log.reduce((s, a) => s + a.xp, 0);
  const secs = Math.round(log.reduce((s, a) => s + a.ms, 0) / 1000);

  const bySkill = new Map<string, { from: number; to: number; hits: number; n: number }>();
  for (const a of log) {
    const cur = bySkill.get(a.item.skill) ?? { from: a.from, to: a.to, hits: 0, n: 0 };
    cur.to = a.to;
    cur.hits += a.correct ? 1 : 0;
    cur.n += 1;
    bySkill.set(a.item.skill, cur);
  }

  const missed = log.filter((a) => !a.correct);
  const again = `/jogar?mode=${plan.mode}&id=${plan.skillIds[0] ?? ''}&size=${plan.size}`;

  return (
    <main className="shell result" data-subject={plan.subject}>
      <p className="eyebrow rise">Sessão concluída</p>
      <h1 className="result__title rise-2">{plan.title}</h1>

      <section className="result__top rise-3">
        <div className="result__ring">
          <Arc value={acc} size={132} stroke={7}>
            <div className="result__acc">
              <span className="num">{acc}%</span>
              <small>{hits} de {total}</small>
            </div>
          </Arc>
        </div>
        <div className="result__nums">
          <div className="stat stat--xp">
            <span className="eyebrow">XP ganho</span>
            <div className="stat__value num">+{xp}</div>
          </div>
          <div className="stat">
            <span className="eyebrow">Sequência</span>
            <div className="stat__value num">{bestCombo}</div>
          </div>
          <div className="stat">
            <span className="eyebrow">Tempo</span>
            <div className="stat__value num">{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</div>
          </div>
        </div>
      </section>

      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Domínio nesta sessão</h2>
          <span className="sect__note">antes → depois</span>
        </div>
        <div className="deltas">
          {[...bySkill.entries()].map(([skillId, d]) => {
            const skill = skillById(skillId);
            const diff = Math.round(d.to - d.from);
            return (
              <div key={skillId} className="delta" data-subject={skill?.subject}>
                <div className="delta__head">
                  <span className="delta__name">{skill?.name}</span>
                  <span className={`delta__diff num ${diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat'}`}>
                    {diff > 0 ? '+' : ''}{diff === 0 ? '—' : diff}
                  </span>
                </div>
                <Meter value={d.to} showTier />
                <span className="delta__tier">{tierOf(d.to).meaning}</span>
              </div>
            );
          })}
        </div>
      </section>

      {missed.length > 0 && (
        <section className="sect">
          <div className="sect__head">
            <h2 className="sect__title">Agendado para revisão</h2>
            <span className="sect__note">volta em 1 dia</span>
          </div>
          <ul className="missed">
            {missed.map((a, i) => (
              <li key={i} className="missed__row">
                <span className="missed__skill">{skillById(a.item.skill)?.name}</span>
                <span className="missed__stem">{a.item.stem}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="result__cta">
        <Link className="btn btn--primary btn--lg" to={again} replace>
          <Icon name="refresh" size={18} /> Mais uma
        </Link>
        {plan.subject && (
          <Link className="btn btn--lg" to={`/materia/${plan.subject}`}>
            Ver a matéria
          </Link>
        )}
        <Link className="btn btn--ghost btn--lg" to="/">Início</Link>
      </div>

      <p className="result__foot faint">
        Você acumulou {save.profile.xp.toLocaleString('pt-BR')} XP até aqui.
      </p>
    </main>
  );
}
