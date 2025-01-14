import { router, Stack, useRouter, useSegments } from "expo-router";
import { View, Image, TouchableOpacity, Text, Platform } from "react-native";
import { images, icons } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import shape from "../../assets/shapes/shape-8.png";
import { useEffect } from "react";

const GlobalHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 54 : insets.top,
      }}
      className="absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between"
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
  // console.log('Segments:', segments)

  const currentPage = segments[2] || "home";
  const isHome = currentPage === "home";

  const getTextClass = (page: string) => {
    return currentPage === page
      ? "text-lg font-AneekBanglabold text-dark-green"
      : "text-xs font-AneekBangla text-[#B6B6B6]";
  };

  return isHome ? (
    <GlobalHeader />
  ) : (
    <View 
      style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 54 : insets.top,
      }}
      className="absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between py-2 pl-4">
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Image
          source={shape}
          className="w-[32px] h-[32px]"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View className="flex-row items-center">
        <View className="mr-4">
          <Text className={getTextClass("surah")}>সূরা</Text>
        </View>
        <View className="mr-4">
          <Text className={getTextClass("ayat")}>আয়াত</Text>
        </View>
        <View className="mr-4">
          <Text className={getTextClass("tafsir")}>তাফসীর</Text>
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
