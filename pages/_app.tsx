'use client';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import '@/styles/global.css';
import '@/styles/paginate.css';
import { SWRConfig } from 'swr';
import { request } from '../lib/request';
import Navbar from '@/components/navbar';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
        {showNav && <Navbar></Navbar>}
        <main className="p-2 h-screen overflow-y-auto border-l md:p-6 flex-1">
          <Component {...pageProps} />
        </main>
      </SWRConfig>
      <Toaster />
    </ThemeProvider>
  );
}
