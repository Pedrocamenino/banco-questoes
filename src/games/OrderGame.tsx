import { useEffect, useState } from 'react';
import type { OrderItem } from '../core/types';
import type { GameProps } from './types';
import { Icon } from '../ui/Icon';

/** Sequência: toque para colocar na linha, toque de novo para devolver. */
export function OrderGame({ item, onCommit, locked }: GameProps<OrderItem>) {
  const [line, setLine] = useState<number[]>([]);

  useEffect(() => { setLine([]); }, [item.id]);

  const pool = item.tokens.map((_, i) => i).filter((i) => !line.includes(i));
  const full = line.length === item.tokens.length;

  const commit = () => {
    if (locked || !full) return;
    onCommit(line.every((v, i) => v === item.answer[i]));
  };

  const slotState = (pos: number) => {
    if (!locked) return 'idle';
    return line[pos] === item.answer[pos] ? 'ok' : 'err';
  };

  return (
    <div className="game game--order">
      <p className="stem">{item.stem}</p>
      <div className="axis">
        <span className="axis__line" />
        <span className="axis__label eyebrow">{item.axis}</span>
      </div>

      <ol className="seq">
        {Array.from({ length: item.tokens.length }, (_, pos) => {
          const idx = line[pos];
          const st = idx === undefined ? 'empty' : slotState(pos);
          return (
            <li key={pos} className={`seq__slot seq__slot--${st}`}>
              <span className="seq__n num">{pos + 1}</span>
              {idx === undefined ? (
                <span className="seq__ghost">—</span>
              ) : (
                <button
                  className="seq__token"
                  onClick={() => !locked && setLine((l) => l.filter((x) => x !== idx))}
                  disabled={locked}
                >
                  {item.tokens[idx]}
                </button>
              )}
              {locked && st === 'err' && (
                <span className="seq__truth">{item.tokens[item.answer[pos]!]}</span>
              )}
            </li>
          );
        })}
      </ol>

      {!locked && (
        <div className="pool">
          {pool.map((i) => (
            <button key={i} className="pool__token" onClick={() => setLine((l) => [...l, i])}>
              <Icon name="plus" size={14} />
              {item.tokens[i]}
            </button>
          ))}
        </div>
      )}

      <button className="btn btn--primary btn--block btn--lg" onClick={commit} disabled={locked || !full}>
        Conferir ordem
      </button>
    </div>
  );
}
