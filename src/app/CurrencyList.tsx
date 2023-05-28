'use client';

import React from 'react';
import { CurrencyTable } from '@/app/CurrencyTable';
import { currencies } from '@/data/currencies';
import { Currency } from '@/types';
import { FavoriteCurrencies } from './FavoriteCurrencies';

export const CurrencyList = (): JSX.Element => {
  const [favoriteCurrencies, setFavoriteCurrencies] = React.useState<string[]>([]);

  const favoriteCurrencyDelete = (currencyCode: string) => {
    setFavoriteCurrencies([...favoriteCurrencies.filter((item) => item !== currencyCode)]);
  };

  const favoriteCurrencyAdd = (currencyCode: string) => {
    if (favoriteCurrencies.includes(currencyCode)) return;
    setFavoriteCurrencies([...favoriteCurrencies, currencyCode]);
  };

  const currenciesList: Currency[] = currencies.map((item) => ({
    ...item,
    isFavorite: favoriteCurrencies.includes(item.shortName),
  }));

  const favoriteCurrenciesList: Currency[] = currenciesList.filter((item) => item.isFavorite);

  return (
    <div className="w-full flex justify-center flex-col items-center gap-5 px-10 py-5">
      <FavoriteCurrencies favoriteCurrencies={favoriteCurrenciesList} favoriteCurrencyDelete={favoriteCurrencyDelete} />
      <CurrencyTable favoriteCurrencyAdd={favoriteCurrencyAdd} data={currenciesList} />
    </div>
  );
};
