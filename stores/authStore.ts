import { create } from 'zustand';
import { User } from '@/types';
import { useSessionStore } from './sessionStore';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Auth Store: Managed via HTTP-Only Cookies for Security.
 * This store mirrors the server-side state.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  initialized: false,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data.user, isLoading: false });
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    set({ isLoading: false });
    return false;
  },

  logout: async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      await fetch(`${apiUrl}/auth/logout`, { method: 'POST' });
      
      // Reset Auth State
      set({ user: null });
      
      // Reset Session Storage (Sensitive Data)
      useSessionStore.getState().clearSession();
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${apiUrl}/auth/me`);
      if (response.ok) {
        const data = await response.json();
        set({ user: data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ user: null });
    }
    set({ isLoading: false, initialized: true });
  },
}));
