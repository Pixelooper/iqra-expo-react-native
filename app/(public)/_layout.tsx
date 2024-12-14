import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="surah/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="ayat/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="tafsir/[id]/[aid]" options={{ headerShown: false }} />
      </Stack>
  );
};

export default Layout;
