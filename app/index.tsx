import { Redirect } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function Index() {
  const { user, loading } = useAuthStore();

  if (loading) return null; // TODO: show Splash/loader

  return user ? <Redirect href="/(app)/(tabs)" /> : <Redirect href="/(auth)/login" />;
}
