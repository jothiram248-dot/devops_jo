import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './authStore';

const useCredentialStore = create(
  persist(
    (set, get) => ({
      // Store credentials by userId
      userCredentials: {},
      verifiedCredentials: new Set(),
      
      addCredential: (type, credential) => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return;

        set((state) => {
          const userCreds = state.userCredentials[userId] || {};
          const typeCreds = userCreds[type] || [];
          
          return {
            userCredentials: {
              ...state.userCredentials,
              [userId]: {
                ...userCreds,
                [type]: [...typeCreds, {
                  ...credential,
                  id: `cred_${Math.random().toString(36).substr(2, 9)}`,
                  isVerified: false,
                  verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
                  createdAt: new Date().toISOString()
                }]
              }
            }
          };
        });
      },

      updateCredential: (type, id, updatedData) => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return;

        set((state) => {
          const userCreds = state.userCredentials[userId] || {};
          const typeCreds = userCreds[type] || [];
          
          return {
            userCredentials: {
              ...state.userCredentials,
              [userId]: {
                ...userCreds,
                [type]: typeCreds.map(cred =>
                  cred.id === id ? { ...cred, ...updatedData } : cred
                )
              }
            }
          };
        });
      },

      deleteCredential: (type, id) => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return;

        set((state) => {
          const userCreds = state.userCredentials[userId] || {};
          const typeCreds = userCreds[type] || [];
          
          return {
            userCredentials: {
              ...state.userCredentials,
              [userId]: {
                ...userCreds,
                [type]: typeCreds.filter(cred => cred.id !== id)
              }
            }
          };
        });
      },

      verifyCredential: (type, id, code) => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return false;

        const userCreds = get().userCredentials[userId] || {};
        const typeCreds = userCreds[type] || [];
        const credential = typeCreds.find(cred => cred.id === id);

        if (credential && credential.verificationCode === code) {
          set((state) => ({
            verifiedCredentials: new Set([...state.verifiedCredentials, id])
          }));
          return true;
        }
        return false;
      },

      isCredentialVerified: (id) => {
        return get().verifiedCredentials.has(id);
      },

      getCredentials: (type) => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return [];

        const userCreds = get().userCredentials[userId] || {};
        const credentials = userCreds[type] || [];
        
        return credentials.map(cred => ({
          ...cred,
          displayData: get().verifiedCredentials.has(cred.id) ? cred : {
            id: cred.id,
            title: cred.title,
            type: cred.type,
            createdAt: cred.createdAt,
            isVerified: false
          }
        }));
      },

      clearUserCredentials: () => {
        const userId = useAuthStore.getState().user?.userId;
        if (!userId) return;

        set((state) => {
          const { [userId]: _, ...restCredentials } = state.userCredentials;
          return {
            userCredentials: restCredentials,
            verifiedCredentials: new Set()
          };
        });
      }
    }),
    {
      name: 'credential-storage',
      partialize: (state) => ({
        userCredentials: state.userCredentials,
        verifiedCredentials: Array.from(state.verifiedCredentials)
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.verifiedCredentials = new Set(state.verifiedCredentials);
        }
      }
    }
  )
);

export default useCredentialStore;