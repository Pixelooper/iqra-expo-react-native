import { router } from "expo-router";
import { Text, View, FlatList, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { surah } from "@/types/type";
import Title from "./Title";
import { TouchableOpacity } from "react-native";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import axios from "axios";
import useAssignShapes from "@/utils/hooks/useAssignShapes";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";

type LastReadProps = {
  lastRead: [];
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const LastRead: React.FC<LastReadProps> = ({ lastRead }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [lastReadData, setLastReadData] = useState<surah[]>([]);
  const [loading, setLoading] = useState(true);
  const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

  const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 240);
      setActiveIndex(index);
  };

  const surahWithShapes = useAssignShapes(lastReadData);

  const fetchLastReadSurahs = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setLastReadData([]);
                return;
            }
            setIsConnected(true);
            
          const response = await axios.post(
            `${API_URL}/lastread`,
            lastRead,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: " Bearer " + JWT_TOKEN,
              },
            }
          );
          setLastReadData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLastReadSurahs();
    }, [lastRead]);

  return (
      !isConnected ? null :
      <View className="w-full p-4 bg-white">
        <Title title="সর্বশেষ পড়া" subtitle="এখানে আপনি যা পড়ছিলেন তা পেতে পারেন" btnText={false}/>
        <FlatList 
          ref={flatListRef}
          data={surahWithShapes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          className="pt-4"
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} 
              onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
            >
              <View className="w-[260px] mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-end">
                <Image
                  source={item.shape}
                  className="w-[100px] h-[100px] absolute left-4 top-2"
                  resizeMode="contain"
                />
                <View className="flex items-end justify-between">
                  <Text className="text-lg leading-8 text-gray-black font-NotoSansBengaliSemiBold mb-1">
                    সূরা {item.name_bn}
                  </Text>
                  <Text className="text-sm leading-6 text-gray-black mb-4">
                    সর্বমোট আয়াত {convertToBengaliDigits(item.totalAyat)}
                  </Text>
                  <View className="flex flex-row items-center justify-between">
                    <View className="flex items-center justify-center border border-gray-white px-3 py-1 rounded-md">
                      <Text className="text-sx text-gray-black font-NotoSansBengaliSemiBold">
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
          {surahWithShapes.slice(0, 5).map((_, index) => (
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

export default LastRead;
