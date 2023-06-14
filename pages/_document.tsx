'use client';

import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body className="min-h-screen bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
