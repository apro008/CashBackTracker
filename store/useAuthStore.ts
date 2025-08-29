import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '~/utils/firebase';
import { mmkv } from '~/utils/storage';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (u: User | null) => void;
  setLoading: (v: boolean) => void;
  clearError: () => void;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  signup: (email: string, password: string) => Promise<UserCredential | void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,

      setUser: (u) => {
        console.log('[Zustand] setUser called with:', u?.uid ?? null);
        set({ user: u });
      },
      setLoading: (v) => set({ loading: v }),
      clearError: () => set({ error: null }),

      login: async (email, password) => {
        set({ error: null, loading: true });
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          console.log('cred signInWithEmailAndPassword', cred);
          return cred; // user will be set by onAuthStateChanged in SessionProvider
        } catch (e: any) {
          set({ error: e.message });
        } finally {
          set({ loading: false });
        }
      },

      signup: async (email, password) => {
        set({ error: null, loading: true });
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          console.log('cred createUserWithEmailAndPassword', cred);
          return cred;
        } catch (e: any) {
          set({ error: e.message });
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (email) => {
        set({ error: null });
        try {
          await sendPasswordResetEmail(auth, email);
        } catch (e: any) {
          set({ error: e.message });
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({
        getItem: (k) => mmkv.getString(k) ?? null,
        setItem: (k, v) => mmkv.set(k, v),
        removeItem: (k) => mmkv.delete(k),
      })),
      partialize: (s) =>
        s.user ? { user: { uid: s.user.uid, email: s.user.email } } : { user: null },
    }
  )
);
