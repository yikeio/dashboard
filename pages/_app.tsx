'use client';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import '@/styles/global.css';
import '@/styles/paginate.css';
import { SWRConfig } from 'swr';
import { request } from '../lib/request';
import Navbar from '@/components/navbar';

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
        <Navbar user={undefined}></Navbar>
        <main className="p-2 h-screen overflow-y-auto border-l md:p-6 flex-1">
          <Component {...pageProps} />
        </main>
      </SWRConfig>
      <Toaster />
    </ThemeProvider>
  );
}
