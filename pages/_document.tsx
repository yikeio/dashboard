'use client';

import { Head, Html, Main, NextScript } from 'next/document';
import Navbar from '../components/navbar';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body className="min-h-screen bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
