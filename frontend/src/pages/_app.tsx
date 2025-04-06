import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Property Management - Admin Dashboard</title>
        <meta
          name='description'
          content='Property Management System - All info in one place'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='icon' href='/favicon.ico' />
        <meta httpEquiv='Content-Language' content='en' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <main className='m-auto'>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
