import { Currency, CurrencyAPI } from '@/types';

export const transformCurrencies = (currencies: CurrencyAPI[]): Currency[] =>
  currencies.map((currency) => ({
    ...currency,
    isFavorite: false,
  }));
