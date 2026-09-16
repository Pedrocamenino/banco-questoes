import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './routes/Home';
import { SubjectPage } from './routes/Subject';
import { Play } from './routes/Play';
import { Progress } from './routes/Progress';
import { Review } from './routes/Review';
import { Icon } from './ui/Icon';
import { useSave } from './core/store';
import { levelFromXp } from './core/mastery';
import { useEffect } from 'react';

export default function App() {
  const { pathname, search } = useLocation();
  const playing = pathname.startsWith('/jogar');

  // toda troca de tela começa do topo — sessão não herda rolagem da anterior
  useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);

  return (
    <>
      {!playing && <Topbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materia/:id" element={<SubjectPage />} />
        <Route path="/jogar" element={<Play />} />
        <Route path="/revisao" element={<Review />} />
        <Route path="/progresso" element={<Progress />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!playing && <Footer />}
    </>
  );
}

function Topbar() {
  const save = useSave();
  const level = levelFromXp(save.profile.xp);

  return (
    <header className="topbar">
      <div className="shell topbar__in">
        <NavLink to="/" className="brand">
          <span className="brand__mark"><Icon name="prism" size={17} /></span>
          <span className="brand__name">Prisma<span>ENEM</span></span>
        </NavLink>

        <nav className="row" style={{ gap: 2 }}>
          <NavLink to="/" end className="navlink">
            <Icon name="grid" size={17} /><span className="navlink__text">Matérias</span>
          </NavLink>
          <NavLink to="/revisao" className="navlink">
            <Icon name="refresh" size={17} /><span className="navlink__text">Revisão</span>
          </NavLink>
          <NavLink to="/progresso" className="navlink">
            <Icon name="chart" size={17} /><span className="navlink__text">Progresso</span>
          </NavLink>
        </nav>

        <span className="xpchip" title={`${save.profile.xp} XP`}>
          <Icon name="bolt" size={14} />
          <b>{level.level}</b>
        </span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <p className="faint">
          Prisma · plataforma de estudo em partidas curtas para o ENEM. Seu progresso fica salvo neste navegador.
        </p>
      </div>
    </footer>
  );
}
