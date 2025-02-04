import { router, Stack, useSegments } from "expo-router";
import { View, Image, TouchableOpacity, Text, Platform, StatusBar } from "react-native";
import { images } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import back from "../../assets/icons/back.png";
import Toast, { BaseToast } from "react-native-toast-message";
import useSmartBack from "@/utils/hooks/useSmartBack";

const PathHeader = () => {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const { smartBack } = useSmartBack();

  const currentPage = segments[2] || "home";
  const isHome = currentPage === "home";
  const isHide = (currentPage === "blog" || currentPage === "blogs" || currentPage === "mood" || currentPage === "basedons");

  const getTextClass = (...pages: string[]) => {
    return pages.includes(currentPage)
      ? "text-lg font-AneekBanglabold text-dark-green"
      : "text-xs font-AneekBangla text-[#B6B6B6]";
  };


  return (
      <View>
        <StatusBar backgroundColor="#FFFFFF" translucent={false} />
        <View 
          style={{
            paddingHorizontal: 16,
            paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
          }}
          className="absolute z-10 top-0 left-0 w-full flex flex-row items-center justify-between py-2 px-3 min-h-[64px]">
          {
            isHome ? (
            <TouchableOpacity onPress={() => router.push('/home')}>
              <Image source={images.logo} style={{ width: 64, height: 64 }} resizeMode="contain" />
            </TouchableOpacity>
          ) :
            <TouchableOpacity
              onPress={smartBack}
            >
              <Image
                source={back}
                className="w-[32px] h-[32px]"
                resizeMode="contain"
              />
            </TouchableOpacity> 
          }
          
          {
            isHide ? (
              null
            ) : 
            <View className="flex-row items-center">
              <View className="mr-4">
                <Text className={getTextClass("surah", "search", "bookmarkSurah")}>সূরা</Text>
              </View>
              <View className="mr-4">
                <Text className={getTextClass("ayats", "ayat", "bookmarkAyat", "basedon")}>আয়াত</Text>
              </View>
              <View>
                <Text className={getTextClass("tafsir", "bookmarkTafsir")}>তাফসীর</Text>
              </View>
            </View>
          }
        </View>
    </View>
  );
};

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#0C7900' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '500'
      }}
    />
  ),
};

const Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: Platform.OS === 'ios' ? 20 : insets.bottom,
        backgroundColor: '#FFFFFF'
      }}
    >
      <PathHeader />
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
      <Toast 
          config={toastConfig}
          position='bottom'
          bottomOffset={100}
      />
    </View>
  );
};

export default Layout;
