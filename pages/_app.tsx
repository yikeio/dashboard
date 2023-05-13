import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import './global.css';
import { SWRConfig } from 'swr';
import { request } from '../lib/request';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            request(resource, init).then((res) => res.result)
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
      <Toaster />
    </ThemeProvider>
  );
}
