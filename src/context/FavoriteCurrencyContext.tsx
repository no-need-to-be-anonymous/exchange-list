'use client';

import { LS } from '@/constants';
import { getFavoriteCurrenciesFromLocalStorage } from '@/utils/localStorage';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface IFavoriteCurrencyContext {
  favoriteCurrencies: string[];
  addFavoriteCurrency: (currencyCode: string) => void;
  deleteFavoriteCurrency: (currencyCode: string) => void;
}

export const FavoriteCurrencyContext = createContext<IFavoriteCurrencyContext>({
  favoriteCurrencies: [],
  addFavoriteCurrency: () => {},
  deleteFavoriteCurrency: () => {},
});

export const FavoriteCurrencyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoriteCurrencies, setFavoriteCurrencies] = useState<string[]>(getFavoriteCurrenciesFromLocalStorage());

  const deleteFavoriteCurrency = (currencyCode: string) => {
    setFavoriteCurrencies([...favoriteCurrencies.filter((item) => item !== currencyCode)]);
  };

  const addFavoriteCurrency = (currencyCode: string) => {
    if (favoriteCurrencies.includes(currencyCode)) return;
    setFavoriteCurrencies([...favoriteCurrencies, currencyCode]);
  };

  useEffect(() => {
    window.localStorage.setItem(LS.FAVORITE_CURRENCIES, JSON.stringify(favoriteCurrencies));
  }, [favoriteCurrencies]);

  return (
    <FavoriteCurrencyContext.Provider
      value={{
        favoriteCurrencies,
        addFavoriteCurrency,
        deleteFavoriteCurrency,
      }}
    >
      {children}
    </FavoriteCurrencyContext.Provider>
  );
};

export const useFavoriteCurrency = (): IFavoriteCurrencyContext => useContext(FavoriteCurrencyContext);
