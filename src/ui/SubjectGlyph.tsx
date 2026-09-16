/* =============================================================
   Glifos das matérias.
   Todos construídos com o mesmo vocabulário (círculo, arco, linha,
   polígono), no mesmo grid de 24 e no mesmo peso de traço do
   conjunto de ícones — é o que faz 12 marcas distintas parecerem
   pertencer à mesma família.
   ============================================================= */

import type { ReactElement } from 'react';
import type { SubjectId } from '../core/types';

const GLYPHS: Record<SubjectId, ReactElement> = {
  // eixo cartesiano com curva ascendente
  matematica: <><path d="M5 19V5" /><path d="M5 19h14" /><path d="M7.5 16.5c3.5 0 4-8 9-8.5" /><circle cx="17" cy="8" r="1.4" /></>,
  // núcleo com órbita inclinada
  fisica: <><circle cx="12" cy="12" r="2.6" /><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-28 12 12)" /></>,
  // hexágono com centro marcado
  quimica: <><path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z" /><circle cx="12" cy="12" r="1.6" /></>,
  // dupla hélice
  biologia: <><path d="M8 3.5c0 6 8 6 8 12" /><path d="M16 3.5c0 6-8 6-8 12" /><path d="M8.6 7.5h6.8" /><path d="M8.6 15h6.8" /><path d="M8 20.5h8" /></>,
  // globo: meridiano e paralelo
  geografia: <><circle cx="12" cy="12" r="8.2" /><ellipse cx="12" cy="12" rx="3.6" ry="8.2" /><path d="M4 12h16" /></>,
  // tempo: círculo com ângulo de ponteiros
  historia: <><circle cx="12" cy="12" r="8.2" /><path d="M12 6.6V12l4.4 2.6" /></>,
  // triângulo inscrito
  filosofia: <><circle cx="12" cy="12" r="8.2" /><path d="M12 6.4 17 16H7z" /></>,
  // rede de três nós
  sociologia: <><circle cx="12" cy="5.6" r="2.1" /><circle cx="5.8" cy="17.2" r="2.1" /><circle cx="18.2" cy="17.2" r="2.1" /><path d="M10.8 7.6 7 15.2" /><path d="M13.2 7.6 17 15.2" /><path d="M8 17.2h8" /></>,
  // bloco de texto
  portugues: <><path d="M5 6h14" /><path d="M5 10.5h14" /><path d="M5 15h10" /><path d="M5 19.5h6" /></>,
  // livro aberto
  literatura: <><path d="M12 6.5v13" /><path d="M12 6.5C10 4.8 7.4 4.4 4 5v13c3.4-.6 6 0 8 1.5" /><path d="M12 6.5c2-1.7 4.6-2.1 8-1.5v13c-3.4-.6-6 0-8 1.5" /></>,
  // balão de fala
  ingles: <><path d="M4.5 6.5h15v10h-8.5L6 20.5v-4H4.5z" /><path d="M8 10.2h8" /><path d="M8 13.2h5" /></>,
  // ponta de caneta sobre linha
  redacao: <><path d="m5 19 2-5.5L16.5 4l3.5 3.5L10.5 17z" /><path d="m14.5 6 3.5 3.5" /><path d="M5 21h14" /></>,
};

interface Props {
  subject: SubjectId;
  size?: number;
  className?: string;
}

export function SubjectGlyph({ subject, size = 24, className }: Props) {
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
      {GLYPHS[subject]}
    </svg>
  );
}
