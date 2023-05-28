import { FavoriteCurrencyProvider } from '@/context/FavoriteCurrencyContext';
import { Dashboard } from './Dashboard';

export default function Home() {
  return (
    <FavoriteCurrencyProvider>
      <main className="flex min-h-screen flex-col items-center p-24 bg-container-main">
        <h1 className="text-typography-primary">Kurzovní lístek</h1>
        <Dashboard />
      </main>
    </FavoriteCurrencyProvider>
  );
}
