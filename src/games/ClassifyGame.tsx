import { useEffect, useState } from 'react';
import type { ClassifyItem } from '../core/types';
import type { GameProps } from './types';

/** Triagem: escolha o item, depois o grupo. Devolve tocando no item já colocado. */
export function ClassifyGame({ item, onCommit, locked }: GameProps<ClassifyItem>) {
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => { setPlaced({}); setActive(null); }, [item.id]);

  const remaining = item.things.map((_, i) => i).filter((i) => placed[i] === undefined);
  const full = remaining.length === 0;

  const place = (g: number) => {
    if (locked || active === null) return;
    setPlaced((p) => ({ ...p, [active]: g }));
    setActive(null);
  };

  const commit = () => {
    if (locked || !full) return;
    onCommit(item.things.every((t, i) => placed[i] === t.g));
  };

  return (
    <div className="game game--classify">
      <p className="stem">{item.stem}</p>

      {!locked && (
        <div className="tray">
          {remaining.length === 0 ? (
            <span className="tray__done">Tudo distribuído. Confira abaixo.</span>
          ) : (
            remaining.map((i) => (
              <button
                key={i}
                className={`tray__chip ${active === i ? 'tray__chip--sel' : ''}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                {item.things[i]!.t}
              </button>
            ))
          )}
        </div>
      )}

      <div className="buckets" data-cols={item.groups.length}>
        {item.groups.map((g, gi) => (
          <div
            key={gi}
            className={`bucket ${active !== null && !locked ? 'bucket--open' : ''}`}
            onClick={() => place(gi)}
          >
            <span className="bucket__name">{g}</span>
            <div className="bucket__list">
              {item.things.map((t, i) =>
                placed[i] === gi ? (
                  <button
                    key={i}
                    className={`bucket__chip ${locked ? (t.g === gi ? 'ok' : 'err') : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!locked) setPlaced((p) => { const n = { ...p }; delete n[i]; return n; });
                    }}
                    disabled={locked}
                  >
                    {t.t}
                    {locked && t.g !== gi && <em> → {item.groups[t.g]}</em>}
                  </button>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn--primary btn--block btn--lg" onClick={commit} disabled={locked || !full}>
        Conferir triagem
      </button>
    </div>
  );
}
