import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {SessionState} from '@/types';

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      secureNote: '',
      tempApiKey: '',
      setSecureNote: (note) => set({ secureNote: note }),
      setTempApiKey: (key) => set({ tempApiKey: key }),
      clearSession: () => set({ 
        secureNote: '',
        tempApiKey: ''
      }),
    }),
    {
      name: 'app-session', // name of the item in the storage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for sensitive/temp data
    }
  )
);
