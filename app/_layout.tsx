import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SessionProvider } from '~/providers/SessionProvider';
import GlobalLoader from '~/components/GlobalLoader';

SplashScreen.preventAutoHideAsync(); // keep splash until ready

export default function RootLayout() {
  useEffect(() => {
    // you can hide splash once fonts, store, etc. are ready
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading
      SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <SessionProvider>
      <GlobalLoader />
      <Stack screenOptions={{ headerShown: false }} />
    </SessionProvider>
  );
}
