'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Currency } from '@/types';
import { useMemo } from 'react';
import { formatNumber } from '@/utils/formatNumber';

interface TableProps {
  data: Currency[];
}

export const CurrencyTable = ({ data }: TableProps): JSX.Element => {
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
        cell: () => {
          return <button className={'underline text-typography-secondary hover:text-typography-primary'}>Oblíbená</button>;
        },
      },
    ],
    []
  );

  const { getHeaderGroups, getRowModel } = useReactTable<Currency>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rowClass = `grid grid-cols-7 grid-rows-${columns.length} items-center py-3 w-full gap-4 px-4`;

  return (
    <div>
      {getHeaderGroups().map((headerGroup, index) => {
        return (
          <div className={`${rowClass}`} key={index}>
            {headerGroup.headers.map((header, index) => {
              return (
                <div key={index} className={'text-typography-primary font-medium'}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="flex flex-col gap-2">
        {getRowModel().rows.map((row, index) => {
          return (
            <div key={index} className={`${rowClass} border-1 border-typography-secondary bg-container-tertiary`}>
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <div key={index} className={'text-typography-secondary'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
