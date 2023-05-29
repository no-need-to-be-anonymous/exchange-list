export const LS = {
  FAVORITE_CURRENCIES: 'favoriteCurrencies',
};

export const getFavoriteCurrenciesFromLocalStorage = (): string[] => {
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
