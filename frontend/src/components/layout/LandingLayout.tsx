import { Header } from '../landing/Header';

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className=''>{children}</div>
    </>
  );
}
