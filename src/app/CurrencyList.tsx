import React from 'react';
import { CurrencyTable } from '@/components/Table/Table';
import { currencies } from '@/data/currencies';

export const CurrencyList = (): JSX.Element => {
  return (
    <div className="bg-container-secondary w-full flex justify-center flex-col items-center gap-5 px-10 py-5">
      <h2 className="text-typography-secondary">Seznam všech kurzů</h2>
      <CurrencyTable data={currencies} />
    </div>
  );
};
