'use client';

/**
 * This is a helper component to allow using styled-jsx 
 * inside Server Components.
 */
export default function ClientStyles({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
