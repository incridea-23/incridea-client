import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-us">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body className='min-h-screen bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
