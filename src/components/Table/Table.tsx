'use client';

import { Currency } from '@/types';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

interface TableProps {
  data: Currency[];
  columns: ColumnDef<Currency, string>[];
}

export const Table = ({ columns, data }: TableProps): JSX.Element => {
  const { getHeaderGroups, getRowModel } = useReactTable<Currency>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rowClass = `grid grid-cols-7 items-center py-3 w-full gap-4 px-4`;

  return (
    <div>
      {getHeaderGroups().map((headerGroup) => {
        return (
          <div className={`${rowClass}`} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <div key={header.id} className={'text-typography-primary font-medium'}>
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
            <div
              data-testid="body-row"
              key={row.id + index}
              className={`${rowClass} border-1 border-typography-secondary bg-container-tertiary`}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <div key={cell.row.id + index} className={'text-typography-secondary'}>
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
