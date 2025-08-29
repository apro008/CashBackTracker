// providers/SessionProvider.tsx
import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '~/utils/firebase';
import { useAuthStore } from '~/store/useAuthStore';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    // helpful logs while debugging
    console.log('[SessionProvider] setting up onAuthStateChanged');
    const unsub = onAuthStateChanged(auth, (u: User | null) => {
      console.log('[onAuthStateChanged] user:', u?.uid ?? null);
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  return <>{children}</>;
}
