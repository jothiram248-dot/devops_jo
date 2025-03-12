import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      verificationEmail: null,
      setAuth: ({ user, token }) => set({ 
        user: {
          ...user,
          // Keep existing userId if present, otherwise generate a new one
          userId: user.userId || user.accountId,
          accountId: user.userId || user.accountId,
          // Use anime avatar
          avatar: "https://raw.githubusercontent.com/yourusername/yourrepo/main/public/anime-avatar.jpg"
        }, 
        token, 
        isAuthenticated: true 
      }),
      setVerificationEmail: (email) => set({ verificationEmail: email }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, verificationEmail: null }),
      getCurrentUserId: () => {
        const state = useAuthStore.getState();
        return state.user?.userId;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;