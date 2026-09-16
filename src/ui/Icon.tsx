/* =============================================================
   Conjunto de ícones próprio: grid de 24, traço 1.7, cantos vivos.
   Nenhum emoji, nenhuma biblioteca — é o que mantém a interface
   com uma só voz gráfica.
   ============================================================= */

import type { ReactElement } from 'react';

export type IconName =
  | 'home' | 'play' | 'check' | 'close' | 'arrowRight' | 'arrowLeft'
  | 'chevronRight' | 'refresh' | 'target' | 'streak' | 'bolt' | 'clock'
  | 'chart' | 'grid' | 'prism' | 'skip' | 'pause' | 'trash' | 'shuffle'
  | 'layers' | 'lock' | 'sparkle' | 'plus' | 'minus';

const PATHS: Record<IconName, ReactElement> = {
  home: <><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5" /></>,
  play: <path d="M8 5.5 18.5 12 8 18.5z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  arrowRight: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M20 12H5" /><path d="m11 6-6 6 6 6" /></>,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  refresh: <><path d="M20 6v5h-5" /><path d="M19.4 11A8 8 0 1 0 18 16.5" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.2" /></>,
  streak: <><path d="M12 3.5 7 10h3.2L8.5 20.5 17 12h-3.6z" /></>,
  bolt: <path d="M13.5 3 6 13h5l-.5 8L18 11h-5z" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 20v-6" /><path d="M12 20V6" /><path d="M17 20v-9" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  prism: <><path d="M12 3.2 21 19H3z" /><path d="M12 3.2V19" /></>,
  skip: <><path d="M6 5.5 14 12l-8 6.5z" /><path d="M18 5.5v13" /></>,
  pause: <><path d="M9 5v14" /><path d="M15 5v14" /></>,
  trash: <><path d="M4.5 7h15" /><path d="M9.5 7V4.5h5V7" /><path d="M6.5 7v12.5h11V7" /></>,
  shuffle: <><path d="M4 7h4l8 10h4" /><path d="M4 17h4l2-2.5" /><path d="m14 9.5 2-2.5h4" /><path d="m17.5 4 3 3-3 3" /><path d="m17.5 14 3 3-3 3" /></>,
  layers: <><path d="m12 3.5 8.5 4.5L12 12.5 3.5 8z" /><path d="m3.5 13 8.5 4.5L20.5 13" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>,
  sparkle: <><path d="M12 4v5" /><path d="M12 15v5" /><path d="M4 12h5" /><path d="M15 12h5" /><path d="m6.8 6.8 3 3" /><path d="m14.2 14.2 3 3" /><path d="m17.2 6.8-3 3" /><path d="m9.8 14.2-3 3" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
};

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
