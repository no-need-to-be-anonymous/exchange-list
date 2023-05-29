import { ExchangeList } from '@/app/ExchangeList';
import { render, screen } from '@testing-library/react';

const mockGetSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: () => ({
    get: mockGetSearchParams,
  }),
  useRouter: () => ({
    push: () => {},
  }),
}));

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
        addFavoriteCurrency={jest.fn}
      />
    );

    const tableBodyRows = screen.getAllByTestId('body-row');

    expect(tableBodyRows).toHaveLength(1);
  });

  it('should call addFavoriteCurrency when favorite button is clicked', () => {
    const addFavoriteCurrency = jest.fn();
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
        addFavoriteCurrency={addFavoriteCurrency}
      />
    );
    const favoriteButton = screen.getByRole('button', { name: 'Oblíbená' });

    favoriteButton.click();

    expect(addFavoriteCurrency).toHaveBeenCalledTimes(1);
  });

  it('should not display favorite button when currency is favorite', () => {
    const addFavoriteCurrency = jest.fn();
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
        addFavoriteCurrency={addFavoriteCurrency}
      />
    );

    expect(screen.queryByRole('button', { name: 'Oblíbená' })).not.toBeInTheDocument();
  });

  it('should render view based on url', () => {
    mockGetSearchParams.mockReturnValueOnce('1');
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
        addFavoriteCurrency={jest.fn}
      />
    );
    const activeTab = screen.getByRole('tab', { name: '+ 1 den' });

    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should render default view if view param is not in url', () => {
    mockGetSearchParams.mockReturnValueOnce('4');
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
        addFavoriteCurrency={jest.fn}
      />
    );
    const activeTab = screen.getByRole('tab', { name: 'Aktualni' });

    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });
});
