'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  // useState ensures a stable QueryClient instance per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is fresh for 5 minutes by default before a background refetch
            staleTime: 1000 * 60 * 5,
            // Retry failed requests once before showing an error
            retry: 1,
          },
        },
      })
  );

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Initialize Auth state on first load
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" closeButton />
      {children}
    </QueryClientProvider>
  );
}
