import { Head, Html, Main, NextScript } from 'next/document';
import Navbar from '../components/navbar';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body className="h-full">
        <Navbar user={undefined}></Navbar>
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
