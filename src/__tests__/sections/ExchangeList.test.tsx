import { ExchangeList } from '@/app/ExchangeList';
import { render, screen } from '@testing-library/react';

describe('ExchangeList', () => {
  it('should render data rows', () => {
    render(
      <ExchangeList
        data={[
          {
            shortName: 'AUD',
            name: 'Dolar',
            country: 'Austrálie',
            move: -0.3,
            buy: 15.338,
            sell: 16.125,
            cnb: 15.776,
            isFavorite: false,
          },
        ]}
        favoriteCurrencyAdd={() => {}}
      />
    );

    const tableBodyRows = screen.getAllByTestId('body-row');

    expect(tableBodyRows).toHaveLength(1);
  });

  it('should call favoriteCurrencyAdd when favorite button is clicked', () => {
    const favoriteCurrencyAdd = jest.fn();
    render(
      <ExchangeList
        data={[
          {
            shortName: 'AUD',
            name: 'Dolar',
            country: 'Austrálie',
            move: -0.3,
            buy: 15.338,
            sell: 16.125,
            cnb: 15.776,
            isFavorite: false,
          },
        ]}
        favoriteCurrencyAdd={favoriteCurrencyAdd}
      />
    );
    const favoriteButton = screen.getByRole('button', { name: 'Oblíbená' });

    favoriteButton.click();

    expect(favoriteCurrencyAdd).toHaveBeenCalledTimes(1);
  });

  it('should not display favorite button when currency is favorite', () => {
    const favoriteCurrencyAdd = jest.fn();
    render(
      <ExchangeList
        data={[
          {
            shortName: 'AUD',
            name: 'Dolar',
            country: 'Austrálie',
            move: -0.3,
            buy: 15.338,
            sell: 16.125,
            cnb: 15.776,
            isFavorite: true,
          },
        ]}
        favoriteCurrencyAdd={favoriteCurrencyAdd}
      />
    );

    expect(screen.queryByRole('button', { name: 'Oblíbená' })).not.toBeInTheDocument();
  });
});
