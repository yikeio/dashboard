'use client';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import Head from '@/components/head';
import Navbar from '@/components/navbar';
import '@/styles/global.css';
import '@/styles/paginate.css';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import Request from '../lib/request';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith('/auth/');

  useEffect(() => {
    if (
      !window.location.pathname.startsWith('/auth/') &&
      Cookies.get('dashboard.auth.token') === undefined
    ) {
      window.location.href = '/auth/login';
    }
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig
        value={{
          refreshInterval: 50000,
          fetcher: (resource, init) =>
            Request.get(resource, init).then((res) => res.result)
        }}
      >
        <Head />
        {showNav && <Navbar></Navbar>}
        <main className="p-2 h-screen overflow-y-auto border-l md:p-6 flex-1">
          <Component {...pageProps} />
        </main>
      </SWRConfig>
      <Toaster />
    </ThemeProvider>
  );
}
