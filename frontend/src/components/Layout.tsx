import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </div>
    </>
  );
}
