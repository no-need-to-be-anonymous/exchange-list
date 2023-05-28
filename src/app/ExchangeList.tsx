'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Currency } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { Table } from '../components/Table/Table';
import { Tabs, TabsProps } from 'antd';
import { makePredictedExchanges } from '@/utils/makePredictedExchanges';
import { commonColumns } from '@/helpers/commonTableColumns';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseViewFromUrl } from '@/utils/parseViewFromUrl';

interface TableProps {
  data: Currency[];
  favoriteCurrencyAdd: (currency: string) => void;
}

const tabItems: TabsProps['items'] = [
  {
    label: 'Aktualni',
    key: '0',
  },
  {
    label: '+ 1 den',
    key: '1',
  },
  {
    label: '+ 2 dny',
    key: '2',
  },
  {
    label: '+ 3 dny',
    key: '3',
  },
];

export const ExchangeList = ({ data, favoriteCurrencyAdd }: TableProps): JSX.Element => {
  const params = useSearchParams();
  const [activeView, setActiveView] = useState(parseViewFromUrl(params.get('view'), tabItems));
  const [exchangeList, setExchangeList] = useState<Currency[]>(data);
  const router = useRouter();

  const handleTabChange = (activeKey: string): void => {
    router.push(`/?view=${activeKey}`);
    setActiveView(activeKey);
  };

  const columns = useMemo<ColumnDef<Currency, string>[]>(
    () => [
      ...commonColumns,
      {
        header: () => {
          if (activeView === '0' || activeView === '1') return 'Změna / 1 den';
          return `Změna / ${activeView} dny`;
        },
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
    [favoriteCurrencyAdd, activeView]
  );

  useEffect(() => {
    if (activeView === '0') {
      setExchangeList(data);
      return;
    }

    setExchangeList(makePredictedExchanges(data, Number(activeView)));
  }, [activeView, data]);

  return (
    <div className="bg-container-secondary px-10 py-5">
      <h2 className="text-typography-secondary text-center">Seznam všech kurzů</h2>
      <Tabs centered activeKey={activeView} onChange={handleTabChange} type="card" items={tabItems} />
      <Table key={1} columns={columns} data={exchangeList} />
    </div>
  );
};
