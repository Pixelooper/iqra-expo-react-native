import { router, Stack, useRouter, useSegments } from "expo-router";
import { View, Image, TouchableOpacity, Text, Platform } from "react-native";
import { images, icons } from "@/constants";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const GlobalHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        // height: Platform.OS === 'ios' ? 100 : insets.top,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 54 : insets.top,
      }}
      className="absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between bg-dark-green"
    >
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Image source={images.logo} style={{ width: 64, height: 64 }} resizeMode="contain" />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icons.avatar} style={{ width: 32, height: 32, marginRight: 16 }} resizeMode="contain" />
        <TouchableOpacity onPress={() => console.log('Menu Pressed')}>
          <Image source={icons.ham} style={{ width: 32, height: 32 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PathHeader = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const segments = useSegments();

  const currentPage = segments[2] || "home";
  const isHome = currentPage === "home";

  const getTextClass = (page: string) => {
    return currentPage === page
      ? "text-lg font-AneekBanglabold text-black"
      : "text-xs font-AneekBangla text-gray-500";
  };

  return isHome ? (
    <GlobalHeader />
  ) : (
    <View 
      style={{
        // height: Platform.OS === 'ios' ? 100 : insets.top,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 54 : insets.top,
      }}
      className="absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between py-2 pl-4">
      <TouchableOpacity
        className="mr-2 justify-center items-center bg-gray-300 rounded-full w-8 h-8"
        onPress={() => router.back()}
      >
        <Text className="text-gray-600 text-lg font-bold">←</Text>
      </TouchableOpacity>
      <View className="flex-row items-center">
        <View className="mr-4">
          <Text className={getTextClass("surah")}>SURAH</Text>
        </View>
        <View className="mr-4">
          <Text className={getTextClass("ayat")}>AYAT</Text>
        </View>
        <View className="mr-4">
          <Text className={getTextClass("tafsir")}>TAFSIR</Text>
        </View>
      </View>
    </View>
  );
};

const Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: Platform.OS === 'ios' ? 10 : insets.bottom,
      }}
      className="bg-light-olive"
    >
      <PathHeader />
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </View>
  );
};

export default Layout;
