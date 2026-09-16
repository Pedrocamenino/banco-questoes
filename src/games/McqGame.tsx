import { useEffect, useState } from 'react';
import type { McqItem } from '../core/types';
import type { GameProps } from './types';
import { Figure, MapFigure } from './Figure';
import { Icon } from '../ui/Icon';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function McqGame({ item, onCommit, locked }: GameProps<McqItem>) {
  const [choice, setChoice] = useState<number | null>(null);
  const isMap = item.figure?.type === 'map' && !!item.regionIds;

  useEffect(() => { setChoice(null); }, [item.id]);

  const commit = (i: number) => {
    if (locked) return;
    setChoice(i);
    onCommit(i === item.answer);
  };

  // atalhos de teclado: responder sem tirar a mão do teclado
  useEffect(() => {
    if (locked) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= item.options.length) commit(n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const stateOf = (i: number) => {
    if (!locked) return choice === i ? 'sel' : 'idle';
    if (i === item.answer) return 'ok';
    if (i === choice) return 'err';
    return 'off';
  };

  return (
    <div className="game game--mcq">
      {item.figure && !isMap && <Figure spec={item.figure} />}

      <p className="stem">{item.stem}</p>

      {isMap && item.figure?.type === 'map' && (
        <MapFigure
          map={item.figure.map}
          interaction={{
            selected: choice === null ? null : item.regionIds![choice] ?? null,
            correctId: locked ? item.regionIds![item.answer] ?? null : null,
            locked,
            onPick: (id) => {
              const i = item.regionIds!.indexOf(id);
              if (i >= 0) commit(i);
            },
          }}
        />
      )}

      <div className={`options ${isMap ? 'options--compact' : ''}`}>
        {item.options.map((opt, i) => {
          const st = stateOf(i);
          return (
            <button
              key={i}
              className={`opt opt--${st}`}
              onClick={() => commit(i)}
              disabled={locked}
              aria-pressed={choice === i}
            >
              <span className="opt__key num">{LETTERS[i]}</span>
              <span className="opt__text">{opt}</span>
              {st === 'ok' && <Icon name="check" size={18} className="opt__mark" />}
              {st === 'err' && <Icon name="close" size={18} className="opt__mark" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
