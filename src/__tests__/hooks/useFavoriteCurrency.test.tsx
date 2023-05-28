import { FavoriteCurrencyProvider, useFavoriteCurrency } from '@/context/FavoriteCurrencyContext';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { LS } from '@/constants';
import { act } from 'react-dom/test-utils';

describe('useFavoriteCurrency', () => {
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    window.localStorage.clear();
  });

  it('should initiate favorite currencies state from local storage', () => {
    window.localStorage.setItem(LS.FAVORITE_CURRENCIES, JSON.stringify(['USD']));
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    expect(result.current.favoriteCurrencies).toHaveLength(1);
  });

  it('should add currency to favorites', () => {
    const favoriteCurrency = 'CZK';
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    act(() => {
      result.current.favoriteCurrencyAdd(favoriteCurrency);
    });

    expect(result.current.favoriteCurrencies).toContain(favoriteCurrency);
  });

  it('should not add currency to favorites if it is already there', () => {
    const favoriteCurrency = 'CZK';
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    act(() => {
      result.current.favoriteCurrencyAdd(favoriteCurrency);
      result.current.favoriteCurrencyAdd(favoriteCurrency);
    });

    expect(result.current.favoriteCurrencies).toHaveLength(1);
    expect(result.current.favoriteCurrencies).toContain(favoriteCurrency);
  });

  it('should call localeStorage.setItem when adding currency to favorites', async () => {
    const favoriteCurrency = 'CZK';
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    act(() => {
      result.current.favoriteCurrencyAdd(favoriteCurrency);
    });

    await waitFor(() => {
      // calles twice because of initial render
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy).toHaveBeenCalledWith(LS.FAVORITE_CURRENCIES, JSON.stringify([favoriteCurrency]));
    });
  });

  it('should call localeStorage.setItem when deleting currency from favorites', async () => {
    const favoriteCurrency = 'CZK';
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    act(() => {
      result.current.favoriteCurrencyAdd(favoriteCurrency);
      result.current.favoriteCurrencyDelete(favoriteCurrency);
    });

    await waitFor(() => {
      // calles 3 times because of initial render
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy).toHaveBeenCalledWith(LS.FAVORITE_CURRENCIES, JSON.stringify([]));
    });
  });

  it('should delete currency from favorites', () => {
    const { result } = renderHook(() => useFavoriteCurrency(), {
      wrapper: FavoriteCurrencyProvider,
    });

    act(() => {
      result.current.favoriteCurrencyAdd('CZK');
      result.current.favoriteCurrencyAdd('USD');
      result.current.favoriteCurrencyDelete('USD');
    });

    expect(result.current.favoriteCurrencies).not.toContain('USD');
  });
});
