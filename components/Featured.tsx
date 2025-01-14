import { Text, View, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { surah } from "@/types/type";
import shape from "../assets/shapes/shape-5.png";
import Title from "./Title";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";

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
      <View className="w-full px-4 bg-white">
        <Title title="Featured" subtitle="আপনি আমাদের পরামর্শে সূরা পড়তে পারেন" btnText="সব দেখুন"/>
        <FlatList 
          ref={flatListRef}
          data={featured}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          className="pt-4"
          renderItem={({item, index}) => (
            <TouchableOpacity 
                key={index} onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
            >
              <View className="mr-3 rounded-lg p-3 border border-gray-white bg-white">
                <ImageBackground source={shape} className="w-[150px] h-[150px] flex justify-center items-center">
                  <Text className="text-lg text-gray-black font-AnekBanglaBold mb-24 text-center">
                    সূরা {item.name_bn}
                  </Text>
                </ImageBackground>
                <Text className="text-xs text-dark-green text-center font-AnekBanglaMedium mt-5">
                    সূরা নং {convertToBengaliDigits(item.no)} | আয়াত সংখ্যা {convertToBengaliDigits(item.totalAyat)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View className="flex-row justify-center mb-4">
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
