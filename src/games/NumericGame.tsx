import { useEffect, useState } from 'react';
import type { NumericItem } from '../core/types';
import type { GameProps } from './types';
import { Figure } from './Figure';
import { Icon } from '../ui/Icon';

export function NumericGame({ item, onCommit, locked }: GameProps<NumericItem>) {
  const [raw, setRaw] = useState('');

  useEffect(() => { setRaw(''); }, [item.id]);

  const parsed = Number(raw.replace(',', '.'));
  const valid = raw !== '' && raw !== '-' && Number.isFinite(parsed);
  const tol = item.tol ?? 0;
  const correct = valid && Math.abs(parsed - item.answer) <= tol + 1e-9;

  const press = (k: string) => {
    if (locked) return;
    if (k === 'del') return setRaw((v) => v.slice(0, -1));
    if (k === ',') return setRaw((v) => (item.decimals && !v.includes(',') && v !== '' ? v + ',' : v));
    if (k === '-') return setRaw((v) => (item.allowNegative ? (v.startsWith('-') ? v.slice(1) : '-' + v) : v));
    setRaw((v) => (v.replace('-', '').replace(',', '').length >= 8 ? v : v + k));
  };

  const commit = () => {
    if (locked || !valid) return;
    onCommit(correct);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked) return;
      if (e.key === 'Enter') { e.preventDefault(); commit(); return; }
      if (e.key === 'Backspace') return press('del');
      if (/^[0-9]$/.test(e.key)) return press(e.key);
      if (e.key === ',' || e.key === '.') return press(',');
      if (e.key === '-') return press('-');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const shown = raw === '' ? '—' : raw;
  const state = !locked ? 'idle' : correct ? 'ok' : 'err';

  return (
    <div className="game game--num">
      {item.figure && <Figure spec={item.figure} />}
      <p className="stem stem--calc">{item.stem}</p>

      <div className={`display display--${state}`}>
        {item.unit && <span className="display__unit">{item.unit}</span>}
        <span className="display__value num">{shown}</span>
        {locked && !correct && (
          <span className="display__truth num">
            resposta: {String(item.answer).replace('.', ',')}
          </span>
        )}
      </div>

      <div className="keypad">
        {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((k) => (
          <button key={k} className="key num" onClick={() => press(k)} disabled={locked}>{k}</button>
        ))}
        <button
          className="key key--alt num"
          onClick={() => press(item.decimals ? ',' : '-')}
          disabled={locked || (!item.decimals && !item.allowNegative)}
        >
          {item.decimals ? ',' : '−'}
        </button>
        <button className="key num" onClick={() => press('0')} disabled={locked}>0</button>
        <button className="key key--alt" onClick={() => press('del')} disabled={locked} aria-label="apagar">
          <Icon name="arrowLeft" size={18} />
        </button>
      </div>

      <button className="btn btn--primary btn--block btn--lg" onClick={commit} disabled={locked || !valid}>
        Confirmar
      </button>
    </div>
  );
}
