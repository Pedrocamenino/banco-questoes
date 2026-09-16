/* =============================================================
   Renderizador de figuras.
   Gráficos, tabelas, fontes e mapas desenhados aqui mesmo, em SVG,
   com as cores derivadas do matiz da matéria — nada de imagem
   importada, nada de biblioteca de gráficos com estética própria.
   ============================================================= */

import type { ChartSpec, Figure as FigureSpec, MapSpec } from '../core/types';

const W = 420;
const H = 230;
const PAD = { top: 18, right: 14, bottom: 30, left: 38 };

const fmt = (n: number) =>
  Math.abs(n) >= 1000 ? n.toLocaleString('pt-BR') : String(Math.round(n * 100) / 100).replace('.', ',');

export function Figure({ spec }: { spec: FigureSpec }) {
  switch (spec.type) {
    case 'chart': return <ChartFigure chart={spec.chart} />;
    case 'table': return <TableFigure head={spec.head} rows={spec.rows} caption={spec.caption} />;
    case 'text': return <TextFigure title={spec.title} source={spec.source} body={spec.body} />;
    case 'formula': return <FormulaFigure lines={spec.lines} caption={spec.caption} />;
    case 'map': return <MapFigure map={spec.map} />;
  }
}

/* ---------- texto / fonte ---------- */

function TextFigure({ title, source, body }: { title?: string; source?: string; body: string }) {
  return (
    <figure className="fig fig--text">
      {title && <div className="fig__title">{title}</div>}
      <div className="fig__body">
        {body.split('\n').map((line, i) =>
          line.trim() === '' ? <div key={i} className="fig__gap" /> : <p key={i}>{line}</p>,
        )}
      </div>
      {source && <figcaption className="fig__source">{source}</figcaption>}
    </figure>
  );
}

/* ---------- tabela ---------- */

function TableFigure({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  return (
    <figure className="fig fig--table">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className={j === 0 ? '' : 'num'}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption className="fig__source">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- fórmula ---------- */

function FormulaFigure({ lines, caption }: { lines: string[]; caption?: string }) {
  return (
    <figure className="fig fig--formula">
      {lines.map((l, i) => <div key={i} className="num">{l}</div>)}
      {caption && <figcaption className="fig__source">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- gráficos ---------- */

function ChartFigure({ chart }: { chart: ChartSpec }) {
  return (
    <figure className="fig fig--chart">
      {chart.title && <div className="fig__title">{chart.title}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={chart.title ?? 'gráfico'}>
        {chart.type === 'bar' && <Bars chart={chart} />}
        {chart.type === 'line' && <Lines chart={chart} />}
        {chart.type === 'scatter' && <Scatter chart={chart} />}
        {chart.type === 'pie' && <Pie chart={chart} />}
      </svg>
      {chart.series.length > 1 && chart.type !== 'pie' && (
        <div className="fig__legend">
          {chart.series.map((s, i) => (
            <span key={s.name} className="fig__key">
              <i style={{ background: `var(--series-${i % 6})` }} />{s.name}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}

function axisBounds(values: number[]) {
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = niceStep(span / 4);
  const top = Math.ceil(max / step) * step;
  const bottom = Math.floor(min / step) * step;
  return { top, bottom, step };
}

function niceStep(raw: number) {
  const mag = 10 ** Math.floor(Math.log10(raw || 1));
  const norm = raw / mag;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return nice * mag;
}

function Grid({ top, bottom, step, yLabel }: { top: number; bottom: number; step: number; yLabel?: string }) {
  const rows: number[] = [];
  for (let v = bottom; v <= top + 0.0001; v += step) rows.push(v);
  const y = (v: number) => PAD.top + ((top - v) / (top - bottom || 1)) * (H - PAD.top - PAD.bottom);

  return (
    <g>
      {rows.map((v) => (
        <g key={v}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} className="chart__grid" />
          <text x={PAD.left - 7} y={y(v) + 3.5} className="chart__tick chart__tick--y">{fmt(v)}</text>
        </g>
      ))}
      {yLabel && <text x={PAD.left - 30} y={PAD.top - 7} className="chart__axis">{yLabel}</text>}
    </g>
  );
}

function Bars({ chart }: { chart: ChartSpec }) {
  const points = chart.series[0]?.points ?? [];
  const { top, bottom, step } = axisBounds(points.map((p) => p.y));
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const bw = (plotW / points.length) * 0.56;
  const y = (v: number) => PAD.top + ((top - v) / (top - bottom || 1)) * plotH;

  return (
    <>
      <Grid top={top} bottom={bottom} step={step} yLabel={chart.yLabel} />
      {points.map((p, i) => {
        const cx = PAD.left + (plotW / points.length) * (i + 0.5);
        const h = Math.max(2, y(bottom) - y(p.y));
        return (
          <g key={i}>
            <rect
              x={cx - bw / 2} y={y(p.y)} width={bw} height={h} rx={3}
              className="chart__bar" style={{ animationDelay: `${i * 45}ms` }}
            />
            <text x={cx} y={y(p.y) - 6} className="chart__value">{fmt(p.y)}</text>
            <text x={cx} y={H - PAD.bottom + 15} className="chart__tick">{String(p.x)}</text>
          </g>
        );
      })}
      <line x1={PAD.left} x2={W - PAD.right} y1={y(bottom)} y2={y(bottom)} className="chart__axisline" />
    </>
  );
}

function Lines({ chart }: { chart: ChartSpec }) {
  const all = chart.series.flatMap((s) => s.points.map((p) => p.y));
  const { top, bottom, step } = axisBounds(all);
  const n = chart.series[0]?.points.length ?? 1;
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (plotW / Math.max(1, n - 1)) * i;
  const y = (v: number) => PAD.top + ((top - v) / (top - bottom || 1)) * plotH;

  return (
    <>
      <Grid top={top} bottom={bottom} step={step} yLabel={chart.yLabel} />
      {chart.series.map((s, si) => (
        <g key={s.name} style={{ color: `var(--series-${si % 6})` }}>
          <polyline
            className="chart__line"
            points={s.points.map((p, i) => `${x(i)},${y(p.y)}`).join(' ')}
          />
          {s.points.map((p, i) => <circle key={i} cx={x(i)} cy={y(p.y)} r={3.2} className="chart__dot" />)}
        </g>
      ))}
      {(chart.categories ?? []).map((c, i) => (
        <text key={c + i} x={x(i)} y={H - PAD.bottom + 15} className="chart__tick">{c}</text>
      ))}
      <line x1={PAD.left} x2={W - PAD.right} y1={y(bottom)} y2={y(bottom)} className="chart__axisline" />
    </>
  );
}

function Scatter({ chart }: { chart: ChartSpec }) {
  const pts = chart.series[0]?.points.map((p) => ({ x: Number(p.x), y: p.y })) ?? [];
  const { top, bottom, step } = axisBounds(pts.map((p) => p.y));
  const xs = pts.map((p) => p.x);
  const xMax = Math.max(...xs, 1);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const X = (v: number) => PAD.left + (v / xMax) * plotW * 0.94 + plotW * 0.03;
  const Y = (v: number) => PAD.top + ((top - v) / (top - bottom || 1)) * plotH;

  return (
    <>
      <Grid top={top} bottom={bottom} step={step} yLabel={chart.yLabel} />
      {pts.map((p, i) => (
        <circle key={i} cx={X(p.x)} cy={Y(p.y)} r={4} className="chart__point" style={{ animationDelay: `${i * 40}ms` }} />
      ))}
      <line x1={PAD.left} x2={W - PAD.right} y1={Y(bottom)} y2={Y(bottom)} className="chart__axisline" />
      {chart.xLabel && <text x={W / 2} y={H - 6} className="chart__axis" textAnchor="middle">{chart.xLabel}</text>}
    </>
  );
}

function Pie({ chart }: { chart: ChartSpec }) {
  const pts = chart.series[0]?.points ?? [];
  const total = pts.reduce((s, p) => s + p.y, 0) || 1;
  const cx = 116;
  const cy = H / 2;
  const R = 78;
  const r = 44;
  let angle = -Math.PI / 2;

  return (
    <>
      {pts.map((p, i) => {
        const a0 = angle;
        const a1 = angle + (p.y / total) * Math.PI * 2;
        angle = a1;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = [
          `M ${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)}`,
          `A ${R} ${R} 0 ${large} 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)}`,
          `L ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`,
          `A ${r} ${r} 0 ${large} 0 ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}`,
          'Z',
        ].join(' ');
        return <path key={i} d={d} className="chart__slice" style={{ fill: `var(--series-${i % 6})`, animationDelay: `${i * 60}ms` }} />;
      })}
      {pts.map((p, i) => (
        <g key={`l${i}`} transform={`translate(${cx + R + 26} ${cy - pts.length * 11 + i * 22})`}>
          <rect x={0} y={-8} width={11} height={11} rx={3} style={{ fill: `var(--series-${i % 6})` }} />
          <text x={18} y={1} className="chart__legend">{String(p.x)} · {fmt((p.y / total) * 100)}%</text>
        </g>
      ))}
    </>
  );
}

/* ---------- mapa ---------- */

export interface MapInteraction {
  selected?: string | null;
  correctId?: string | null;
  locked?: boolean;
  onPick?: (id: string) => void;
}

export function MapFigure({ map, interaction }: { map: MapSpec; interaction?: MapInteraction }) {
  const { selected, correctId, locked, onPick } = interaction ?? {};

  return (
    <figure className="fig fig--map">
      {map.title && <div className="fig__title">{map.title}</div>}
      <svg viewBox="0 0 300 320" className="mapa" role="group" aria-label={map.title ?? 'mapa'}>
        {map.regions.map((rg) => {
          const state =
            correctId && rg.id === correctId ? 'ok'
              : selected === rg.id ? (correctId ? 'err' : 'sel')
                : 'idle';
          return (
            <path
              key={rg.id}
              d={rg.d}
              className={`mapa__rg mapa__rg--${state}`}
              onClick={!locked && onPick ? () => onPick(rg.id) : undefined}
              role={onPick ? 'button' : undefined}
              tabIndex={onPick && !locked ? 0 : undefined}
              aria-label={rg.label}
              onKeyDown={
                !locked && onPick
                  ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(rg.id); } }
                  : undefined
              }
            />
          );
        })}
        {map.regions.map((rg) => (
          <text key={`t-${rg.id}`} x={rg.at[0]} y={rg.at[1]} className="mapa__label">{rg.label}</text>
        ))}
      </svg>
    </figure>
  );
}
