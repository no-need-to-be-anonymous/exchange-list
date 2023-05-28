import { Currency } from '@/types';
import { makePredictedExchanges } from '@/utils/makePredictedExchanges';

const mockData: Currency[] = [
  {
    shortName: 'AUD',
    name: 'Dolar',
    country: 'Austrálie',
    move: 0.1,
    buy: 15.338,
    sell: 16.125,
    cnb: 16.0,
    isFavorite: false,
  },
];

describe('makePredictionExchanges', () => {
  it('should calculate prediction correctly for selected period', () => {
    const result = makePredictedExchanges(mockData, 2);
    expect(result).toEqual([
      {
        shortName: 'AUD',
        name: 'Dolar',
        country: 'Austrálie',
        move: 0.2,
        buy: 15.338,
        sell: 16.125,
        cnb: 16.032,
        isFavorite: false,
      },
    ]);
  });
});
