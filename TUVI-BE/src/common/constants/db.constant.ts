import { OrderingType } from '../types/index.type';

export const DBFunction = {
  CURRENT_TIMESTAMP: 'CURRENT_TIMESTAMP',
};

export const DBColumnType = {
  TIMESTAMP: 'timestamp',
};

export const Ordering: Record<OrderingType, OrderingType> = {
  ASC: 'ASC',
  DESC: 'DESC',
};
