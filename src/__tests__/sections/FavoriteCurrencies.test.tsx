import { FavoriteCurrencies } from '@/app/FavoriteCurrencies';
import { render, screen } from '@testing-library/react';

describe('ExchangeList', () => {
  it('should render data', () => {
    render(
      <FavoriteCurrencies
        favoriteCurrencies={[
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
        deleteFavoriteCurrency={() => {}}
      />
    );

    const tableBodyRows = screen.getAllByTestId('body-row');

    expect(tableBodyRows).toHaveLength(1);
  });

  it('should call favoriteCurrencyAdd when favorite button is clicked', () => {
    const deleteFavoriteCurrency = jest.fn();
    render(
      <FavoriteCurrencies
        favoriteCurrencies={[
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
        deleteFavoriteCurrency={deleteFavoriteCurrency}
      />
    );
    const deleteButton = screen.getByRole('button', { name: 'Zrušit' });

    deleteButton.click();

    expect(deleteFavoriteCurrency).toHaveBeenCalledTimes(1);
  });

  it('should show info text when there are not favorite currencies', () => {
    render(<FavoriteCurrencies favoriteCurrencies={[]} deleteFavoriteCurrency={jest.fn} />);

    expect(screen.getByText('Nemáte žádné oblíbené měny')).toBeInTheDocument();
  });
});
