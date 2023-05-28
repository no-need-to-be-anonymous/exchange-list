'use client';

import React, { useMemo } from 'react';
import { CurrencyTable } from '@/app/CurrencyTable';
import { currencies } from '@/data/currencies';
import { Currency } from '@/types';
import { FavoriteCurrencies } from './FavoriteCurrencies';
import { useFavoriteCurrency } from '@/context/FavoriteCurrencyContext';

export const CurrencyList = (): JSX.Element => {
  const { favoriteCurrencies, favoriteCurrencyAdd, favoriteCurrencyDelete } = useFavoriteCurrency();

  const currenciesList: Currency[] = useMemo(
    () =>
      currencies.map((item) => ({
        ...item,
        isFavorite: favoriteCurrencies.includes(item.shortName),
      })),
    [favoriteCurrencies]
  );

  const favoriteCurrenciesList: Currency[] = currenciesList.filter((item) => item.isFavorite);

  return (
    <div className="w-full flex justify-center flex-col items-center gap-5 px-10 py-5">
      <FavoriteCurrencies favoriteCurrencies={favoriteCurrenciesList} favoriteCurrencyDelete={favoriteCurrencyDelete} />
      <CurrencyTable favoriteCurrencyAdd={favoriteCurrencyAdd} data={currenciesList} />
    </div>
  );
};
