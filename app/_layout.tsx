import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "AnekBangla": require("../assets/fonts/AnekBangla-Regular.ttf"),
    "AnekBangla-Light": require("../assets/fonts/AnekBangla-Light.ttf"),
    "AnekBangla-Medium": require("../assets/fonts/AnekBangla-Medium.ttf"),
    "AnekBangla-SemiBold": require("../assets/fonts/AnekBangla-SemiBold.ttf"),
    "AnekBangla-Bold": require("../assets/fonts/AnekBangla-Bold.ttf"),
    "AnekBangla-ExtraBold": require("../assets/fonts/AnekBangla-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
