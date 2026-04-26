'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Initialize Auth state on first load
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      {children}
    </>
  );
}
