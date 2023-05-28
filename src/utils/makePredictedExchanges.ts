import { Currency } from '@/types';

export const makePredictedExchanges = (data: Currency[], days: number): Currency[] =>
  data.map((item) => {
    const move = item.move * days;
    const nomanialChange = (item.cnb / 100) * move;
    const cnb = item.cnb + nomanialChange;
    return {
      ...item,
      move,
      cnb,
    };
  });
