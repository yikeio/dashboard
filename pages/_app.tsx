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
import { request } from '../lib/request';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith('/auth/');

  useEffect(() => {
    if (
      !window.location.pathname.startsWith('/auth/') &&
      Cookies.get('auth.token') === undefined
    ) {
      window.location.href = '/auth/login';
    }
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SWRConfig
        value={{
          refreshInterval: 5000,
          fetcher: (resource, init) =>
            request(resource, init).then((res) => res.result)
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
