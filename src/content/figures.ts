/* =============================================================
   Figuras esquemáticas desenhadas para a plataforma.
   Nada aqui é ilustração de banco de imagens: são formas simples,
   no mesmo peso de traço do resto da interface. Os mapas são
   esquemas deliberadamente simplificados e estão rotulados como tais.
   ============================================================= */

import type { ChartSpec, MapRegion, MapSpec } from '../core/types';

/* Contorno comum: os dois esquemas partem da mesma silhueta, então as
   regiões e os biomas se sobrepõem exatamente quando o aluno alterna
   entre eles. Coordenadas no viewBox 0 0 300 320. */

/* Os dois esquemas partilham a mesma silhueta e a dividem sem sobreposição:
   cada vértice interno é compartilhado pelas regiões vizinhas, então o mapa
   fecha como um mosaico. Coordenadas no viewBox 0 0 300 320. */

/* Os dois esquemas partilham a mesma silhueta e a dividem sem sobreposição:
   cada vértice interno é compartilhado pelas regiões vizinhas, então o mapa
   fecha como um mosaico, sem buracos e sem lascas. viewBox 0 0 300 320. */

export const REGIOES: MapRegion[] = [
  { id: 'norte', label: 'Norte',
    d: 'M55 75 L150 35 L215 58 L206 120 L192 168 L100 178 L62 170 L35 120 Z', at: [118, 112] },
  { id: 'nordeste', label: 'Nordeste',
    d: 'M215 58 L250 72 L276 122 L262 168 L232 205 L212 196 L192 168 L206 120 Z', at: [234, 126] },
  { id: 'centro-oeste', label: 'Centro-Oeste',
    d: 'M100 178 L192 168 L212 196 L190 240 L158 248 L106 216 Z', at: [148, 206] },
  { id: 'sudeste', label: 'Sudeste',
    d: 'M212 196 L232 205 L212 250 L182 286 L156 268 L158 248 L190 240 Z', at: [198, 240] },
  { id: 'sul', label: 'Sul',
    d: 'M106 216 L158 248 L156 268 L146 312 L104 278 L92 212 Z', at: [130, 276] },
];

export const BIOMAS: MapRegion[] = [
  { id: 'amazonia', label: 'Amazônia',
    d: 'M55 75 L150 35 L215 58 L206 120 L192 168 L100 178 L62 170 L35 120 Z', at: [118, 112] },
  { id: 'caatinga', label: 'Caatinga',
    d: 'M215 58 L250 72 L258 120 L236 162 L212 196 L192 168 L206 120 Z', at: [222, 116] },
  { id: 'mata-atlantica', label: 'Mata Atlântica',
    d: 'M250 72 L276 122 L262 168 L232 205 L212 250 L182 286 L156 268 L158 248 L190 240 L212 196 L236 162 L258 120 Z',
    at: [246, 210] },
  { id: 'cerrado', label: 'Cerrado',
    d: 'M100 178 L192 168 L212 196 L190 240 L158 248 L106 216 Z', at: [152, 206] },
  { id: 'pantanal', label: 'Pantanal',
    d: 'M100 178 L106 216 L92 212 L62 170 Z', at: [72, 192] },
  { id: 'pampa', label: 'Pampa',
    d: 'M106 216 L158 248 L156 268 L146 312 L104 278 L92 212 Z', at: [130, 276] },
];

export const mapaRegioes = (title?: string): MapSpec => ({ title, regions: REGIOES });
export const mapaBiomas = (title?: string): MapSpec => ({ title, regions: BIOMAS });

/* ---------- atalhos de gráfico ---------- */

export const bars = (
  categories: string[], values: number[],
  o: { title?: string; xLabel?: string; yLabel?: string; name?: string } = {},
): ChartSpec => ({
  type: 'bar',
  title: o.title,
  xLabel: o.xLabel,
  yLabel: o.yLabel,
  categories,
  series: [{ name: o.name ?? 'série', points: categories.map((x, i) => ({ x, y: values[i]! })) }],
});

export const lines = (
  categories: string[],
  series: { name: string; values: number[] }[],
  o: { title?: string; xLabel?: string; yLabel?: string } = {},
): ChartSpec => ({
  type: 'line',
  title: o.title,
  xLabel: o.xLabel,
  yLabel: o.yLabel,
  categories,
  series: series.map((s) => ({ name: s.name, points: categories.map((x, i) => ({ x, y: s.values[i]! })) })),
});

export const pie = (slices: { label: string; value: number }[], title?: string): ChartSpec => ({
  type: 'pie',
  title,
  series: [{ name: 'fatias', points: slices.map((s) => ({ x: s.label, y: s.value })) }],
});

export const scatter = (
  points: { x: number; y: number }[],
  o: { title?: string; xLabel?: string; yLabel?: string } = {},
): ChartSpec => ({
  type: 'scatter',
  title: o.title,
  xLabel: o.xLabel,
  yLabel: o.yLabel,
  series: [{ name: 'pontos', points }],
});
