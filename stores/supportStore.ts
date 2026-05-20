import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {SupportDraft} from '@/types';

export const useSupportStore = create<SupportDraft>()(
  persist(
    (set) => ({
      email: '',
      subject: '',
      message: '',
      setField: (field, value) => set({ [field]: value }),
      clearDraft: () => set({ email: '', subject: '', message: '' }),
    }),
    {
      name: 'support-draft',
      // sessionStorage: draft survives page navigation but not browser close
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
