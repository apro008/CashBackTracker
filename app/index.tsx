import { Redirect } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function Index() {
  const { user, loading } = useAuthStore();

  if (loading) return null; // show Splash if you want

  return user ? <Redirect href="/(app)/(tabs)" /> : <Redirect href="/(auth)/login" />;
}
