import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCredentials } from '@/lib/storage';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: true,
      login: (username: string, password: string) => {
        const credentials = getCredentials();
        const isValid = username === credentials.username && password === credentials.password;
        if (isValid) {
          set({ isAuthenticated: true, isLoading: false });
        }
        return isValid;
      },
      logout: () => {
        set({ isAuthenticated: false, isLoading: false });
      },
      checkAuth: () => {
        set({ isLoading: false });
        return get().isAuthenticated;
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      }
    }
  )
);