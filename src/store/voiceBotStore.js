import { create } from 'zustand';

const useVoiceBotStore = create((set) => ({
  customContent: '',
  setCustomContent: (content) => set({ customContent: content }),
  clearCustomContent: () => set({ customContent: '' }),
}));

export default useVoiceBotStore;