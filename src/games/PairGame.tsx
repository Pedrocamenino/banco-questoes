import { useEffect, useMemo, useState } from 'react';
import type { PairItem } from '../core/types';
import type { GameProps } from './types';

/** Conexão: toque de um lado, depois do outro. O par ganha um índice colorido. */
export function PairGame({ item, onCommit, locked }: GameProps<PairItem>) {
  const [links, setLinks] = useState<Record<number, number>>({});
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => { setLinks({}); setActive(null); }, [item.id]);

  const rightOrder = useMemo(() => item.right.map((_, i) => i), [item]);
  const usedRight = new Set(Object.values(links));
  const full = Object.keys(links).length === item.left.length;

  const pickLeft = (i: number) => {
    if (locked) return;
    if (links[i] !== undefined) {
      setLinks((l) => { const n = { ...l }; delete n[i]; return n; });
      setActive(i);
      return;
    }
    setActive(active === i ? null : i);
  };

  const pickRight = (j: number) => {
    if (locked || active === null || usedRight.has(j)) return;
    setLinks((l) => ({ ...l, [active]: j }));
    setActive(null);
  };

  const commit = () => {
    if (locked || !full) return;
    onCommit(item.left.every((_, i) => links[i] === item.answer[i]));
  };

  const leftState = (i: number) => {
    if (!locked) return active === i ? 'sel' : links[i] !== undefined ? 'set' : 'idle';
    return links[i] === item.answer[i] ? 'ok' : 'err';
  };

  return (
    <div className="game game--pair">
      <p className="stem">{item.stem}</p>

      <div className="pair">
        <div className="pair__col">
          <span className="eyebrow">{item.leftLabel ?? 'Coluna A'}</span>
          {item.left.map((t, i) => (
            <button
              key={i}
              className={`pair__item pair__item--${leftState(i)}`}
              onClick={() => pickLeft(i)}
              disabled={locked}
              style={links[i] !== undefined ? ({ '--link': links[i]! } as React.CSSProperties) : undefined}
            >
              <span className="pair__text">{t}</span>
              {links[i] !== undefined && <span className="pair__tag num">{links[i]! + 1}</span>}
            </button>
          ))}
        </div>

        <div className="pair__col">
          <span className="eyebrow">{item.rightLabel ?? 'Coluna B'}</span>
          {rightOrder.map((j) => {
            const taken = usedRight.has(j);
            return (
              <button
                key={j}
                className={`pair__item pair__item--${taken ? 'taken' : active !== null ? 'open' : 'idle'}`}
                onClick={() => pickRight(j)}
                disabled={locked || taken || active === null}
              >
                <span className="pair__tag num">{j + 1}</span>
                <span className="pair__text">{item.right[j]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {locked && (
        <ul className="pair__truth">
          {item.left.map((t, i) => (
            <li key={i} className={links[i] === item.answer[i] ? 'ok' : 'err'}>
              <b>{t}</b> → {item.right[item.answer[i]!]}
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn--primary btn--block btn--lg" onClick={commit} disabled={locked || !full}>
        Conferir conexões
      </button>
    </div>
  );
}
