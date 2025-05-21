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
    "Indopak-Regular": require("../assets/fonts/Indopak-Regular.ttf"),
    "Uthmanic-Regular": require("../assets/fonts/Uthmanic-Regular.otf"),
    "NotoSansBengali": require("../assets/fonts/NotoSansBengali-Regular.ttf"),
    "NotoSansBengali-Medium": require("../assets/fonts/NotoSansBengali-Medium.ttf"),
    "NotoSansBengali-SemiBold": require("../assets/fonts/NotoSansBengali-SemiBold.ttf"),
    "NotoSansBengali-Bold": require("../assets/fonts/NotoSansBengali-Bold.ttf"),
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
