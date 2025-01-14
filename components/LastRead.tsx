import { router } from "expo-router";
import { Text, View, FlatList, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { surah } from "@/types/type";
import Title from "./Title";
import { TouchableOpacity } from "react-native";
import shape from "../assets/shapes/shape-4.png";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import axios from "axios";

//https://github.com/chitraket/animation/tree/main/src/animation-toast

type LastReadProps = {
  featured: surah[];
};

const LastRead: React.FC<LastReadProps> = ({ featured }) => {
  const { lastRead } = useSelector((state: RootState) => state.bookmark);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
//   const [lastReadData, setLastReadData] = useState<surah[]>([]);
//   console.log("Last read", lastReadData);

  const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 240);
      setActiveIndex(index);
  };

//   useEffect(() => {
//     const fetchLastReadSurahs = async () => {
//       try {
//         const response = await axios.post(
//           // "http://localhost:5000/api/iqra/expo/surah/last-read",
//           "https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/surah/last-read",
//           lastRead
//         );
//         setLastReadData(response.data.data);
//         console.log(response.data);
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching last read surahs:", error);
//         return [];
//       }
//     };

//     if (lastRead.length > 0) {
//       fetchLastReadSurahs();
//     }

//     // Optional: Cleanup to reset state when component unmounts
//     return () => {
//       setLastReadData([]);
//     };
// }, [lastRead]);

  return (
      lastRead.length > 0 ?
      <View className="w-full p-4 bg-white">
        <Title title="Last Read" subtitle="এখানে আপনি যা পড়ছিলেন তা পেতে পারেন" btnText={false}/>
        <FlatList 
          ref={flatListRef}
          data={featured}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          className="pt-4"
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} 
              onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
            >
              <View className="w-[240px] mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-between">
                <Image
                  source={shape}
                  className="w-[100px] h-[100px]"
                  resizeMode="contain"
                />
                <View className="flex items-end justify-between">
                  <Text className="text-md text-black font-AnekBanglaSemiBold mb-1">
                    সূরা {item.name_bn}
                  </Text>
                  <Text className="text-xs text-black mb-4">
                    আয়াত সংখ্যা {convertToBengaliDigits(item.totalAyat)}
                  </Text>
                  <View className="flex flex-row items-center justify-between">
                    <View className="flex items-center justify-center border border-gray-white px-3 py-1 rounded-md">
                      <Text className="text-sx text-black font-AnekBanglaSemiBold">
                        {convertToBengaliDigits(item.no)}
                      </Text>
                    </View>
                  </View>
                </View>
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
      </View> : null
  );
};

export default LastRead;
