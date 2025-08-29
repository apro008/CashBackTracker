import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { auth } from '~/utils/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth';
import { mmkv } from '~/utils/storage';

type AuthState = {
  user: User | null;
  loading: boolean; // true until first onAuthStateChanged fires
  error: string | null;
  setUser: (u: User | null) => void;
  setLoading: (v: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,

      setUser: (u) => set({ user: u }),
      setLoading: (v) => set({ loading: v }),

      login: async (email, password) => {
        set({ error: null });
        await signInWithEmailAndPassword(auth, email, password).catch((e) =>
          set({ error: e.message })
        );
      },

      signup: async (email, password) => {
        set({ error: null });
        await createUserWithEmailAndPassword(auth, email, password).catch((e) =>
          set({ error: e.message })
        );
      },

      resetPassword: async (email) => {
        set({ error: null });
        await sendPasswordResetEmail(auth, email).catch((e) => set({ error: e.message }));
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
      // Only persist lightweight, non-circular bits
      partialize: (s) => ({ user: s.user ? { uid: s.user.uid, email: s.user.email } : null }),
    }
  )
);
