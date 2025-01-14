import { router, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
  text
}: {
  source: ImageSourcePropType;
  focused: boolean;
  text: string;
}) => (
  <View className={`flex flex-row justify-between items-center mb-7 ${focused ? "bg-general-300" : ""}`}>
    <View className={`flex justify-center items-center rounded-md w-16 h-9 ${focused ? "" : ""}`}>
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text className="text-xs text-white font-AnekBanglaMedium uppercase pt-1">{text}</Text>
    </View>
  </View>
);

const ReadIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <TouchableOpacity 
    onPress={() => router.push("/ayat/1")} 
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
        !focused && <Text className="text-xs text-white">পড়া চালিয়ে যান</Text>
      }
    </View>
  </TouchableOpacity>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderRadius: 10,
          paddingBottom: 0, // ios only
          marginHorizontal: 16,
          marginBottom: 10,
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
        name="ayat/[id]"
        options={{
          title: "Ayat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ReadIcon source={icons.keepread} focused={focused} />
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
        name="surah/[id]"
        options={{
          title: "Surah",
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
    </Tabs>
  );
}
