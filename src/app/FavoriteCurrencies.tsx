'use client';

import { Table } from '@/components/Table/Table';
import { commonColumns } from '@/helpers/commonTableColumns';
import { Currency } from '@/types';
import { formatNumber } from '@/utils/formatNumber';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

interface FavoriteCurrenciesProps {
  favoriteCurrencies: Currency[];
  favoriteCurrencyDelete: (currency: string) => void;
}

export const FavoriteCurrencies = ({ favoriteCurrencies, favoriteCurrencyDelete }: FavoriteCurrenciesProps): JSX.Element => {
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
        <Table key={2} columns={columns} data={favoriteCurrencies} />
      )}
    </>
  );
};
