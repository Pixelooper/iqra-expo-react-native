import { store, persistor } from '@/utils/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import RouteTracker from '@/utils/RouteTracker';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "AnekBangla": require("../assets/fonts/AnekBangla-Regular.ttf"),
    "AnekBangla-Medium": require("../assets/fonts/AnekBangla-Medium.ttf"),
    "AnekBangla-SemiBold": require("../assets/fonts/AnekBangla-SemiBold.ttf"),
    "AnekBangla-Bold": require("../assets/fonts/AnekBangla-Bold.ttf"),
    "NotoNaskhArabic-Bold": require("../assets/fonts/NotoNaskhArabic-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteTracker />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
