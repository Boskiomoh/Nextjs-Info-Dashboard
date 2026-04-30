import { create } from 'zustand';
import { AuthState } from '@/types';



export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  initialized: false,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
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
      await fetch('/api/auth/logout', { method: 'POST' });
      set({ user: null });
      // Redirect handled by component or middleware
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    // Only check if not already loading and not initialized
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/me');
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
