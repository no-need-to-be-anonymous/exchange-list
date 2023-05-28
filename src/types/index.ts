export interface Currency {
  shortName: string;
  name: string;
  country: string;
  move: number;
  buy: number;
  sell: number;
  cnb: number;
  isFavorite: boolean;
}

export interface CurrencyAPI {
  shortName: string;
  name: string;
  country: string;
  move: number;
  buy: number;
  sell: number;
  cnb: number;
}
