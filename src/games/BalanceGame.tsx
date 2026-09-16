import { useEffect, useState } from 'react';
import type { BalanceItem } from '../core/types';
import type { GameProps } from './types';
import { Icon } from '../ui/Icon';

/** Equilíbrio: ajuste os coeficientes até os dois lados fecharem.
    O contador de átomos é a peça central — ensina enquanto se joga. */
export function BalanceGame({ item, onCommit, locked }: GameProps<BalanceItem>) {
  const all = [...item.left, ...item.right];
  const [coef, setCoef] = useState<number[]>(() => all.map(() => 1));

  useEffect(() => { setCoef(all.map(() => 1)); }, [item.id]);

  const counts = countAtoms(item, coef);
  const balanced = Object.values(counts).every((c) => c.l === c.r);

  const bump = (i: number, dir: 1 | -1) => {
    if (locked) return;
    setCoef((c) => c.map((v, k) => (k === i ? Math.min(20, Math.max(1, v + dir)) : v)));
  };

  const commit = () => {
    if (locked) return;
    // aceita qualquer proporção equivalente que esteja balanceada e na forma mínima
    onCommit(balanced && isMinimal(coef));
  };

  const species = (i: number, formula: string) => (
    <div className={`sp ${locked ? (coef[i] === item.answer[i] ? 'sp--ok' : 'sp--err') : ''}`}>
      <div className="sp__stepper">
        <button className="sp__btn" onClick={() => bump(i, 1)} disabled={locked} aria-label="aumentar">
          <Icon name="plus" size={14} />
        </button>
        <span className="sp__coef num">{coef[i]}</span>
        <button className="sp__btn" onClick={() => bump(i, -1)} disabled={locked} aria-label="diminuir">
          <Icon name="minus" size={14} />
        </button>
      </div>
      <span className="sp__formula">{formula}</span>
      {locked && coef[i] !== item.answer[i] && <span className="sp__truth num">{item.answer[i]}</span>}
    </div>
  );

  return (
    <div className="game game--balance">
      <p className="stem">{item.stem}</p>

      <div className="eq">
        <div className="eq__side">
          {item.left.map((f, i) => (
            <span key={f} className="eq__term">
              {i > 0 && <span className="eq__op">+</span>}
              {species(i, f)}
            </span>
          ))}
        </div>
        <span className={`eq__arrow ${balanced ? 'eq__arrow--ok' : ''}`}>
          <Icon name="arrowRight" size={22} />
        </span>
        <div className="eq__side">
          {item.right.map((f, i) => (
            <span key={f} className="eq__term">
              {i > 0 && <span className="eq__op">+</span>}
              {species(item.left.length + i, f)}
            </span>
          ))}
        </div>
      </div>

      <div className="atoms">
        <span className="eyebrow">Átomos — à esquerda · à direita</span>
        <div className="atoms__list">
          {Object.entries(counts).map(([el, c]) => (
            <span key={el} className={`atom ${c.l === c.r ? 'atom--ok' : ''}`}>
              <b>{el}</b>
              <span className="num">{c.l}</span>
              <i>·</i>
              <span className="num">{c.r}</span>
            </span>
          ))}
        </div>
      </div>

      <button className="btn btn--primary btn--block btn--lg" onClick={commit} disabled={locked}>
        {balanced ? 'Está equilibrada — confirmar' : 'Conferir mesmo assim'}
      </button>
    </div>
  );
}

/* ---------- contagem de átomos a partir da fórmula ---------- */

const SUB: Record<string, number> = {
  '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9,
};

export function parseFormula(f: string): Record<string, number> {
  const out: Record<string, number> = {};
  let i = 0;
  while (i < f.length) {
    const ch = f[i]!;
    if (!/[A-Z]/.test(ch)) { i++; continue; }
    let el = ch;
    i++;
    while (i < f.length && /[a-z]/.test(f[i]!)) { el += f[i]; i++; }
    let n = '';
    while (i < f.length && (f[i]! in SUB || /[0-9]/.test(f[i]!))) {
      n += f[i]! in SUB ? String(SUB[f[i]!]) : f[i];
      i++;
    }
    out[el] = (out[el] ?? 0) + (n ? Number(n) : 1);
  }
  return out;
}

function countAtoms(item: BalanceItem, coef: number[]) {
  const res: Record<string, { l: number; r: number }> = {};
  const add = (side: 'l' | 'r', formula: string, mult: number) => {
    for (const [el, n] of Object.entries(parseFormula(formula))) {
      res[el] ??= { l: 0, r: 0 };
      res[el]![side] += n * mult;
    }
  };
  item.left.forEach((f, i) => add('l', f, coef[i] ?? 1));
  item.right.forEach((f, i) => add('r', f, coef[item.left.length + i] ?? 1));
  return res;
}

/** Coeficientes precisam estar na menor proporção inteira. */
function isMinimal(coef: number[]): boolean {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  return coef.reduce((a, b) => gcd(a, b)) === 1;
}
