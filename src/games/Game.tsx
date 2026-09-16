import type { Item } from '../core/types';
import type { GameProps } from './types';
import { McqGame } from './McqGame';
import { NumericGame } from './NumericGame';
import { OrderGame } from './OrderGame';
import { PairGame } from './PairGame';
import { ClassifyGame } from './ClassifyGame';
import { BalanceGame } from './BalanceGame';

/** Despacha o item para o minijogo correspondente ao seu formato. */
export function Game({ item, onCommit, locked }: GameProps<Item>) {
  switch (item.kind) {
    case 'mcq': return <McqGame item={item} onCommit={onCommit} locked={locked} />;
    case 'numeric': return <NumericGame item={item} onCommit={onCommit} locked={locked} />;
    case 'order': return <OrderGame item={item} onCommit={onCommit} locked={locked} />;
    case 'pair': return <PairGame item={item} onCommit={onCommit} locked={locked} />;
    case 'classify': return <ClassifyGame item={item} onCommit={onCommit} locked={locked} />;
    case 'balance': return <BalanceGame item={item} onCommit={onCommit} locked={locked} />;
  }
}

export const GAME_LABEL: Record<Item['kind'], string> = {
  mcq: 'Decisão',
  numeric: 'Relâmpago',
  order: 'Sequência',
  pair: 'Conexão',
  classify: 'Triagem',
  balance: 'Equilíbrio',
};
