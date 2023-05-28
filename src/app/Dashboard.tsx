'use client';

import React, { useMemo } from 'react';
import { ExchangeList } from '@/app/ExchangeList';
import { currencies } from '@/data/currencies';
import { Currency } from '@/types';
import { FavoriteCurrencies } from './FavoriteCurrencies';
import { useFavoriteCurrency } from '@/context/FavoriteCurrencyContext';

export const Dashboard = (): JSX.Element => {
  const { favoriteCurrencies, favoriteCurrencyAdd, favoriteCurrencyDelete } = useFavoriteCurrency();

  const currenciesList = useMemo<Currency[]>(
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
      <ExchangeList favoriteCurrencyAdd={favoriteCurrencyAdd} data={currenciesList} />
    </div>
  );
};
