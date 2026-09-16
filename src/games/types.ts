import type { Item } from '../core/types';

export interface GameProps<T extends Item = Item> {
  item: T;
  /** chamado quando o aluno confirma a resposta — só uma vez por item */
  onCommit: (correct: boolean) => void;
  /** verdadeiro depois de confirmar: a jogada vira leitura do gabarito */
  locked: boolean;
}
