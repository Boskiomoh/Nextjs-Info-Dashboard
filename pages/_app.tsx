import type { AppProps } from 'next/app';
import '../styles/globals.css';

/**
 * LAYMAN EXPLANATION:
 * The _app.tsx file is the "Manager" of your entire application.
 * Every time you navigate to a new page, Next.js uses this component to "wrap" that page.
 * It's the perfect place to import global CSS so it's available everywhere.
 * The 'Component' prop is the actual page you are visiting (like index.tsx or about.tsx).
 */
import { AuthProvider } from '@/contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
