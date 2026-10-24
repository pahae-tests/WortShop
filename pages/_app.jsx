import '../styles/globals.css';
import Head from 'next/head';
import { ShopProvider } from '../components/shopProvider';
import SiteLayout from '../components/siteLayout';

export default function App({ Component, pageProps }) {
  return (
    <ShopProvider>
      <Head>
        <title>WorstShop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </ShopProvider>
  );
}
