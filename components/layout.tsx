'use client';

import './globals.css';

import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { request } from '../lib/request';
import Navbar from './navbar';

const metadata = {
  title: '一刻 Admin',
  description: ''
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          request(resource, init).then((res) => res.json())
      }}
    >
      <html lang="en" className="h-full bg-gray-50">
        <head>
          <meta charSet="utf-8" />
          <meta name="robots" content="noindex" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={metadata.description} />
          <title>{metadata.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="h-full">
          <Suspense fallback="...">
            <Navbar user={undefined} />
          </Suspense>
          {children}
        </body>
      </html>
    </SWRConfig>
  );
}
