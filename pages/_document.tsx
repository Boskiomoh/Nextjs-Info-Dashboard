import { Html, Head, Main, NextScript } from 'next/document';

/**
 * LAYMAN EXPLANATION:
 * While _app.tsx handles the "Body" of your app, _document.tsx handles 
 * the actual HTML tags (<html>, <head>, <body>). 
 * You only use this to change things that are outside the React tree, 
 * like adding a language attribute to the <html> tag.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
