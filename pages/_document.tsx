import { Head, Html, Main, NextScript } from 'next/document';
import Navbar from '../components/navbar';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body className="min-h-screen bg-gray-50 flex">
        <Navbar user={undefined}></Navbar>
        <main className="p-4 h-screen overflow-y-auto border-l md:p-10 flex-1">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
