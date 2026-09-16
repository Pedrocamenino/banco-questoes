/* =============================================================
   Componentes reutilizáveis de progresso e medida.
   Todos leem o matiz corrente (--accent), então mudam de cor
   sozinhos quando o contexto da matéria muda.
   ============================================================= */

import type { ReactNode } from 'react';
import { TIERS, tierOf } from '../core/mastery';
import { Icon, type IconName } from './Icon';

/* ---------- barra de domínio com marcas de faixa ---------- */

export function Meter({ value, showTier = false }: { value: number; showTier?: boolean }) {
  const tier = tierOf(value);
  return (
    <div className="meter">
      <div className="meter__track">
        <div className="meter__fill" style={{ width: `${Math.max(2, value)}%` }} />
        {TIERS.slice(1).map((t) => (
          <span key={t.id} className="meter__tick" style={{ left: `${t.min}%` }} />
        ))}
      </div>
      {showTier && (
        <div className="meter__labels">
          <span className="meter__tier">{tier.name}</span>
          <span className="num meter__value">{Math.round(value)}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- arco de domínio ---------- */

export function Arc({
  value, size = 52, stroke = 4, children,
}: { value: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gap = 0.26; // abertura embaixo, como um mostrador
  const len = c * (1 - gap);

  return (
    <div className="arc" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <g transform={`rotate(${90 + (gap * 360) / 2} ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="var(--line)" strokeWidth={stroke}
            strokeDasharray={`${len} ${c}`} strokeLinecap="round"
          />
          <circle
            className="arc__fill"
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="var(--accent)" strokeWidth={stroke}
            strokeDasharray={`${(len * Math.max(0, Math.min(100, value))) / 100} ${c}`}
            strokeLinecap="round"
          />
        </g>
      </svg>
      {children && <div className="arc__center">{children}</div>}
    </div>
  );
}

/* ---------- pips de progresso da sessão ---------- */

export function Pips({ total, done, results }: { total: number; done: number; results: boolean[] }) {
  return (
    <div className="pips" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
      {Array.from({ length: total }, (_, i) => {
        const state = i < results.length ? (results[i] ? 'ok' : 'err') : i === done ? 'now' : 'idle';
        return <span key={i} className={`pip pip--${state}`} />;
      })}
    </div>
  );
}

/* ---------- estatística ---------- */

export function StatTile({
  icon, label, value, sub, tone = 'default',
}: {
  icon?: IconName; label: string; value: ReactNode; sub?: string;
  tone?: 'default' | 'accent' | 'xp';
}) {
  return (
    <div className={`stat stat--${tone}`}>
      <div className="stat__head">
        {icon && <Icon name={icon} size={15} />}
        <span className="eyebrow">{label}</span>
      </div>
      <div className="stat__value num">{value}</div>
      {sub && <div className="stat__sub">{sub}</div>}
    </div>
  );
}

/* ---------- constância: últimas semanas ---------- */

export function HabitGrid({ days, weeks = 3 }: { days: Record<string, { items: number }>; weeks?: number }) {
  const total = weeks * 7;
  const cells = Array.from({ length: total }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (total - 1 - i));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const items = days[key]?.items ?? 0;
    const level = items === 0 ? 0 : items < 8 ? 1 : items < 18 ? 2 : 3;
    return { key, items, level, label: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) };
  });

  const ativos = cells.filter((c) => c.items > 0).length;

  return (
    <div className="habit-wrap">
      <div className="habit">
        {cells.map((c) => (
          <span
            key={c.key}
            className={`habit__cell habit__cell--${c.level}`}
            title={`${c.label}: ${c.items} ${c.items === 1 ? 'item' : 'itens'}`}
          />
        ))}
      </div>
      <div className="habit__legend">
        <span className="faint">{ativos} de {total} dias com estudo</span>
        <span className="habit__scale">
          <i className="habit__cell habit__cell--0" />
          <i className="habit__cell habit__cell--1" />
          <i className="habit__cell habit__cell--2" />
          <i className="habit__cell habit__cell--3" />
        </span>
      </div>
    </div>
  );
}

/* ---------- sequência ---------- */

export function StreakBadge({ days }: { days: number }) {
  return (
    <div className={`streak ${days > 0 ? 'streak--on' : ''}`} title="Dias seguidos estudando">
      <Icon name="streak" size={16} />
      <span className="num">{days}</span>
    </div>
  );
}
