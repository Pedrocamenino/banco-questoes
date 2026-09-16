import { Link } from 'react-router-dom';
import { useSave } from '../core/store';
import { DAY } from '../core/mastery';
import { dueSkills } from '../core/session';
import { Icon } from '../ui/Icon';
import { SkillRow } from '../ui/SkillRow';
import { subjectById } from '../content';

export function Review() {
  const save = useSave();
  const due = dueSkills(save.skills);
  const now = Date.now();

  return (
    <main className="shell review">
      <p className="eyebrow rise">Repetição espaçada</p>
      <h1 className="page-title rise-2">Revisão</h1>
      <p className="lead muted rise-2">
        Todo erro volta em 1 dia. Depois em 3, 7, 16 e 35 — sempre que você acerta, o intervalo cresce.
        A fila abaixo mostra o que venceu.
      </p>

      {due.length === 0 ? (
        <div className="panel empty rise-3">
          <span className="empty__mark"><Icon name="check" size={22} /></span>
          <strong>Nada vencido por enquanto</strong>
          <p className="faint">
            Quando você errar um item, o assunto entra nesta fila automaticamente. Enquanto isso, siga treinando.
          </p>
          <Link className="btn btn--primary" to="/jogar?mode=daily&size=14">
            <Icon name="play" size={17} /> Treino do dia
          </Link>
        </div>
      ) : (
        <>
          <div className="review__cta rise-3">
            <div>
              <strong>{due.length} {due.length === 1 ? 'assunto vencido' : 'assuntos vencidos'}</strong>
              <p className="faint">A sessão mistura os mais urgentes primeiro.</p>
            </div>
            <Link className="btn btn--primary btn--lg" to="/jogar?mode=review&size=14">
              <Icon name="refresh" size={18} /> Revisar agora
            </Link>
          </div>

          <div className="skills">
            {due.map(({ skill, state }) => {
              const late = Math.floor((now - state.due) / DAY);
              return (
                <SkillRow
                  key={skill.id}
                  skill={skill}
                  state={state}
                  to={`/jogar?mode=skill&id=${skill.id}&size=8`}
                  showSubject
                  badge={
                    <span className="badge-due">
                      {late <= 0 ? 'vence hoje' : `${late} ${late === 1 ? 'dia' : 'dias'} em atraso`}
                    </span>
                  }
                  facts={
                    <>
                      {subjectById(skill.subject)?.name} · acerto de{' '}
                      {Math.round((state.correct / Math.max(1, state.seen)) * 100)}% em {state.seen} itens
                    </>
                  }
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
