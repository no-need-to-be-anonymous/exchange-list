'use client';

import { LS } from '@/constants';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface IFavoriteCurrencyContext {
  favoriteCurrencies: string[];
  favoriteCurrencyAdd: (currencyCode: string) => void;
  favoriteCurrencyDelete: (currencyCode: string) => void;
}

export const FavoriteCurrencyContext = createContext<IFavoriteCurrencyContext>({
  favoriteCurrencies: [],
  favoriteCurrencyAdd: () => {},
  favoriteCurrencyDelete: () => {},
});

const getFavoriteCurrenciesFromLocalStorage = (): string[] => {
  try {
    const favoriteCurrenciesFromLocalStorage = window.localStorage.getItem(LS.FAVORITE_CURRENCIES);
    if (favoriteCurrenciesFromLocalStorage) {
      return JSON.parse(favoriteCurrenciesFromLocalStorage);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const FavoriteCurrencyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoriteCurrencies, setFavoriteCurrencies] = useState<string[]>(getFavoriteCurrenciesFromLocalStorage());

  const favoriteCurrencyDelete = (currencyCode: string) => {
    setFavoriteCurrencies([...favoriteCurrencies.filter((item) => item !== currencyCode)]);
  };

  const favoriteCurrencyAdd = (currencyCode: string) => {
    if (favoriteCurrencies.includes(currencyCode)) return;
    setFavoriteCurrencies([...favoriteCurrencies, currencyCode]);
  };

  // save to locale storage on currency add or delete
  useEffect(() => {
    window.localStorage.setItem(LS.FAVORITE_CURRENCIES, JSON.stringify(favoriteCurrencies));
  }, [favoriteCurrencies]);

  // useEffect(() => {
  //   const favoriteCurrenciesFromLocalStorage = window.localStorage.getItem('favoriteCurrencies');
  //   if (favoriteCurrenciesFromLocalStorage) {
  //     setFavoriteCurrencies(JSON.parse(favoriteCurrenciesFromLocalStorage));
  //   }
  // }, []);

  return (
    <FavoriteCurrencyContext.Provider
      value={{
        favoriteCurrencies,
        favoriteCurrencyAdd,
        favoriteCurrencyDelete,
      }}
    >
      {children}
    </FavoriteCurrencyContext.Provider>
  );
};

export const useFavoriteCurrency = (): IFavoriteCurrencyContext => useContext(FavoriteCurrencyContext);
