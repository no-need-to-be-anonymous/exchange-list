import { CurrencyList } from './CurrencyList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-container-main">
      <h1 className="text-typography-primary">Kurzovní lístek</h1>
      <CurrencyList />
    </main>
  );
}
