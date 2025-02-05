import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import Title from "./Title";
import { moods } from "@/constants";
import { useRef, useState } from "react";

const Mood = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 260); 
      setActiveIndex(index);
  };

  return (
    <View className="w-full px-4 bg-white">
        <Title title="Moods" subtitle="আপনার মেজাজের উপর ভিত্তি করে পড়ুন" btnText={false}/>
        <FlatList 
            ref={flatListRef}
            data={moods}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            className="pt-4 pb-12"
            renderItem={({item, index}) => (
                <TouchableOpacity
                    key={index} 
                    onPress={() => {
                        router.replace(`/(root)/(tabs)/mood/${item.slug}`);
                    }}
                >
                    <View className={`mr-3 rounded-lg p-4 justify-between items-center w-[110px] h-[170px] border border-gray-white bg-white`}>
                        <Image
                            source={item.shape}
                            className="w-[84px] h-[84px] absolute left-2 bottom-2"
                            resizeMode="contain"
                        />
                        <Text className="text-xl font-AnekBanglaBold text-center">
                            {item.icon}
                        </Text>
                        <Text className="text-sm leading-6 text-black text-md pt-2 font-AnekBanglaSemiBold text-center w-full">
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
        <View className="flex-row justify-center mb-4">
        {moods.slice(0, 5).map((_, index) => (
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

export default Mood;
