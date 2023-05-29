'use client';

import { Table } from '@/components/Table/Table';
import { commonColumns } from '@/helpers/commonTableColumns';
import { Currency } from '@/types';
import { formatNumber } from '@/utils/formatNumber';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

interface FavoriteCurrenciesProps {
  favoriteCurrencies: Currency[];
  deleteFavoriteCurrency: (currency: string) => void;
}

export const FavoriteCurrencies = ({ favoriteCurrencies, deleteFavoriteCurrency }: FavoriteCurrenciesProps): JSX.Element => {
  const columns = useMemo<ColumnDef<Currency, string>[]>(
    () => [
      ...commonColumns,
      {
        header: 'Změna / 1den',
        accessorKey: 'move',
        cell: (currency) => {
          const isNegative = Number(currency.getValue()) < 0;
          const valueColor = isNegative ? 'text-red-500' : 'text-green-500';
          const value = formatNumber(Number(currency.getValue()), { signDisplay: 'always' });
          return <span className={`${valueColor}`}>{value}</span>;
        },
      },
      {
        header: ' ',
        cell: (currency) => {
          return (
            <button
              onClick={() => deleteFavoriteCurrency(currency.row.original.shortName)}
              className={'underline text-typography-secondary hover:text-typography-primary'}
            >
              Zrušit
            </button>
          );
        },
      },
    ],
    [deleteFavoriteCurrency]
  );

  return (
    <div className="px-10">
      <h2 className="text-typography-secondary text-center">Vaše oblíbené</h2>
      {favoriteCurrencies.length === 0 ? (
        <p className="text-typography-secondary font-medium">Nemáte žádné oblíbené měny</p>
      ) : (
        <Table key={2} columns={columns} data={favoriteCurrencies} />
      )}
    </div>
  );
};
