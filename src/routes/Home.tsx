import { Link } from 'react-router-dom';
import { AREAS, SUBJECTS, skillById } from '../content';
import { dismissIntro, useSave } from '../core/store';
import { dayKey, effectiveMastery, levelFromXp, tierOf } from '../core/mastery';
import { dueSkills } from '../core/session';
import { Arc, HabitGrid, Meter } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { SubjectGlyph } from '../ui/SubjectGlyph';
import type { Subject } from '../core/types';

export function Home() {
  const save = useSave();
  const today = save.days[dayKey()] ?? { items: 0, correct: 0, xp: 0, ms: 0 };
  const goalPct = Math.min(100, (today.items / Math.max(1, save.profile.goal)) * 100);
  const level = levelFromXp(save.profile.xp);
  const due = dueSkills(save.skills);
  const last = save.lastSkill ? skillById(save.lastSkill) : undefined;

  const started = Object.values(save.skills).some((s) => s.seen > 0);

  return (
    <main className="shell home">
      {!save.seenIntro && <Intro />}

      {/* ---------- painel de hoje ---------- */}
      <section className="today panel facet rise" data-subject={last?.subject}>
        <div className="today__left">
          <p className="eyebrow">{saudacao()}, {save.profile.name}</p>
          <h1 className="today__title">
            {started ? 'Continue de onde parou' : 'Comece pelo que der vontade'}
          </h1>
          <p className="today__sub muted">
            {started
              ? `${today.items} ${today.items === 1 ? 'item respondido' : 'itens respondidos'} hoje · meta de ${save.profile.goal}`
              : 'Doze matérias, cada uma com seus desafios. Sessões de 5 a 15 minutos.'}
          </p>

          <div className="today__cta">
            {last ? (
              <Link className="btn btn--primary btn--lg" to={`/jogar?mode=skill&id=${last.id}&size=14`}>
                <Icon name="play" size={18} />
                Continuar · {last.name}
              </Link>
            ) : (
              <Link className="btn btn--primary btn--lg" to="/jogar?mode=daily&size=8">
                <Icon name="play" size={18} />
                Treino rápido
              </Link>
            )}
            <Link className="btn btn--lg" to="/jogar?mode=daily&size=14">
              <Icon name="shuffle" size={18} />
              Treino do dia
            </Link>
          </div>
        </div>

        <div className="today__right">
          <Arc value={goalPct} size={104} stroke={6}>
            <div className="today__ring">
              <span className="num">{today.items}</span>
              <small>de {save.profile.goal}</small>
            </div>
          </Arc>
          <div className="today__stats">
            <span className="chip chip--num">
              <Icon name="streak" size={14} /> {save.profile.streak} {save.profile.streak === 1 ? 'dia' : 'dias'}
            </span>
            <span className="chip chip--num">
              <Icon name="bolt" size={14} /> nível {level.level}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- revisão vencida vem antes de qualquer novidade ---------- */}
      {due.length > 0 && (
        <section className="due rise-2">
          <div className="due__head">
            <span className="due__mark"><Icon name="refresh" size={17} /></span>
            <div>
              <strong>{due.length} {due.length === 1 ? 'assunto pede revisão' : 'assuntos pedem revisão'}</strong>
              <p className="faint">Voltar agora é o que impede o domínio de escorrer.</p>
            </div>
            <Link className="btn btn--sm" to="/revisao">Ver fila</Link>
          </div>
          <div className="due__chips">
            {due.slice(0, 6).map((d) => (
              <Link
                key={d.skill.id}
                to={`/jogar?mode=skill&id=${d.skill.id}&size=8`}
                className="due__chip"
                data-subject={d.skill.subject}
              >
                <SubjectGlyph subject={d.skill.subject} size={15} />
                {d.skill.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------- o espectro: as 12 matérias ---------- */}
      <section className="sect">
        <div className="sect__head">
          <h2 className="sect__title">Matérias</h2>
          <span className="sect__note">{SUBJECTS.length} matérias · {SUBJECTS.reduce((n, s) => n + s.skills.length, 0)} habilidades</span>
        </div>

        {AREAS.map((area) => (
          <div key={area.id}>
            <div className="area-label">
              <span className="eyebrow">{area.name}</span>
            </div>
            <div className="subjects">
              {SUBJECTS.filter((s) => s.area === area.id).map((s) => (
                <SubjectCard key={s.id} subject={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ---------- constância ---------- */}
      {started && (
        <section className="sect">
          <div className="sect__head">
            <h2 className="sect__title">Constância</h2>
            <Link className="sect__note" to="/progresso">ver progresso completo →</Link>
          </div>
          <div className="panel constancy">
            <HabitGrid days={save.days} weeks={3} />
            <p className="faint constancy__note">
              Três semanas. Cada coluna é uma semana e cada quadrado, um dia — a cor cresce
              com o número de itens respondidos.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

/** Explicação de primeira vez: aparece uma vez, some para sempre. */
function Intro() {
  const pontos = [
    ['target', 'Domínio por habilidade', 'Cada habilidade tem um nível próprio, de Contato a Maestria. Ele sobe com item difícil e decai se você some.'],
    ['layers', 'Dificuldade que acompanha', 'Três acertos seguidos e o jogo sobe o nível. Dois erros e ele desce. Você fica onde ainda aprende.'],
    ['refresh', 'Revisão automática', 'Todo erro volta em 1 dia, depois em 3, 7, 16 e 35. Não é preciso montar cronograma.'],
  ] as const;

  return (
    <section className="intro panel facet rise">
      <button className="intro__close" onClick={dismissIntro} aria-label="fechar apresentação">
        <Icon name="close" size={16} />
      </button>
      <p className="eyebrow">Como o Prisma funciona</p>
      <h2 className="intro__title">Partidas de 5 a 15 minutos que medem o que você realmente sabe</h2>
      <div className="intro__grid">
        {pontos.map(([icon, titulo, texto]) => (
          <div key={titulo} className="intro__item">
            <span className="intro__icon"><Icon name={icon} size={17} /></span>
            <strong>{titulo}</strong>
            <p className="faint">{texto}</p>
          </div>
        ))}
      </div>
      <button className="btn btn--sm" onClick={dismissIntro}>Entendi, vamos jogar</button>
    </section>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
  const save = useSave();
  const values = subject.skills.map((s) => effectiveMastery(save.skills[s.id]));
  const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
  const touched = subject.skills.filter((s) => (save.skills[s.id]?.seen ?? 0) > 0).length;

  return (
    <Link
      className="scard"
      to={`/materia/${subject.id}`}
      data-subject={subject.id}
      style={{ ['--lit' as string]: (avg / 100).toFixed(2) }}
    >
      <div className="scard__top">
        <span className="scard__glyph"><SubjectGlyph subject={subject.id} size={22} /></span>
        <div className="grow">
          <div className="scard__name">{subject.name}</div>
          <p className="scard__tag">{subject.tagline}</p>
        </div>
      </div>
      <div className="scard__foot">
        <div className="grow">
          <Meter value={avg} />
        </div>
        <span className="scard__meta">
          <b>{touched}</b>/{subject.skills.length}
        </span>
      </div>
      <div className="scard__tier eyebrow">{avg >= 1 ? tierOf(avg).name : 'não iniciada'}</div>
    </Link>
  );
}

function saudacao() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa madrugada';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}
