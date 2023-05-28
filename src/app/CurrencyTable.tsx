'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Currency } from '@/types';
import { useMemo } from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { Table } from '../components/Table/Table';

interface TableProps {
  data: Currency[];
  favoriteCurrencyAdd: (currency: string) => void;
}

export const CurrencyTable = ({ data, favoriteCurrencyAdd }: TableProps): JSX.Element => {
  const columns = useMemo<ColumnDef<Currency, any>[]>(
    () => [
      {
        header: 'Měna',
        accessorFn: (row) => `${row.shortName} ${row.name}`,
      },
      {
        header: 'Země',
        accessorKey: 'country',
      },
      {
        header: 'Nákup',
        accessorKey: 'buy',
        accessorFn: (row) => formatNumber(row.buy),
      },
      {
        header: 'Prodej',
        accessorFn: (row) => formatNumber(row.sell),
      },
      {
        header: 'CNB',
        accessorKey: 'cnb',
        accessorFn: (row) => formatNumber(row.cnb),
      },
      {
        header: 'Změna / 1den',
        accessorKey: 'move',
        cell: (currency) => {
          const isNegative = Number(currency.getValue()) < 0;
          const valueColor = isNegative ? 'text-red-500' : 'text-green-500';
          const value = formatNumber(currency.getValue(), { signDisplay: 'always' });
          return <span className={`${valueColor}`}>{value}</span>;
        },
      },
      {
        header: ' ',
        cell: (currency) => {
          if (currency.row.original.isFavorite) return null;
          return (
            <button
              onClick={() => favoriteCurrencyAdd(currency.row.original.shortName)}
              className={'underline text-typography-secondary hover:text-typography-primary'}
            >
              Oblíbená
            </button>
          );
        },
      },
    ],
    [favoriteCurrencyAdd]
  );

  return (
    <div className="bg-container-secondary px-10 py-5">
      <h2 className="text-typography-secondary text-center">Seznam všech kurzů</h2>
      <Table key={1} columns={columns} data={data} />
    </div>
  );
};
