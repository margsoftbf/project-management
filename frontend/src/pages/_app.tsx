import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <>
        <Head>
          <title>Property Management System - All info in one place</title>
          <meta
            name='description'
            content='Property Management System - All info in one place'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='icon' href='/favicon.ico' />
          <meta httpEquiv='Content-Language' content='en' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <main className='m-auto'>
          <ToastContainer />
          <Component {...pageProps} />
        </main>
      </>
    </SessionProvider>
  );
}

export default MyApp;
