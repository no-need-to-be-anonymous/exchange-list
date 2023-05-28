'use client';

import { Table } from '@/components/Table/Table';
import { Currency } from '@/types';
import { formatNumber } from '@/utils/formatNumber';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

interface FavoriteCurrenciesProps {
  favoriteCurrencies: Currency[];
  favoriteCurrencyDelete: (currency: string) => void;
}

export const FavoriteCurrencies = ({ favoriteCurrencies, favoriteCurrencyDelete }: FavoriteCurrenciesProps): JSX.Element => {
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
          return (
            <button
              onClick={() => favoriteCurrencyDelete(currency.row.original.shortName)}
              className={'underline text-typography-secondary hover:text-typography-primary'}
            >
              Zrušit
            </button>
          );
        },
      },
    ],
    [favoriteCurrencyDelete]
  );

  return (
    <>
      <h2 className="text-typography-secondary">Vaše oblíbené</h2>
      {favoriteCurrencies.length === 0 ? (
        <div className="text-typography-secondary font-medium">Nemáte žádné oblíbené měny</div>
      ) : (
        <Table columns={columns} data={favoriteCurrencies} />
      )}
    </>
  );
};
