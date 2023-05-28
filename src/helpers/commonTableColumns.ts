import { Currency } from '@/types';
import { formatNumber } from '@/utils/formatNumber';
import { ColumnDef } from '@tanstack/react-table';

export const commonColumns: ColumnDef<Currency, string>[] = [
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
];
