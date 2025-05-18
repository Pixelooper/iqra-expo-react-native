import { router, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

const TabIcon = ({
  source,
  focused,
  text
}: {
  source: ImageSourcePropType;
  focused: boolean;
  text: string;
}) => (
  <View className={`flex flex-row justify-between items-center mb-7 ${focused ? "bg-green" : ""}`}>
    <View className={`flex justify-center items-center rounded-md w-16 h-9 ${focused ? "bg-green" : ""}`}>
      <Image
        source={source}
        tintColor={focused ? "#0CC25F" : "#000000"}
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text className="text-xs text-black font-NotoSansBengaliMedium uppercase pt-1">{text}</Text>
    </View>
  </View>
);

const ReadIcon = ({
  source,
  focused,
  continueReading
}: {
  source: ImageSourcePropType;
  focused: boolean;
  continueReading: { sId?: string; aId?: string };
}) => (
  <TouchableOpacity 
    onPress={() => router.push(`/ayats/${continueReading?.sId}?scrollTo=${continueReading.aId}`)} 
    className={`flex justify-center items-center mb-16`}
  >
    <View className={`flex justify-center items-center rounded-full ${focused ? "bg-general-400 w-14 h-14" : "w-20 h-20"}`}>
      <Image
        source={source}
        tintColor={focused ? "white" : ""}
        resizeMode="contain"
        className={focused ? "w-10 h-10" : "w-[70px] h-[54px]"}
      />
      {
        !focused && <Text className="text-xs text-black">পড়া চালিয়ে যান</Text>
      }
    </View>
  </TouchableOpacity>
);

export default function Layout() {
  const continueReading = useSelector((state: RootState) => state.bookmark.continue);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "green",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderRadius: 0,
          paddingBottom: 0, // ios only
          marginHorizontal: 0,
          marginBottom: 0,
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} text="Home"/>
          ),
        }}
      />
      <Tabs.Screen
        name="blogs"
        options={{
          title: "Blogs",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.blog} focused={focused} text="Blogs"/>
          ),
        }}
      />
      <Tabs.Screen
        name="ayats/[id]"
        options={{
          title: "Ayats",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            !continueReading ? 
            <TouchableOpacity onPress={() => router.push('/home')}  className={`flex justify-center items-center mb-16`}>
              <View className={`flex justify-center items-center rounded-full "w-20 h-20`}>
                <Image source={icons.read} style={{ width: 76, height: 76 }} resizeMode="contain"/> 
              </View>
            </TouchableOpacity>:
            <ReadIcon source={icons.keepread} focused={focused} continueReading={continueReading}/>
          ),
        }}
      /> 
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.search} focused={focused} text="Search"/>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.about} focused={focused} text="About"/>
          ),
        }}
      />
      <Tabs.Screen
        name="surah/[id]"
        options={{
          title: "Surah",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="ayat/[id]/[aid]"
        options={{
          title: "Ayat",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="tafsir/[id]/[aid]"
        options={{
          title: "Tafsir",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="basedons"
        options={{
          title: "Basedons",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="basedon/[id]"
        options={{
          title: "Basedon",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="blog/[id]"
        options={{
          title: "Blog",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="mood/[slug]"
        options={{
          title: "Mood",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="bookmarkSurah"
        options={{
          title: "bookmarkSurah",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="bookmarkAyat"
        options={{
          title: "bookmarkAyat",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
      <Tabs.Screen
        name="bookmarkTafsir"
        options={{
          title: "bookmarkTafsir",
          headerShown: false,
          href: null, // Prevent these from being added as tabs
        }}
      />
    </Tabs>
  );
}
