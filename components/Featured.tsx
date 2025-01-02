import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { surah } from "@/types/type";

type FeaturedProps = {
  featured: surah[];
};

const Featured: React.FC<FeaturedProps> = ({ featured }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 260); 
      setActiveIndex(index);
  };

  return (
      <View className="w-full px-4">
        <Text className="text-lg font-AnekBanglaSemiBold text-gray-700 mt-8">
          Featured
        </Text>
        <Text className="text-sm font-AnekBangla text-gray-700 mb-2">
          আপনি আমাদের পরামর্শে সূরা পড়তে পারেন
        </Text>
        <FlatList 
          ref={flatListRef}
          data={featured}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({item, index}) => (
            <TouchableOpacity 
                key={item._id} onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
                className="w-[260px] mr-3 bg-dark-green rounded-lg p-4 flex flex-col justify-center"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                }}
            >
                <Text className="text-base text-white font-AnekBanglaBold mb-16 text-center">
                  সূরা {item.name_bn}
                </Text>
                <Text className="text-sm text-gray-300 text-center">
                    সূরা নং {item.no} | আয়াত সংখ্যা {item.totalAyat}
                </Text>
            </TouchableOpacity>
          )}
        />
        <View className="flex-row justify-center">
          {featured.slice(0, 5).map((_, index) => (
            <View
              key={index}
              className={`h-2 mx-1 mt-4 rounded-full ${
                index === activeIndex ? "bg-dark-green w-7" : "bg-yellow-400 w-2"
              }`}
            />
          ))}
        </View>
      </View>
  );
};

export default Featured;
