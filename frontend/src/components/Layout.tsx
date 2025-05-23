import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className=''>
        {children}
      </div>
    </>
  );
}
