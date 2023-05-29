'use client';

import React, { useMemo } from 'react';
import { ExchangeList } from '@/app/ExchangeList';
import { currencies } from '@/data/currencies';
import { Currency } from '@/types';
import { FavoriteCurrencies } from './FavoriteCurrencies';
import { useFavoriteCurrency } from '@/context/FavoriteCurrencyContext';

export const Dashboard = (): JSX.Element => {
  const { favoriteCurrencies, addFavoriteCurrency, deleteFavoriteCurrency } = useFavoriteCurrency();

  const currenciesList = useMemo<Currency[]>(
    () =>
      currencies.map((item) => ({
        ...item,
        isFavorite: favoriteCurrencies.includes(item.shortName),
      })),
    [favoriteCurrencies]
  );

  const favoriteCurrenciesList: Currency[] = useMemo(() => currenciesList.filter((item) => item.isFavorite), [currenciesList]);

  return (
    <div className="w-full flex justify-center flex-col items-center gap-5 px-10 py-5">
      <FavoriteCurrencies favoriteCurrencies={favoriteCurrenciesList} deleteFavoriteCurrency={deleteFavoriteCurrency} />
      <ExchangeList addFavoriteCurrency={addFavoriteCurrency} data={currenciesList} />
    </div>
  );
};
