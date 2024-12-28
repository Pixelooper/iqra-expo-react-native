import { router } from "expo-router";
import { Text, View, FlatList } from "react-native";
import { useRef, useState } from "react";
import CustomButton from "./CustomButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { surah } from "@/types/type";

//check: https://www.youtube.com/watch?v=qnI8m5Pk1ro
//https://github.com/chitraket/animation/tree/main/src/animation-toast

type LastReadProps = {
  featured: surah[];
};

const LastRead: React.FC<LastReadProps> = ({ featured }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 240);
      setActiveIndex(index);
  };

  return (
    <GestureHandlerRootView>
      <View className="w-full px-4">
        <Text className="text-lg font-AnekBanglaSemiBold text-gray-700 mt-8">
          Last Read
        </Text>
        <Text className="text-sm font-AnekBangla text-gray-700 mb-2">
          এখানে আপনি যা পড়ছিলেন তা পেতে পারেন
        </Text>
        <FlatList 
          ref={flatListRef}
          data={featured}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({item, index}) => (
            <View
              key={item._id}
              className="w-[240px] mr-3 bg-dark-green rounded-lg p-4 flex flex-col justify-between"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-base text-white font-AnekBanglaBold mb-1">
                সূরা {item.name_bn}
              </Text>
              <Text className="text-sm text-gray-300 mb-4">
                আয়াত সংখ্যা {item.totalAyat}
              </Text>
              <View className="flex flex-row items-center justify-between">
                <CustomButton
                  title="এখন পড়ুন"
                  onPress={() => router.push(`/(root)/(tabs)/surah/${item._id}`)}
                />
                <View className="flex items-center justify-center border border-gray-50 px-3 py-1 rounded-md">
                  <Text className="text-md text-white font-AnekBanglaSemiBold">
                    {item.no}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <View className="flex-row justify-center">
          {featured.slice(0, 5).map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 mx-1 mt-4 rounded-full ${
                index === activeIndex ? "bg-dark-green" : "bg-yellow-400"
              }`}
            />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default LastRead;
