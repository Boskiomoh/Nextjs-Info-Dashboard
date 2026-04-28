import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SessionState } from '@/types';

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      currentView: 'dashboard',
      lastSearch: '',
      isPrivacyMode: false,
      setCurrentView: (view) => set({ currentView: view }),
      setLastSearch: (query) => set({ lastSearch: query }),
      togglePrivacyMode: () => set((state) => ({ isPrivacyMode: !state.isPrivacyMode })),
      clearSession: () => set({ currentView: 'dashboard', lastSearch: '', isPrivacyMode: false }),
    }),
    {
      name: 'app-session', // name of the item in the storage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for sensitive/temp data
    }
  )
);
